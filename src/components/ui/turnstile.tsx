import { TURNSTILE_SITE_KEY } from "#/constants/site";
import { cn } from "#/lib/utils";

type Props = {
	/**
	 * このフォームを識別する値。siteverify のレスポンスと突き合わせて、
	 * 別のフォームで取得したトークンの使い回しを防ぐ。
	 */
	action: string;
	class?: string;
};

export function Turnstile({ action, class: className }: Props) {
	return (
		<>
			<div
				class={cn("cf-turnstile", className)}
				data-action={action}
				data-sitekey={TURNSTILE_SITE_KEY}
				data-theme="dark"
			/>
			{/* 置いたページでしか使わないので、Layout の head ではなくここで読み込む */}
			<script
				async
				defer
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
			/>
		</>
	);
}
