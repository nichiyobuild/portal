import { Hono } from "hono";
import { About } from "#/components/templates/about";
import { Contact } from "#/components/templates/contact";
import { Home } from "#/components/templates/home";
import { Privacy } from "#/components/templates/privacy";
import { Terms } from "#/components/templates/terms";

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

app.get("/contact", (c) => {
	return c.html(<Contact />);
});

export default app;
