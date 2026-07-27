import { Hono } from "hono";
import { About } from "#/components/templates/about";
import { Contact } from "#/components/templates/contact";
import { Home } from "#/components/templates/home";
import { Privacy } from "#/components/templates/privacy";
import { Terms } from "#/components/templates/terms";
import { renderer } from "#/renderer";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
	return c.render(<Home />);
});

app.get("/about", (c) => {
	return c.render(<About />);
});

app.get("/terms", (c) => {
	return c.render(<Terms />);
});

app.get("/privacy", (c) => {
	return c.render(<Privacy />);
});

app.get("/contact", (c) => {
	return c.render(<Contact />);
});

export default app;
