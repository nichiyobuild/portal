import { Hono } from "hono";
import z from "zod";
import { Contact } from "#/components/pages/contact";
import {
	CONTACT_CATEGORY_LABELS,
	CONTACT_CATEGORY_VALUES,
	CONTACT_SUCCESS_PATH,
	type ContactFormErrors,
	type ContactFormValues,
} from "#/components/pages/contact/const";
import { CONTACT_PAGE } from "#/constants/pages";
import { SITE_DOMAIN } from "#/constants/site";
import { TURNSTILE_ACTION_CONTACT } from "#/constants/turnstile";
import { validateTurnstileWithRetry } from "#/lib/turnstile";

const contactRoutes = new Hono<{ Bindings: CloudflareBindings }>();

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
contactRoutes.post(CONTACT_PAGE.path, async (c) => {
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

		const verified = await validateTurnstileWithRetry({
			secretKey: c.env.TURNSTILE_SECRET_KEY,
			token: String(body.get("cf-turnstile-response") ?? ""),
			remoteIp: c.req.header("CF-Connecting-IP"),
			expectedAction: TURNSTILE_ACTION_CONTACT,
			expectedHostname: SITE_DOMAIN,
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
		console.error({ error, message: "unknown error in post contact" });
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

export { contactRoutes };
