import type { Child } from "hono/jsx";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { Footer } from "#/components/ui/footer";
import { Header } from "#/components/ui/header";

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
				<div class="flex h-svh flex-col">
					<Header />
					<main class="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
