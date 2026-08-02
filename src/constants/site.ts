export const SITE_DOMAIN = "nichiyobuild.com";

/** sitemap.xml や robots.txt が出力する正規オリジン。 */
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const SITE_NAME = "日曜Build";

export const COMPANY_NAME = "Cloudensis合同会社";

export const COMPANY_POSTAL_CODE = "980-0021";
export const COMPANY_ADDRESS =
	"宮城県仙台市青葉区中央２丁目１１－１９ 仙南ビル４階－Ａ";

/**
 * TODO: AdSenseの承認後、パブリッシャーID（pub- で始まる16桁）を設定する。
 * 空のあいだ /ads.txt は404を返すので、無効な内容が配信されることはない。
 */
export const ADSENSE_PUBLISHER_ID = "";
