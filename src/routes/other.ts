import { Hono } from "hono";
import { INDEXED_PAGES } from "#/constants/pages";
import { ADSENSE_PUBLISHER_ID, SITE_URL } from "#/constants/site";

const otherRoutes = new Hono<{ Bindings: CloudflareBindings }>();

// noindex のページも Disallow しない。クロールできないと meta robots を
// 読めず、noindex が伝わらないため。
otherRoutes.get("/robots.txt", (c) =>
	c.text(
		[
			"User-agent: *",
			"Allow: /",
			"",
			`Sitemap: ${SITE_URL}/sitemap.xml`,
			"",
		].join("\n"),
	),
);

otherRoutes.get("/sitemap.xml", (c) => {
	const urls = INDEXED_PAGES.map(
		(page) => `\t<url>\n\t\t<loc>${SITE_URL}${page.path}</loc>\n\t</url>`,
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
otherRoutes.get("/ads.txt", (c) => {
	if (!ADSENSE_PUBLISHER_ID) {
		return c.text("Not Found", 404);
	}
	return c.text(
		`google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`,
	);
});

export { otherRoutes };
