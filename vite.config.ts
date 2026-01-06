import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@site": path.resolve(__dirname, "./site"),
			"@src": path.resolve(__dirname, "./src"),
		},
	},
});
