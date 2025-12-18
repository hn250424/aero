/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		// environment: "node",
		environment: "jsdom",
		include: ["tests/**/*.test.ts"],
	},
	resolve: {
		alias: [
			{ find: "@core", replacement: "/src/core" },
			{ find: "@base", replacement: "/src/base" },
			{ find: "@components", replacement: "/src/components" },
		],
	},
});
