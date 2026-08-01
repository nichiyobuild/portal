import { Layout } from "#/components/templates/layout";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Checkbox, Input, Select, Textarea } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

export function Contact() {
	return (
		<Layout title={["お問い合わせ"]}>
			<div class="py-8 lg:py-12">
				<article class="prose prose-slate prose-invert max-w-none prose-a:text-blue-300">
					<h1>お問い合わせ</h1>
					<p>
						nichiyobuild.comおよび当サイトで公開しているゲームに関するお問い合わせは、
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
						<a href="/privacy">プライバシーポリシー</a>をご覧ください。
					</p>
				</article>

				{/* TODO: 送信処理の実装 */}
				<form class="mt-10 max-w-2xl space-y-6">
					<div>
						<Label for="category">
							お問い合わせの種類
							<Badge class="ml-2">必須</Badge>
						</Label>
						<Select class="mt-2" id="category" name="category">
							<option value="">選択してください</option>
							<option value="bug">ゲームの不具合について</option>
							<option value="feedback">ゲームへのご意見・ご要望</option>
							<option value="payment">有料コンテンツ・お支払いについて</option>
							<option value="account">アカウントについて</option>
							<option value="disclosure">個人情報の開示等のご請求</option>
							<option value="complaint">個人情報の取り扱いに関する苦情</option>
							<option value="business">取材・お仕事のご依頼</option>
							<option value="other">その他</option>
						</Select>
					</div>

					<div>
						<Label for="name">お名前</Label>
						<Input
							class="mt-2"
							id="name"
							name="name"
							placeholder="日曜 太郎"
							type="text"
						/>
					</div>

					<div>
						<Label for="email">
							メールアドレス
							<Badge class="ml-2">必須</Badge>
						</Label>
						<Input
							class="mt-2"
							id="email"
							name="email"
							placeholder="you@example.com"
							type="email"
						/>
						<p class="mt-2 text-slate-400 text-sm">
							回答の送信先として使用します。
						</p>
					</div>

					<div>
						<Label for="message">
							お問い合わせ内容
							<Badge class="ml-2">必須</Badge>
						</Label>
						<Textarea
							aria-describedby="message-hint"
							class="mt-2"
							id="message"
							name="message"
							rows={8}
						/>
						<p class="mt-2 text-slate-400 text-sm" id="message-hint">
							不具合の場合は、お使いの端末とブラウザ、発生した状況をお書きいただけると助かります。
						</p>
					</div>

					<div class="flex items-start gap-3">
						<Checkbox class="mt-1" id="agree" name="agree" />
						<Label for="agree">
							<a class="text-blue-300 underline" href="/privacy">
								プライバシーポリシー
							</a>
							に同意します
							<Badge class="ml-2">必須</Badge>
						</Label>
					</div>

					<Button type="submit">送信する</Button>
				</form>
			</div>
		</Layout>
	);
}
