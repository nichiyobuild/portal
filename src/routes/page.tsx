import type { Context } from "hono";
import { Hono } from "hono";
import type { JSX } from "hono/jsx/jsx-runtime";
import { About } from "#/components/pages/about";
import { Contact } from "#/components/pages/contact";
import { ContactSuccess } from "#/components/pages/contact/contact-success";
import { Home } from "#/components/pages/home";
import { Privacy } from "#/components/pages/privacy";
import { Terms } from "#/components/pages/terms";
import { LANG_PATH_PATTERN } from "#/constants/i18n";
import { PAGE_PATHS, type PagePath } from "#/constants/pages";

const pageRoutes = new Hono<{ Bindings: CloudflareBindings }>();

type PageContext = Context<{ Bindings: CloudflareBindings }>;

const PAGE_RENDERERS: Record<PagePath, (c: PageContext) => JSX.Element> = {
	"/": () => <Home />,
	"/about": () => <About />,
	"/terms": () => <Terms />,
	"/privacy": (c) => <Privacy representativeName={c.env.REPRESENTATIVE_NAME} />,
	"/contact": () => <Contact />,
	"/contact/success": () => <ContactSuccess />,
};

for (const path of PAGE_PATHS) {
	const render = PAGE_RENDERERS[path];
	// :lang{...} で制約しないと任意の文字列（/en/、/wp-admin/ など）にも
	// マッチし、未対応言語のプレフィックスで日本語ページが200で返ってしまう。
	pageRoutes.get(`/:lang{${LANG_PATH_PATTERN}}${path}`, (c) =>
		c.html(render(c)),
	);

	// lang指定なしの場合はリダイレクト
	pageRoutes.get(path, (c) => {
		const lang = c.get("language");
		const url = new URL(c.req.url);
		url.pathname = `/${lang}${url.pathname}`;
		return c.redirect(url.toString());
	});
}

export { pageRoutes };
