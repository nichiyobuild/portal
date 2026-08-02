import { Layout } from "#/components/pages/layout";
import { HOME_PAGE } from "#/constants/pages";

/**
 * POST 後のリダイレクト先。検索結果に出す意味がないので noindex にし、
 * canonical と OGP も出さない（path を渡さない）。
 */
export function ContactSuccess() {
	return (
		<Layout
			title="送信が完了しました"
			description="お問い合わせの送信が完了しました。"
			noindex
		>
			<article class="prose prose-slate prose-invert max-w-none py-8 prose-a:text-blue-300 lg:py-12">
				<h1>送信が完了しました</h1>
				<p>
					お問い合わせありがとうございます。
					いただいた内容には、通常3営業日以内にご入力のメールアドレス宛に返信します。
					お問い合わせの内容によっては、回答にお時間をいただく場合があります。
				</p>
				<p>
					数日たっても返信が届かない場合は、迷惑メールフォルダに振り分けられていないかご確認ください。
					それでも見当たらないときは、お手数ですが再度お問い合わせください。
				</p>
				<p>
					<a href={HOME_PAGE.path}>トップページへ戻る</a>
				</p>
			</article>
		</Layout>
	);
}
