import type { Child } from "hono/jsx";
import { Layout } from "#/components/pages/layout";
import { Button } from "#/components/ui/button";
import { Checkbox, Input, Select, Textarea } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Turnstile } from "#/components/ui/turnstile";
import {
	CONTACT_CATEGORY_LABELS,
	CONTACT_CATEGORY_VALUES,
	type ContactFormErrors,
	type ContactFormValues,
} from "#/constants/contact";
import { CONTACT_PAGE, PRIVACY_PAGE } from "#/constants/pages";
import { SITE_DOMAIN, TURNSTILE_ACTION_CONTACT } from "#/constants/site";

type Props = {
	/** 送信に失敗したときに入力内容を戻すための値。初回表示では空。 */
	values?: ContactFormValues;
	errors?: ContactFormErrors;
};

const EMPTY_VALUES: ContactFormValues = {
	category: "",
	name: "",
	email: "",
	message: "",
	agree: false,
};

export function Contact({ values = EMPTY_VALUES, errors = {} }: Props) {
	/**
	 * エラーがあるときはヒントに加えてエラーも読み上げさせる。
	 * aria-describedby は空白区切りで複数の id を取れる。
	 */
	const describedBy = (field: keyof ContactFormValues, hasHint: boolean) =>
		[hasHint ? `${field}-hint` : null, errors[field] ? `${field}-error` : null]
			.filter(Boolean)
			.join(" ") || undefined;

	return (
		<Layout
			title={CONTACT_PAGE.title}
			description={CONTACT_PAGE.description}
			path={CONTACT_PAGE.path}
		>
			<article class="prose prose-slate prose-invert max-w-none py-8 prose-a:text-blue-300 lg:py-12">
				<h1>お問い合わせ</h1>
				<p>
					{SITE_DOMAIN}
					および当サイトで公開しているゲームに関するお問い合わせは、
					以下のフォームからお願いします。
				</p>
				<p>
					いただいた内容には、通常3営業日以内にご入力のメールアドレス宛に返信します。
					お問い合わせの内容によっては、回答にお時間をいただく場合があります。
				</p>
				<p>
					個人情報の開示等のご請求については、ご本人であることを確認したうえで対応します。
					確認のために追加の情報をお伺いする場合があります。
					個人情報の取り扱いについては
					<a href={PRIVACY_PAGE.path}>プライバシーポリシー</a>をご覧ください。
				</p>
			</article>

			<form
				action={CONTACT_PAGE.path}
				method="post"
				class="mx-auto mt-10 max-w-2xl space-y-6"
			>
				{errors.form && (
					<div
						class="rounded-md border border-red-400/50 bg-red-400/10 p-4 text-red-200 text-sm"
						role="alert"
					>
						{errors.form}
					</div>
				)}

				<div>
					<Label for="category" required>
						お問い合わせの種類
					</Label>
					<Select
						aria-describedby={describedBy("category", false)}
						aria-invalid={Boolean(errors.category)}
						class="mt-2"
						id="category"
						name="category"
						required
					>
						<option value="">選択してください</option>
						{CONTACT_CATEGORY_VALUES.map((value) => (
							<option
								key={value}
								selected={values.category === value}
								value={value}
							>
								{CONTACT_CATEGORY_LABELS[value]}
							</option>
						))}
					</Select>
					<FieldError field="category" message={errors.category} />
				</div>

				<div>
					<Label for="name" required>
						お名前
					</Label>
					<Input
						aria-describedby={describedBy("name", false)}
						aria-invalid={Boolean(errors.name)}
						class="mt-2"
						id="name"
						name="name"
						placeholder="日曜 太郎"
						required
						type="text"
						value={values.name}
					/>
					<FieldError field="name" message={errors.name} />
				</div>

				<div>
					<Label for="email" required>
						メールアドレス
					</Label>
					<Input
						aria-describedby={describedBy("email", true)}
						aria-invalid={Boolean(errors.email)}
						class="mt-2"
						id="email"
						name="email"
						placeholder="you@example.com"
						required
						type="email"
						value={values.email}
					/>
					<p class="mt-2 text-slate-400 text-sm" id="email-hint">
						回答の送信先として使用します。
					</p>
					<FieldError field="email" message={errors.email} />
				</div>

				<div>
					<Label for="message" required>
						お問い合わせ内容
					</Label>
					<Textarea
						aria-describedby={describedBy("message", true)}
						aria-invalid={Boolean(errors.message)}
						class="mt-2"
						id="message"
						name="message"
						required
						rows={8}
					>
						{values.message}
					</Textarea>
					<p class="mt-2 text-slate-400 text-sm" id="message-hint">
						不具合の場合は、お使いの端末とブラウザ、発生した状況をお書きいただけると助かります。
					</p>
					<FieldError field="message" message={errors.message} />
				</div>

				<div>
					<div class="flex items-center justify-center gap-3">
						<Checkbox
							aria-invalid={Boolean(errors.agree)}
							checked={values.agree}
							class="mt-1"
							id="agree"
							name="agree"
							required
						/>
						<Label for="agree" required>
							<a class="text-blue-300 underline" href={PRIVACY_PAGE.path}>
								プライバシーポリシー
							</a>
							に同意します
						</Label>
					</div>
					<FieldError
						class="text-center"
						field="agree"
						message={errors.agree}
					/>
				</div>

				<Turnstile
					action={TURNSTILE_ACTION_CONTACT}
					class="flex justify-center"
				/>

				<Button type="submit" class="mx-auto block">
					送信する
				</Button>
			</form>
		</Layout>
	);
}

type FieldErrorProps = {
	field: string;
	message?: string;
	class?: string;
};

function FieldError({ field, message, class: className }: FieldErrorProps) {
	if (!message) return null;
	return (
		<p
			class={`mt-2 text-red-300 text-sm ${className ?? ""}`}
			id={`${field}-error`}
		>
			{message satisfies Child}
		</p>
	);
}
