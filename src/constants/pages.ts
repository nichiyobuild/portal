export type PageMeta = {
	path: string;
	title: string | null;
	description: string;
	index: boolean;
};

export const HOME_PAGE = {
	path: "/",
	title: null,
	description:
		"ブラウザですぐ遊べるゲームを公開しています。インストールも会員登録も不要、PCでもスマホでもその場で遊べます。",
	index: true,
} as const satisfies PageMeta;

export const ABOUT_PAGE = {
	path: "/about",
	title: "このサイトについて",
	description:
		"日曜Buildの運営方針、対象ユーザー、動作環境について説明しています。",
	index: true,
} as const satisfies PageMeta;

export const TERMS_PAGE = {
	path: "/terms",
	title: "利用規約",
	description: "nichiyobuild.comおよび公開ゲームの利用規約です。",
	index: true,
} as const satisfies PageMeta;

export const PRIVACY_PAGE = {
	path: "/privacy",
	title: "プライバシーポリシー",
	description:
		"nichiyobuild.comにおける個人情報の取り扱いについて説明しています。",
	index: true,
} as const satisfies PageMeta;

export const CONTACT_PAGE = {
	path: "/contact",
	title: "お問い合わせ",
	description:
		"nichiyobuild.comおよび公開ゲームに関するお問い合わせはこちらから。",
	index: true,
} as const satisfies PageMeta;

export const CONTACT_SUCCESS_PAGE = {
	path: "/contact/success",
	title: "送信が完了しました",
	description: "お問い合わせの送信が完了しました。",
	index: false,
} as const satisfies PageMeta;

export const NOT_FOUND_PAGE = {
	path: "/404",
	title: "ページが見つかりません",
	description: "ページが見つかりません",
	index: false,
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
	CONTACT_PAGE,
	CONTACT_SUCCESS_PAGE,
] as const;

export type PagePath = (typeof PAGES)[number]["path"];

export const INDEXED_PAGES = PAGES.filter((page) => page.index);

export const NAVIGATION_LINKS = [
	ABOUT_PAGE,
	TERMS_PAGE,
	PRIVACY_PAGE,
	CONTACT_PAGE,
].map(({ path, title }) => ({ path, title }));
