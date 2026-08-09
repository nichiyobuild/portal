/**
 * Turnstile のサイトキー。公開情報なのでコードに直接置いてよい
 * （シークレットキーは Worker Secret の TURNSTILE_SECRET_KEY）。
 *
 * 開発時はテスト用キーに切り替える。本番キーはローカルでは通らず、
 * 逆にテスト用シークレットは本番トークンを拒否するため、
 * サイトキーとシークレットはペアで揃える必要がある（.dev.vars 参照）。
 */
export const TURNSTILE_SITE_KEY = import.meta.env.DEV
	? "1x00000000000000000000AA"
	: "0x4AAAAAAEDvz-tgUTWoDj8R";

/**
 * Turnstile の data-action。トークンの使い回しを防ぐため検証時に突き合わせる。
 * ウィジェットはサイト単位で1つなので、この値がフォームの区別になる。
 */
export const TURNSTILE_ACTION_CONTACT = "contact";
