import { Layout } from "#/components/pages/layout";
import { Button } from "#/components/ui/button";
import { Checkbox, Input, Select, Textarea } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Turnstile } from "#/components/ui/turnstile";
import {
	CONTACT_CATEGORY_LABELS,
	CONTACT_CATEGORY_VALUES,
} from "#/constants/contact";
import { CONTACT_PAGE, PRIVACY_PAGE } from "#/constants/pages";
import { SITE_DOMAIN, TURNSTILE_ACTION_CONTACT } from "#/constants/site";

export function Contact() {
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
				action="/contact"
				method="post"
				class="mx-auto mt-10 max-w-2xl space-y-6"
			>
				<div>
					<Label for="category" required>
						お問い合わせの種類
					</Label>
					<Select class="mt-2" id="category" name="category" required>
						<option value="">選択してください</option>
						{CONTACT_CATEGORY_VALUES.map((value) => (
							<option key={value} value={value}>
								{CONTACT_CATEGORY_LABELS[value]}
							</option>
						))}
					</Select>
				</div>

				<div>
					<Label for="name" required>
						お名前
					</Label>
					<Input
						class="mt-2"
						id="name"
						name="name"
						placeholder="日曜 太郎"
						required
						type="text"
					/>
				</div>

				<div>
					<Label for="email" required>
						メールアドレス
					</Label>
					<Input
						aria-describedby="email-hint"
						class="mt-2"
						id="email"
						name="email"
						placeholder="you@example.com"
						type="email"
						required
					/>
					<p class="mt-2 text-slate-400 text-sm" id="email-hint">
						回答の送信先として使用します。
					</p>
				</div>

				<div>
					<Label for="message" required>
						お問い合わせ内容
					</Label>
					<Textarea
						aria-describedby="message-hint"
						class="mt-2"
						id="message"
						name="message"
						rows={8}
						required
					/>
					<p class="mt-2 text-slate-400 text-sm" id="message-hint">
						不具合の場合は、お使いの端末とブラウザ、発生した状況をお書きいただけると助かります。
					</p>
				</div>

				<div class="flex items-center justify-center gap-3">
					<Checkbox class="mt-1" id="agree" name="agree" required />
					<Label for="agree" required>
						<a class="text-blue-300 underline" href={PRIVACY_PAGE.path}>
							プライバシーポリシー
						</a>
						に同意します
					</Label>
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
