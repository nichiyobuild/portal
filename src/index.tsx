import { Hono } from "hono";
import type { FC } from "hono/jsx";
import z from "zod";
import { About } from "#/components/pages/about";
import { Contact } from "#/components/pages/contact";
import { ContactError } from "#/components/pages/contact/contact-error";
import { ContactSuccess } from "#/components/pages/contact/contact-success";
import { Home } from "#/components/pages/home";
import { Legal } from "#/components/pages/legal";
import { DisclosureError } from "#/components/pages/legal/disclosure-error";
import { LegalDisclosureDocument } from "#/components/pages/legal/legal-disclosure-document";
import { NotFound } from "#/components/pages/not-found";
import { Privacy } from "#/components/pages/privacy";
import { Terms } from "#/components/pages/terms";
import {
	CONTACT_CATEGORY_LABELS,
	CONTACT_CATEGORY_VALUES,
	CONTACT_ERROR_PATH,
	CONTACT_SUCCESS_PATH,
} from "#/constants/contact";
import type { PagePath } from "#/constants/pages";
import {
	CONTACT_PAGE,
	INDEXABLE_PATHS,
	LEGAL_DISCLOSURE_PATH,
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

/**
 * PAGES（フッター・sitemapの元データ、src/constants/pages.ts）にあるパスへ、
 * 対応するページを登録する。Record の型がキーの過不足を検出するため、
 * PAGES にパスを追加してここへの登録を忘れると型エラーになる。
 */
const routes: Record<PagePath, FC> = {
	"/": Home,
	"/about": About,
	"/terms": Terms,
	"/privacy": Privacy,
	"/legal": Legal,
	"/contact": Contact,
};

for (const path of Object.keys(routes) as PagePath[]) {
	const Component = routes[path];
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

const contactSchema = z.object({
	category: z.enum(CONTACT_CATEGORY_VALUES),
	name: z.string().min(1).max(255),
	email: z.email(),
	message: z.string().min(1).max(10000),
	agree: z.literal("on"),
});

/**
 * TODO: 入力エラーと送信障害を区別し、入力値を保持したままフォームに戻すこと。
 * 現状はどちらも /contact/error へのリダイレクトで、入力内容が失われる。
 * TODO: 受信内容を D1 に保存すること。メール送信に失敗すると問い合わせが消える。
 */
app.post(CONTACT_PAGE.path, async (c) => {
	try {
		const body = await c.req.formData();

		const verified = await verifyTurnstile({
			secretKey: c.env.TURNSTILE_SECRET_KEY,
			token: String(body.get("cf-turnstile-response") ?? ""),
			expectedAction: TURNSTILE_ACTION_CONTACT,
			remoteIp: c.req.header("CF-Connecting-IP"),
		});
		if (!verified) {
			return c.redirect(CONTACT_ERROR_PATH);
		}

		const parsed = contactSchema.parse({
			category: body.get("category"),
			name: body.get("name"),
			email: body.get("email"),
			message: body.get("message"),
			agree: body.get("agree"),
		});

		await c.env.EMAIL.send({
			to: c.env.CONTACT_EMAIL_TO,
			from: c.env.CONTACT_EMAIL_FROM,
			// 運営者がそのまま返信できるようにする。
			replyTo: parsed.email,
			subject: `[${CONTACT_CATEGORY_LABELS[parsed.category]}] ${SITE_DOMAIN}からお問い合わせがありました`,
			text: [
				`種類: ${CONTACT_CATEGORY_LABELS[parsed.category]}`,
				`お名前: ${parsed.name}`,
				`メールアドレス: ${parsed.email}`,
				"",
				"お問い合わせ内容:",
				parsed.message,
				"",
			].join("\n"),
		});

		return c.redirect(CONTACT_SUCCESS_PATH);
	} catch (error) {
		console.error(error);
		return c.redirect(CONTACT_ERROR_PATH);
	}
});

app.get(CONTACT_SUCCESS_PATH, (c) => {
	return c.html(<ContactSuccess />);
});

app.get(CONTACT_ERROR_PATH, (c) => {
	return c.html(<ContactError />);
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
	const urls = INDEXABLE_PATHS.map(
		(path) => `\t<url>\n\t\t<loc>${SITE_ORIGIN}${path}</loc>\n\t</url>`,
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
