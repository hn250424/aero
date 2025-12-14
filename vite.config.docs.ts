import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	base: "/aero/",
	build: {
		outDir: "docs",
		emptyOutDir: true,
	},
	resolve: {
		alias: {
			"@site": path.resolve(__dirname, "./site"),
		},
	},
});
