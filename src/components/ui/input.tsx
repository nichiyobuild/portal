import type { JSX } from "hono/jsx";
import { cn } from "#/lib/utils";

const fieldClass =
	"w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-50 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400";

const checkboxClass =
	"size-4 shrink-0 rounded border-slate-700 bg-slate-900 accent-blue-400";

type InputProps = JSX.IntrinsicElements["input"] & { class?: string };
type SelectProps = JSX.IntrinsicElements["select"] & { class?: string };
type TextareaProps = JSX.IntrinsicElements["textarea"] & { class?: string };

export function Input({ class: className, ...props }: InputProps) {
	return <input class={cn(fieldClass, className)} {...props} />;
}

export function Select({ class: className, ...props }: SelectProps) {
	return <select class={cn(fieldClass, className)} {...props} />;
}

export function Textarea({ class: className, ...props }: TextareaProps) {
	return <textarea class={cn(fieldClass, className)} {...props} />;
}

export function Checkbox({
	class: className,
	...props
}: Omit<InputProps, "type">) {
	return (
		<input class={cn(checkboxClass, className)} {...props} type="checkbox" />
	);
}
