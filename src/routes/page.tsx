import { Hono } from "hono";
import { About } from "#/components/pages/about";
import { Contact } from "#/components/pages/contact";
import { ContactSuccess } from "#/components/pages/contact/contact-success";
import { Home } from "#/components/pages/home";
import { NotFound } from "#/components/pages/not-found";
import { Privacy } from "#/components/pages/privacy";
import { Terms } from "#/components/pages/terms";
import {
	ABOUT_PAGE,
	CONTACT_PAGE,
	CONTACT_SUCCESS_PAGE,
	HOME_PAGE,
	PAGE_PATHS,
	PRIVACY_PAGE,
	TERMS_PAGE,
} from "#/constants/pages";

const pageRoutes = new Hono<{ Bindings: CloudflareBindings }>();

pageRoutes.get(`/:lang${HOME_PAGE.path}`, (c) => {
	return c.html(<Home />);
});
pageRoutes.get(`/:lang${ABOUT_PAGE.path}`, (c) => {
	return c.html(<About />);
});
pageRoutes.get(`/:lang${TERMS_PAGE.path}`, (c) => {
	return c.html(<Terms />);
});
pageRoutes.get(`/:lang${PRIVACY_PAGE.path}`, (c) => {
	return c.html(<Privacy representativeName={c.env.REPRESENTATIVE_NAME} />);
});
pageRoutes.get(`/:lang${CONTACT_PAGE.path}`, (c) => {
	return c.html(<Contact />);
});
pageRoutes.get(`/:lang${CONTACT_SUCCESS_PAGE.path}`, (c) => {
	return c.html(<ContactSuccess />);
});

// lang指定なしの場合はリダイレクト
for (const path of PAGE_PATHS) {
	pageRoutes.get(path, (c) => {
		const lang = c.get("language");
		const url = new URL(c.req.url);
		url.pathname = `/${lang}${url.pathname}`;
		return c.redirect(url.toString());
	});
}

pageRoutes.notFound((c) => c.html(<NotFound />, 404));

export { pageRoutes };
