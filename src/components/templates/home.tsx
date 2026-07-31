import { Layout } from "#/components/templates/layout";
import { GameCard } from "#/components/ui/game-card";
import { games } from "#/constants/games";

export function Home() {
	return (
		<Layout>
			<div class="py-12 lg:py-20">
				<section>
					<h1 class="font-bold text-3xl text-slate-50 leading-tight sm:text-4xl lg:text-5xl">
						ブラウザで、
						<br class="sm:hidden" />
						すぐ遊べる
						<br />
						<span class="text-[#9CDA24]">ゲームをつくっています</span>
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
