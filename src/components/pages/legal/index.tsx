import { Layout } from "#/components/pages/layout";
import { LEGAL_PAGE, PRIVACY_PAGE, TERMS_PAGE } from "#/constants/pages";
import { DisclosureRequestForm } from "./disclosure-request-form";
import { LegalTable } from "./legal-table";

export function Legal() {
	return (
		<Layout metadata={LEGAL_PAGE}>
			<article class="prose prose-slate prose-invert max-w-none py-8 prose-a:text-blue-300 lg:py-12">
				<h1>特定商取引法に基づく表記</h1>
				<p>
					当社が提供する有料コンテンツの販売について、
					特定商取引法第11条に基づき、以下のとおり表示します。
				</p>

				<div class="overflow-x-auto">
					<LegalTable />
				</div>

				<p>
					本表記において表示を省略した事項については、
					下記よりご請求いただければ、遅滞なく電磁的記録として提供します。
				</p>
				<DisclosureRequestForm />

				<p>
					本表記に定めのない事項については、
					<a href={TERMS_PAGE.path}>利用規約</a>および
					<a href={PRIVACY_PAGE.path}>プライバシーポリシー</a>によります。
				</p>

				<p>最終更新日: 2026年7月30日</p>
			</article>
		</Layout>
	);
}
