import type { Child } from "hono/jsx";
import { Link, ViteClient } from "vite-ssr-components/hono";

type Props = {
	children: Child;
	title?: string[];
	noindex?: boolean;
};

export function Layout({ children, title = [], noindex = false }: Props) {
	return (
		<html lang="ja">
			<head>
				<ViteClient />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Link href="/src/style.css" rel="stylesheet" />
				<title>{[...title, "日曜Build"].join(" | ")}</title>
				{noindex && <meta name="robots" content="noindex, noarchive" />}
			</head>
			<body class="bg-slate-950 text-slate-50">
				<div class="flex min-h-svh flex-col">
					<Header />
					<main class="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}

function Header() {
	return (
		<header class="p-4">
			<a href="/">
				<img src="/logo.svg" alt="日曜Build" width="186" height="24" />
			</a>
		</header>
	);
}

function Footer() {
	return (
		<footer class="flex flex-wrap justify-end gap-x-4 gap-y-2 px-4 py-8 text-sm sm:px-12">
			<a href="/about" class="hover:underline">
				このサイトについて
			</a>
			<a href="/terms" class="hover:underline">
				利用規約
			</a>
			<a href="/privacy" class="hover:underline">
				プライバシーポリシー
			</a>
			<a href="/legal" class="hover:underline">
				特定商取引法に基づく表記
			</a>
			<a href="/contact" class="hover:underline">
				お問い合わせ
			</a>
		</footer>
	);
}
