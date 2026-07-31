/** sitemap.xml や robots.txt が出力する正規オリジン。 */
export const SITE_ORIGIN = "https://nichiyobuild.com";

/**
 * sitemap.xml に載せるパス。
 * noindex を付けている /legal は含めない。noindex のURLを送信すると
 * Search Console に警告が出続けるため。
 */
export const INDEXABLE_PATHS = [
	"/",
	"/about",
	"/terms",
	"/privacy",
	"/contact",
];

/**
 * TODO: AdSenseの承認後、パブリッシャーID（pub- で始まる16桁）を設定する。
 * 空のあいだ /ads.txt は404を返すので、無効な内容が配信されることはない。
 */
export const ADSENSE_PUBLISHER_ID = "";
