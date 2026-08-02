import { Hono } from "hono";
import { csrf } from "hono/csrf";
import type { FC } from "hono/jsx";
import z from "zod";
import { About } from "#/components/pages/about";
import { Contact } from "#/components/pages/contact";
import {
	CONTACT_CATEGORY_LABELS,
	CONTACT_CATEGORY_VALUES,
	CONTACT_SUCCESS_PATH,
	type ContactFormErrors,
	type ContactFormValues,
} from "#/components/pages/contact/const";
import { ContactSuccess } from "#/components/pages/contact/contact-success";
import { Home } from "#/components/pages/home";
import { Legal } from "#/components/pages/legal";
import { DisclosureError } from "#/components/pages/legal/disclosure-error";
import { LegalDisclosureDocument } from "#/components/pages/legal/legal-disclosure-document";
import { NotFound } from "#/components/pages/not-found";
import { Privacy } from "#/components/pages/privacy";
import { Terms } from "#/components/pages/terms";
import type { PagePath } from "#/constants/pages";
import {
	CONTACT_PAGE,
	INDEXED_PAGES,
	LEGAL_DISCLOSURE_PATH,
	NAVIGATION_LINKS,
} from "#/constants/pages";
import {
	ADSENSE_PUBLISHER_ID,
	SITE_DOMAIN,
	SITE_ORIGIN,
	TURNSTILE_ACTION_CONTACT,
	TURNSTILE_ACTION_LEGAL_DISCLOSURE,
} from "#/constants/site";
import { verifyTurnstile } from "#/lib/turnstile";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(csrf());

// 別のworkerから利用規約などのリンクを取得するためのapi
app.get("/api/navigation-links", (c) => c.json(NAVIGATION_LINKS));

/**
 * PAGES（フッター・sitemapの元データ、src/constants/pages.ts）にあるパスへ、
 * 対応するページを登録する。Record の型がキーの過不足を検出するため、
 * PAGES にパスを追加してここへの登録を忘れると型エラーになる。
 */
const pageRoutes: Record<PagePath, FC> = {
	"/": Home,
	"/about": About,
	"/terms": Terms,
	"/privacy": Privacy,
	"/legal": Legal,
	"/contact": Contact,
	"/contact/success": ContactSuccess,
};

for (const path of Object.keys(pageRoutes) as PagePath[]) {
	const Component = pageRoutes[path];
	app.get(path, (c) => c.html(<Component />));
}

app.notFound((c) => {
	return c.html(<NotFound />, 404);
});

/**
 * 特商法で省略した事項を含む全文を、電磁的記録として提供する。
 *
 * GET を実装していないのは意図的。クローラーが到達できる経路を作らないため、
 * Turnstile 検証を通した POST でのみ生成する。
 */
app.post(LEGAL_DISCLOSURE_PATH, async (c) => {
	const form = await c.req.formData();
	const verified = await verifyTurnstile({
		secretKey: c.env.TURNSTILE_SECRET_KEY,
		token: String(form.get("cf-turnstile-response") ?? ""),
		expectedAction: TURNSTILE_ACTION_LEGAL_DISCLOSURE,
		remoteIp: c.req.header("CF-Connecting-IP"),
	});

	if (!verified) {
		return c.html(<DisclosureError />, 400);
	}

	const providedAt = new Date().toLocaleDateString("ja-JP", {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return c.html(
		<LegalDisclosureDocument
			phoneNumber={c.env.LEGAL_PHONE_NUMBER}
			providedAt={providedAt}
			representativeName={c.env.LEGAL_REPRESENTATIVE_NAME}
		/>,
		200,
		{
			"Content-Disposition": 'attachment; filename="legal.html"',
			// 開示した内容をプロキシやブラウザに残さない。
			"Cache-Control": "no-store",
		},
	);
});

/**
 * 検証対象は ContactFormValues に正規化済みの値。
 * 生の FormData をそのまま渡すと、項目が欠落したリクエストで型エラーになり
 * zod の既定メッセージ（英語）が利用者に出てしまう。
 */
const contactSchema = z.object({
	category: z.enum(CONTACT_CATEGORY_VALUES, {
		error: "お問い合わせの種類を選択してください。",
	}),
	name: z
		.string()
		.min(1, "お名前を入力してください。")
		.max(255, "お名前は255文字以内で入力してください。"),
	email: z.email("メールアドレスを正しく入力してください。"),
	message: z
		.string()
		.min(1, "お問い合わせ内容を入力してください。")
		.max(10000, "お問い合わせ内容は10000文字以内で入力してください。"),
	agree: z.literal(true, {
		error: "プライバシーポリシーへの同意が必要です。",
	}),
});

/** 最初に見つかったエラーだけを項目ごとに拾う。同じ項目に複数出しても読みにくいため。 */
function toFieldErrors(error: z.ZodError): ContactFormErrors {
	const errors: ContactFormErrors = {};
	for (const issue of error.issues) {
		const key = issue.path[0];
		if (typeof key === "string" && !(key in errors)) {
			errors[key as keyof ContactFormValues] = issue.message;
		}
	}
	return errors;
}

/**
 * 送信に失敗したときはリダイレクトせずフォームを描画し直す。
 * リダイレクトすると入力内容が失われ、長文を書いた利用者が打ち直しになるため。
 * 成功時だけは PRG にして、再読み込みでの二重送信を防ぐ。
 *
 * TODO: 受信内容を D1 に保存すること。メール送信に失敗すると問い合わせが消える。
 */
app.post(CONTACT_PAGE.path, async (c) => {
	let values: ContactFormValues = {
		category: "",
		name: "",
		email: "",
		message: "",
		agree: false,
	};

	try {
		const body = await c.req.formData();
		values = {
			category: String(body.get("category") ?? ""),
			name: String(body.get("name") ?? ""),
			email: String(body.get("email") ?? ""),
			message: String(body.get("message") ?? ""),
			agree: body.get("agree") === "on",
		};

		/**
		 * Turnstile より先に入力を検証する。トークンは5分で失効するので、
		 * 入力ミスと失効が重なったときに認証エラーだけを見せて往復させないため。
		 * 検証は副作用がなく、ここで弾いてもメールは送られない。
		 */
		const parsed = contactSchema.safeParse(values);
		if (!parsed.success) {
			return c.html(
				<Contact errors={toFieldErrors(parsed.error)} values={values} />,
				400,
			);
		}

		const verified = await verifyTurnstile({
			secretKey: c.env.TURNSTILE_SECRET_KEY,
			token: String(body.get("cf-turnstile-response") ?? ""),
			expectedAction: TURNSTILE_ACTION_CONTACT,
			remoteIp: c.req.header("CF-Connecting-IP"),
		});
		if (!verified) {
			return c.html(
				<Contact
					errors={{
						form: "認証の有効期限が切れたか、確認に失敗しました。入力内容はそのままですので、もう一度送信してください。",
					}}
					values={values}
				/>,
				400,
			);
		}

		await c.env.EMAIL.send({
			to: c.env.CONTACT_EMAIL_TO,
			from: c.env.CONTACT_EMAIL_FROM,
			// 運営者がそのまま返信できるようにする。
			replyTo: parsed.data.email,
			subject: `[${CONTACT_CATEGORY_LABELS[parsed.data.category]}] ${SITE_DOMAIN}からお問い合わせがありました`,
			text: [
				`種類: ${CONTACT_CATEGORY_LABELS[parsed.data.category]}`,
				`お名前: ${parsed.data.name}`,
				`メールアドレス: ${parsed.data.email}`,
				"",
				"お問い合わせ内容:",
				parsed.data.message,
			].join("\n"),
		});

		return c.redirect(CONTACT_SUCCESS_PATH);
	} catch (error) {
		console.error(error);
		return c.html(
			<Contact
				errors={{
					form: "送信中に問題が発生しました。入力内容はそのままですので、しばらく時間をおいてからもう一度お試しください。",
				}}
				values={values}
			/>,
			500,
		);
	}
});

// noindex のページも Disallow しない。クロールできないと meta robots を
// 読めず、noindex が伝わらないため。
app.get("/robots.txt", (c) => {
	return c.text(
		[
			"User-agent: *",
			"Allow: /",
			"",
			`Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
			"",
		].join("\n"),
	);
});

app.get("/sitemap.xml", (c) => {
	const urls = INDEXED_PAGES.map(
		(page) => `\t<url>\n\t\t<loc>${SITE_ORIGIN}${page.path}</loc>\n\t</url>`,
	).join("\n");
	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		urls,
		"</urlset>",
		"",
	].join("\n");
	return c.body(xml, 200, {
		"Content-Type": "application/xml; charset=UTF-8",
	});
});

// パブリッシャーIDが未設定のうちは配信しない。
// 無効なIDを載せた ads.txt は、広告枠の販売者が未承認と解釈される。
app.get("/ads.txt", (c) => {
	if (!ADSENSE_PUBLISHER_ID) {
		return c.text("Not Found", 404);
	}
	return c.text(
		`google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`,
	);
});

export default app;
