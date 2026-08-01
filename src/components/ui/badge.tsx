import type { Child } from "hono/jsx";

const badgeClass = "rounded bg-lime-400/15 px-1.5 py-0.5 text-lime-300 text-xs";

type Props = {
	children: Child;
	class?: string;
};

export function Badge({ children, class: className }: Props) {
	return (
		<span class={className ? `${badgeClass} ${className}` : badgeClass}>
			{children}
		</span>
	);
}
