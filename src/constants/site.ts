export const SITE_DOMAIN = "nichiyobuild.com";

/** sitemap.xml や robots.txt が出力する正規オリジン。 */
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const SITE_NAME = "日曜Build";

export const COMPANY_NAME = "Cloudensis合同会社";

/**
 * 代表者氏名はここには置かない。git 履歴に残さないため Worker Secret
 * （REPRESENTATIVE_NAME）から渡し、PageProps 経由で privacy が表示する。
 * ローカルは .dev.vars、本番は `wrangler secret put REPRESENTATIVE_NAME`。
 *
 * 個人情報保護法32条1項1号の事業者情報として掲載する方針は 2026-08-09 の
 * 設計判断によるもの。請求ベースの開示に切り替えていた時期があるが戻した。
 */

export const COMPANY_POSTAL_CODE = "980-0021";
export const COMPANY_ADDRESS =
	"宮城県仙台市青葉区中央２丁目１１－１９ 仙南ビル４階－Ａ";

/**
 * TODO: AdSenseの承認後、パブリッシャーID（pub- で始まる16桁）を設定する。
 * 空のあいだ /ads.txt は404を返すので、無効な内容が配信されることはない。
 */
export const ADSENSE_PUBLISHER_ID = "";
