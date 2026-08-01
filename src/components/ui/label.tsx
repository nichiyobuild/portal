import type { Child, JSX } from "hono/jsx";
import { Badge } from "#/components/ui/badge";

const labelClass = "block text-sm font-medium text-slate-200";

type Props = JSX.IntrinsicElements["label"] & {
	children: Child;
	class?: string;
	/** 対応する入力要素の id。ラベルは必ず入力要素と関連付ける。 */
	for: string;
	required?: boolean;
};

export function Label({
	children,
	class: className,
	for: htmlFor,
	required = false,
	...props
}: Props) {
	return (
		<label
			class={className ? `${labelClass} ${className}` : labelClass}
			for={htmlFor}
			{...props}
		>
			{children}
			{required && <Badge class="ml-2">必須</Badge>}
		</label>
	);
}
