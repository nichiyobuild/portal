import { Layout } from "#/components/pages/layout";
import { LEGAL_PAGE } from "#/constants/pages";

export function DisclosureError() {
	return (
		<Layout
			title="ダウンロードできませんでした"
			description={LEGAL_PAGE.description}
			noindex
		>
			<div class="py-16 lg:py-24">
				<h1 class="font-bold text-3xl text-slate-50">
					ダウンロードできませんでした
				</h1>
				<p class="mt-4 max-w-xl text-slate-300 leading-relaxed">
					認証の有効期限が切れているか、確認に失敗しました。
					お手数ですが、もう一度お試しください。
				</p>
				<div class="mt-8 text-sm">
					<a class="text-blue-300 hover:underline" href={LEGAL_PAGE.path}>
						特定商取引法に基づく表記に戻る
					</a>
				</div>
			</div>
		</Layout>
	);
}
