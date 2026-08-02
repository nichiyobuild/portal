import { Button } from "#/components/ui/button";
import { Turnstile } from "#/components/ui/turnstile";
import { LEGAL_DISCLOSURE_PATH } from "#/constants/pages";
import { TURNSTILE_ACTION_LEGAL_DISCLOSURE } from "#/constants/site";

/**
 * 省略事項を含む全文をダウンロードさせるフォーム。
 *
 * GET を受け付けず POST のみにしているのは、クローラーに到達させないため。
 * ここが静的URLだと、電話番号と代表者名が検索インデックスに載ってしまう。
 */
export function DisclosureRequestForm() {
	return (
		<form
			action={LEGAL_DISCLOSURE_PATH}
			class="not-prose my-6 rounded-lg border border-slate-700 bg-slate-900/40 p-5"
			method="post"
		>
			<p class="text-slate-300 text-sm">
				下のボタンから、省略した事項を含む本表記の全文をファイルとして取得できます。
			</p>
			<Turnstile action={TURNSTILE_ACTION_LEGAL_DISCLOSURE} class="mt-4" />
			<Button class="mt-4" type="submit">
				全文をダウンロード
			</Button>
		</form>
	);
}
