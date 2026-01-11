import { defineConfig } from "vite";
import path from "path";
import siteConfig from "./vite.config.site";

export default defineConfig({
	...siteConfig,
	base: "/aero/",
	build: {
		outDir: "docs",
		emptyOutDir: true,
		rollupOptions: {
      input: {
        site: path.resolve(__dirname, "index.html"),
      },
    },
	},
});
