import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
	site: "https://eduaravila.github.io/",
	markdown: {
		shikiConfig: {
			theme: "nord",
			wrap: true,
		},
	},
	integrations: [
		mdx({}),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		image({
			serviceEntryPoint: "@astrojs/image/sharp",
		}),
		sitemap({}),
		prefetch(),
		react(),
		partytown({
			config: { debug: false },
		}),
	],
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
