import type { Child } from "hono/jsx";
import { cn } from "#/lib/utils";

const badgeClass = "rounded bg-lime-400/15 px-1.5 py-0.5 text-lime-300 text-xs";

type Props = {
	children: Child;
	class?: string;
};

export function Badge({ children, class: className }: Props) {
	return <span class={cn(badgeClass, className)}>{children}</span>;
}
