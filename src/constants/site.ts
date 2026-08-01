export const SITE_DOMAIN = "nichiyobuild.com";

/** sitemap.xml や robots.txt が出力する正規オリジン。 */
export const SITE_ORIGIN = `https://${SITE_DOMAIN}`;

export const SITE_NAME = "日曜Build";

/** ページ側で description を指定しなかった場合に使う既定値。 */
export const DEFAULT_DESCRIPTION =
	"ブラウザですぐ遊べるゲームを公開しています。インストールも会員登録も不要、PCでもスマホでもその場で遊べます。";

/**
 * トップページ以外の、フッターに載せる公開ページ。
 * ここに追加すると、フッターのリンクと sitemap.xml（INDEXABLE_PATHS）の
 * 両方に自動で反映される。noindex のページは載せないこと。
 *
 * ルーティング（index.tsx）は別途、ここに定義したパスへコンポーネントを
 * 登録する必要があり、対応漏れは型エラーになる。
 */
export const NAV_LINKS = [
	{ path: "/about", label: "このサイトについて" },
	{ path: "/terms", label: "利用規約" },
	{ path: "/privacy", label: "プライバシーポリシー" },
	{ path: "/legal", label: "特定商取引法に基づく表記" },
	{ path: "/contact", label: "お問い合わせ" },
] as const;

/** sitemap.xml に載せるパス。トップページ + NAV_LINKS。 */
export const INDEXABLE_PATHS: string[] = [
	"/",
	...NAV_LINKS.map((link) => link.path),
];

/**
 * TODO: AdSenseの承認後、パブリッシャーID（pub- で始まる16桁）を設定する。
 * 空のあいだ /ads.txt は404を返すので、無効な内容が配信されることはない。
 */
export const ADSENSE_PUBLISHER_ID = "";

export const COMPANY_NAME = "Cloudensis合同会社";
