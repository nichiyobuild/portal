import { Hono } from "hono";
import { NAVIGATION_LINKS } from "#/constants/pages";
import { SITE_URL } from "#/constants/site";

const apiRoutes = new Hono<{ Bindings: CloudflareBindings }>();

// 別のworkerから利用規約などのリンクを取得するためのapi
apiRoutes.get("/api/navigation-links", (c) =>
	c.json(
		NAVIGATION_LINKS.map(({ title, path }) => ({
			title,
			url: `${SITE_URL}${path}`,
		})),
	),
);

export { apiRoutes };
