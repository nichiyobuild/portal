import type { Child } from "hono/jsx";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { HOME_PAGE, NAVIGATION_LINKS, type PageMeta } from "#/constants/pages";
import { SITE_NAME, SITE_URL } from "#/constants/site";

type Props = {
	children: Child;
	metadata: PageMeta;
};

export function Layout({ children, metadata }: Props) {
	const pageTitle = metadata.title
		? `${metadata.title} | ${SITE_NAME}`
		: SITE_NAME;
	const canonicalUrl = metadata.path
		? `${SITE_URL}${metadata.path}`
		: undefined;

	return (
		<html lang="ja">
			<head>
				<meta charset="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<title>{pageTitle}</title>
				<meta content={metadata.description} name="description" />
				{!metadata.index && <meta name="robots" content="noindex, noarchive" />}
				{canonicalUrl && <link href={canonicalUrl} rel="canonical" />}
				{canonicalUrl && (
					<>
						<meta content="website" property="og:type" />
						<meta content={pageTitle} property="og:title" />
						<meta content={metadata.description} property="og:description" />
						<meta content={canonicalUrl} property="og:url" />
						<meta content={SITE_NAME} property="og:site_name" />
						<meta content="ja_JP" property="og:locale" />
						<meta content="summary" name="twitter:card" />
					</>
				)}
				<link href="/favicon.svg" rel="icon" />
				<Link href="/src/style.css" rel="stylesheet" />
				<ViteClient />
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
			<a href={HOME_PAGE.path}>
				<img src="/logo.svg" alt={SITE_NAME} width="186" height="24" />
			</a>
		</header>
	);
}

function Footer() {
	return (
		<footer class="flex flex-wrap justify-end gap-x-4 gap-y-2 px-4 py-8 text-sm sm:px-12">
			{NAVIGATION_LINKS.map((link) => (
				<a class="hover:underline" href={link.path}>
					{link.title}
				</a>
			))}
		</footer>
	);
}
