import srcConfig from "./vite.config.src";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	...srcConfig,
	plugins: [
		dts({
			entryRoot: "src",
			insertTypesEntry: true,
			outDir: "lib",
			copyDtsFiles: true,
		}),
	],
});
