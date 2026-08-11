import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { languageDetector } from "hono/language";
import { NotFound } from "#/components/pages/not-found";
import { apiRoutes } from "#/routes/api";
import { otherRoutes } from "#/routes/other";
import { pageRoutes } from "#/routes/page";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(csrf());

app.use(
	languageDetector({
		order: ["path", "header"],
		supportedLanguages: ["ja"],
		fallbackLanguage: "ja",
		lookupFromHeaderKey: "Accept-Language",
	}),
);

app.route("/", pageRoutes);
app.route("/", apiRoutes);
app.route("/", otherRoutes);

app.notFound((c) => c.html(<NotFound />, 404));

export default app;
