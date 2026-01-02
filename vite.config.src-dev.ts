import srcConfig from "./vite.config.src";
import { defineConfig } from "vite";

export default defineConfig({
	...srcConfig,
	server: {
    open: "./src-dev-index.html",
  },
});
