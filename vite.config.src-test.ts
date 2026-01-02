/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import srcConfig from "./vite.config.src";

export default defineConfig({
	...srcConfig,
	build: {}, // explicitly set to empty
	test: {
		globals: true,
		// environment: "node",
		environment: "jsdom",
		include: ["tests/**/*.test.ts"],
	},
});
