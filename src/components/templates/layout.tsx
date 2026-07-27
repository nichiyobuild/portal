import type { Child } from "hono/jsx";
import { Footer } from "#/components/ui/footer";
import { Header } from "#/components/ui/header";

type Props = {
	children: Child;
};

export function Layout({ children }: Props) {
	return (
		<div class="flex h-svh flex-col">
			<Header />
			<main class="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
			<Footer />
		</div>
	);
}
