import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@site": path.resolve(__dirname, "./site"),
			"@core": path.resolve(__dirname, "./src/core"),
			"@base": path.resolve(__dirname, "./src/base"),
			"@components": path.resolve(__dirname, "./src/components"),
		},
	},
});
