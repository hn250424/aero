import srcConfig from "./vite.config.src";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  ...srcConfig,
  root: path.resolve(__dirname, "src-dev"),
  server: {
    open: "/",
  },
});
