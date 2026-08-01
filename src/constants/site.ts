/** sitemap.xml や robots.txt が出力する正規オリジン。 */
export const SITE_ORIGIN = "https://nichiyobuild.com";

/**
 * sitemap.xml に載せるパス。
 * noindex のページは含めないこと。noindex のURLを送信すると
 * Search Console に警告が出続けるため。
 */
export const INDEXABLE_PATHS = [
	"/",
	"/about",
	"/terms",
	"/privacy",
	"/legal",
	"/contact",
];

/**
 * TODO: AdSenseの承認後、パブリッシャーID（pub- で始まる16桁）を設定する。
 * 空のあいだ /ads.txt は404を返すので、無効な内容が配信されることはない。
 */
export const ADSENSE_PUBLISHER_ID = "";

export const COMPANY_NAME = "Cloudensis合同会社";
