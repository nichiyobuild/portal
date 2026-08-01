import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { About } from "#/components/pages/about";
import { Contact } from "#/components/pages/contact";
import { Home } from "#/components/pages/home";
import { Legal } from "#/components/pages/legal";
import { NotFound } from "#/components/pages/not-found";
import { Privacy } from "#/components/pages/privacy";
import { Terms } from "#/components/pages/terms";
import type { PagePath } from "#/constants/pages";
import { INDEXABLE_PATHS } from "#/constants/pages";
import { ADSENSE_PUBLISHER_ID, SITE_ORIGIN } from "#/constants/site";

const app = new Hono();

/**
 * PAGES（フッター・sitemapの元データ、src/constants/pages.ts）にあるパスへ、
 * 対応するページを登録する。Record の型がキーの過不足を検出するため、
 * PAGES にパスを追加してここへの登録を忘れると型エラーになる。
 */
const routes: Record<PagePath, FC> = {
	"/": Home,
	"/about": About,
	"/terms": Terms,
	"/privacy": Privacy,
	"/legal": Legal,
	"/contact": Contact,
};

for (const path of Object.keys(routes) as PagePath[]) {
	const Component = routes[path];
	app.get(path, (c) => c.html(<Component />));
}

app.notFound((c) => {
	return c.html(<NotFound />, 404);
});

// noindex のページも Disallow しない。クロールできないと meta robots を
// 読めず、noindex が伝わらないため。
app.get("/robots.txt", (c) => {
	return c.text(
		[
			"User-agent: *",
			"Allow: /",
			"",
			`Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
			"",
		].join("\n"),
	);
});

app.get("/sitemap.xml", (c) => {
	const urls = INDEXABLE_PATHS.map(
		(path) => `\t<url>\n\t\t<loc>${SITE_ORIGIN}${path}</loc>\n\t</url>`,
	).join("\n");
	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		urls,
		"</urlset>",
		"",
	].join("\n");
	return c.body(xml, 200, {
		"Content-Type": "application/xml; charset=UTF-8",
	});
});

// パブリッシャーIDが未設定のうちは配信しない。
// 無効なIDを載せた ads.txt は、広告枠の販売者が未承認と解釈される。
app.get("/ads.txt", (c) => {
	if (!ADSENSE_PUBLISHER_ID) {
		return c.text("Not Found", 404);
	}
	return c.text(
		`google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`,
	);
});

export default app;
