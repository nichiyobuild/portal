export type PageMeta = {
	path: string;
	title: string | null;
	description: string;
};

export const HOME_PAGE = {
	path: "/",
	title: null,
	description:
		"ブラウザですぐ遊べるゲームを公開しています。インストールも会員登録も不要、PCでもスマホでもその場で遊べます。",
} as const satisfies PageMeta;

export const ABOUT_PAGE = {
	path: "/about",
	title: "このサイトについて",
	description:
		"日曜Buildの運営方針、対象ユーザー、動作環境について説明しています。",
} as const satisfies PageMeta;

export const TERMS_PAGE = {
	path: "/terms",
	title: "利用規約",
	description: "nichiyobuild.comおよび公開ゲームの利用規約です。",
} as const satisfies PageMeta;

export const PRIVACY_PAGE = {
	path: "/privacy",
	title: "プライバシーポリシー",
	description:
		"nichiyobuild.comにおける個人情報の取り扱いについて説明しています。",
} as const satisfies PageMeta;

export const LEGAL_PAGE = {
	path: "/legal",
	title: "特定商取引法に基づく表記",
	description:
		"特定商取引法第11条に基づく、当社の有料コンテンツ販売に関する表示です。",
} as const satisfies PageMeta;

export const CONTACT_PAGE = {
	path: "/contact",
	title: "お問い合わせ",
	description:
		"nichiyobuild.comおよび公開ゲームに関するお問い合わせはこちらから。",
} as const satisfies PageMeta;

/**
 * サイト内の実ページ一覧。ここに追加すると、フッターのリンクと
 * sitemap.xml（INDEXABLE_PATHS）の両方に自動で反映される。
 *
 * ルーティング（index.tsx）は別途、ここに定義したパスへコンポーネントを
 * 登録する必要があり、対応漏れは型エラーになる。
 */
export const PAGES = [
	HOME_PAGE,
	ABOUT_PAGE,
	TERMS_PAGE,
	PRIVACY_PAGE,
	LEGAL_PAGE,
	CONTACT_PAGE,
] as const;

export type PagePath = (typeof PAGES)[number]["path"];

/** sitemap.xml に載せるパス。 */
export const INDEXABLE_PATHS: string[] = PAGES.map((page) => page.path);
