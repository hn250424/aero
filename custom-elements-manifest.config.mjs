import { createFilterPlugin } from "./scripts/docs/lib/cem-filter-internal.js";

export default {
  globs: ["src/**/*.ts"],
  outdir: "site",
  plugins: [
    createFilterPlugin()
  ]
};
