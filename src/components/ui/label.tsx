import type { Child, JSX } from "hono/jsx";

const labelClass = "block text-sm font-medium text-slate-200";

type Props = JSX.IntrinsicElements["label"] & {
	children: Child;
	class?: string;
	/** 対応する入力要素の id。ラベルは必ず入力要素と関連付ける。 */
	for: string;
};

export function Label({
	children,
	class: className,
	for: htmlFor,
	...props
}: Props) {
	return (
		<label
			class={className ? `${labelClass} ${className}` : labelClass}
			for={htmlFor}
			{...props}
		>
			{children}
		</label>
	);
}
