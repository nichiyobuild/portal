import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";

export const renderer = jsxRenderer(({ children }) => {
	return (
		<html lang="en">
			<head>
				<ViteClient />
				<Link href="/src/style.css" rel="stylesheet" />
				<title>nichiyo build</title>
			</head>
			<body class="bg-slate-950 text-slate-50">{children}</body>
		</html>
	);
});
