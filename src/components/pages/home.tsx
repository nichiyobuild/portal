import { Layout } from "#/components/pages/layout";
import { Badge } from "#/components/ui/badge";
import { type Game, games } from "#/constants/games";

export function Home() {
	return (
		<Layout path="/">
			<div class="py-12 lg:py-20">
				<section>
					<h1 class="font-bold text-3xl text-slate-50 leading-tight sm:text-4xl lg:text-5xl">
						ブラウザで、
						<br class="sm:hidden" />
						すぐ遊べる
						<br />
						<span class="text-lime-400">ゲームをつくっています</span>
					</h1>
					<p class="mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">
						インストールも会員登録も不要。
						PCでもスマホでも、開いたその場で始められます。
					</p>
				</section>

				<section class="mt-16 lg:mt-24">
					<h2 class="font-bold text-2xl text-slate-50">公開中のゲーム</h2>
					<div class="mt-6 grid gap-4 sm:grid-cols-2">
						{games.map((game) => (
							<GameCard game={game} key={game.url} />
						))}
					</div>
					<p class="mt-6 text-slate-400 text-sm">
						新しいゲームは、完成したものから順に追加していきます。
					</p>
				</section>

				<section class="mt-16 border-slate-800 border-t pt-12 lg:mt-24">
					<h2 class="font-bold text-2xl text-slate-50">日曜Buildについて</h2>
					<p class="mt-4 max-w-2xl text-slate-300 leading-relaxed">
						平日はソフトウェアエンジニアとして働きながら、週末や仕事終わりの時間でゲームをつくっています。
						つくっている過程は、うまくいったことも失敗もそのままYouTubeとXで発信しています。
					</p>
					<div class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
						<a class="text-blue-300 hover:underline" href="/about">
							このサイトについて
						</a>
						<a
							class="text-blue-300 hover:underline"
							href="https://youtube.com/@nichiyobuild"
						>
							YouTube
						</a>
						<a
							class="text-blue-300 hover:underline"
							href="https://x.com/nichiyobuild"
						>
							X
						</a>
					</div>
				</section>
			</div>
		</Layout>
	);
}

type GameCardProps = {
	game: Game;
};

function GameCard({ game }: GameCardProps) {
	return (
		<a
			class="group flex flex-col rounded-lg border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-600 hover:bg-slate-900"
			href={game.url}
		>
			<Badge class="self-start">{game.category}</Badge>
			<h3 class="mt-3 font-bold text-slate-50 text-xl">{game.title}</h3>
			<p class="mt-2 flex-1 text-slate-400 text-sm leading-relaxed">
				{game.description}
			</p>
			<p class="mt-4 text-slate-500 text-xs">{game.meta.join(" · ")}</p>
			<span class="mt-4 inline-block font-medium text-blue-300 text-sm transition-transform group-hover:translate-x-1">
				遊ぶ →
			</span>
		</a>
	);
}
