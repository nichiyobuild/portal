import { Hono } from "hono";
import { About } from "#/components/templates/about";
import { Contact } from "#/components/templates/contact";
import { Home } from "#/components/templates/home";
import { Legal } from "#/components/templates/legal";
import { NotFound } from "#/components/templates/not-found";
import { Privacy } from "#/components/templates/privacy";
import { Terms } from "#/components/templates/terms";
import {
	ADSENSE_PUBLISHER_ID,
	INDEXABLE_PATHS,
	SITE_ORIGIN,
} from "#/constants/site";

const app = new Hono();

app.get("/", (c) => {
	return c.html(<Home />);
});

app.get("/about", (c) => {
	return c.html(<About />);
});

app.get("/terms", (c) => {
	return c.html(<Terms />);
});

app.get("/privacy", (c) => {
	return c.html(<Privacy />);
});

app.get("/legal", (c) => {
	return c.html(<Legal />);
});

app.get("/contact", (c) => {
	return c.html(<Contact />);
});

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
