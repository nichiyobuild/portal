import type { Child } from "hono/jsx";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { Footer } from "#/components/ui/footer";
import { Header } from "#/components/ui/header";

type Props = {
	title?: string;
	children: Child;
};

export function Layout({ title = "", children }: Props) {
	return (
		<html lang="en">
			<head>
				<ViteClient />
				<Link href="/src/style.css" rel="stylesheet" />
				<title>{title === "" ? "" : `${title} | `}nichiyo build</title>
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
