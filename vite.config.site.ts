import config from "./vite.config";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	...config,
	// base: "/aero/",
	build: {
		outDir: "docs",
		emptyOutDir: true,
		rollupOptions: {
      input: {
        site: path.resolve(__dirname, "index.html"),
      },
    },
	},
  server: {
    open: "./site-index.html",
  },
});
