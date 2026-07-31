import type { Child, JSX } from "hono/jsx";

const buttonClass =
	"rounded-md bg-blue-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950";

type Props = JSX.IntrinsicElements["button"] & {
	children: Child;
	class?: string;
};

export function Button({
	children,
	class: className,
	type = "button",
	...props
}: Props) {
	return (
		<button
			class={className ? `${buttonClass} ${className}` : buttonClass}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
}
