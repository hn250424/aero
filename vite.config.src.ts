import config from "./vite.config";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	...config,
	build: {
		outDir: "lib",
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "Aero",
			fileName: (format) => `aero.${format}.js`,
		},
	},
});
