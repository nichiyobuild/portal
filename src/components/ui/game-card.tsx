import type { Game } from "#/constants/games";

type Props = {
	game: Game;
};

export function GameCard({ game }: Props) {
	return (
		<a
			class="group flex flex-col rounded-lg border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-600 hover:bg-slate-900"
			href={game.url}
		>
			<span class="self-start rounded bg-[#9CDA24]/15 px-2 py-0.5 font-medium text-[#9CDA24] text-xs">
				{game.category}
			</span>
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
