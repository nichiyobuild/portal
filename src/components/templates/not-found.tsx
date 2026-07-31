import { Layout } from "#/components/templates/layout";

export function NotFound() {
	return (
		<Layout title={["ページが見つかりません"]} noindex>
			<div class="py-16 lg:py-24">
				<p class="font-bold text-[#9CDA24] text-sm">404</p>
				<h1 class="mt-2 font-bold text-3xl text-slate-50 sm:text-4xl">
					ページが見つかりません
				</h1>
				<p class="mt-4 max-w-xl text-slate-300 leading-relaxed">
					お探しのページは、移動または削除された可能性があります。
					URLに誤りがないかご確認ください。
				</p>
				<div class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
					<a class="text-blue-300 hover:underline" href="/">
						トップページ
					</a>
					<a class="text-blue-300 hover:underline" href="/about">
						このサイトについて
					</a>
					<a class="text-blue-300 hover:underline" href="/contact">
						お問い合わせ
					</a>
				</div>
			</div>
		</Layout>
	);
}
