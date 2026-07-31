export type Game = {
	title: string;
	description: string;
	url: string;
	category: string;
	/** カード下部に並べる補足情報（料金、対応環境など） */
	meta: string[];
};

export const games: Game[] = [
	{
		title: "2048ゲーム",
		description:
			"フリック操作でパネルをマージして、数字を大きくしていくパズルゲーム。ルールはシンプルですが、盤面が埋まる前にどう積むかで差が出ます。",
		url: "https://2048.nichiyobuild.com/",
		category: "パズル",
		meta: ["無料", "PC / スマホ", "登録不要"],
	},
];
