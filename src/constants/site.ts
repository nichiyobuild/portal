export const SITE_DOMAIN = "nichiyobuild.com";

/** sitemap.xml や robots.txt が出力する正規オリジン。 */
export const SITE_ORIGIN = `https://${SITE_DOMAIN}`;

export const SITE_NAME = "日曜Build";

/**
 * TODO: AdSenseの承認後、パブリッシャーID（pub- で始まる16桁）を設定する。
 * 空のあいだ /ads.txt は404を返すので、無効な内容が配信されることはない。
 */
export const ADSENSE_PUBLISHER_ID = "";

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

/** Turnstile の data-action。トークンの使い回しを防ぐため検証時に突き合わせる。 */
export const TURNSTILE_ACTION_LEGAL_DISCLOSURE = "legal-disclosure";

export const COMPANY_NAME = "Cloudensis合同会社";

export const COMPANY_POSTAL_CODE = "980-0021";
export const COMPANY_ADDRESS =
	"宮城県仙台市青葉区中央２丁目１１－１９ 仙南ビル４階－Ａ";
