import { Layout } from "#/components/pages/layout";
import { CONTACT_PAGE } from "#/constants/pages";

/**
 * POST 後のリダイレクト先。検索結果に出す意味がないので noindex にし、
 * canonical と OGP も出さない（path を渡さない）。
 *
 * リダイレクトのため入力内容は復元できない。その旨を明記しておかないと、
 * 長文を書いた利用者が原因も分からないまま内容を失うことになる。
 * TODO: 入力値を保持したままフォームに戻し、原因を項目ごとに示すこと。
 */
export function ContactError() {
	return (
		<Layout
			title="送信できませんでした"
			description="お問い合わせを送信できませんでした。"
			noindex
		>
			<article class="prose prose-slate prose-invert max-w-none py-8 prose-a:text-blue-300 lg:py-12">
				<h1>送信できませんでした</h1>
				<p>
					入力内容に不備があったか、送信処理中に問題が発生しました。
					お手数ですが、入力内容をご確認のうえ、もう一度お試しください。
				</p>
				<p>
					恐れ入りますが、入力いただいた内容は保持されていません。
					認証の有効期限が切れていた場合も、このページが表示されます。
				</p>
				<p>
					<a href={CONTACT_PAGE.path}>お問い合わせフォームへ戻る</a>
				</p>
			</article>
		</Layout>
	);
}
