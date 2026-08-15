import { execSync } from "child_process";
import path from "path";
import { cpSync, existsSync } from "fs";

const rootDir = path.resolve();
const srcDir = path.resolve("src");
const siteDir = path.resolve("site");
const libDir = path.resolve("lib");
const docsDir = path.resolve("docs");

try {
  console.log("🚀 Building docs...");

  if (!existsSync(libDir)) {
    console.log("📦 Library not built. Building src...");

    execSync("node scripts/build/build-src.js", {
      cwd: rootDir,
      stdio: "inherit",
    });
  } else {
    console.log("✅ Library already built.");
  }

  execSync("npx vite build --config vite.config.site-build.ts", {
    cwd: rootDir,
    stdio: "inherit",
  });

  console.log("📂 Copying lib → docs...");
  cpSync(libDir, docsDir, { recursive: true });
  console.log("📄 Copying 404.html → docs...");
  cpSync(path.resolve("404.html"), path.resolve(docsDir, "404.html"));

  console.log("✅ Docs successfully built and copied to ./docs");
} catch (err) {
  console.error("❌ Build failed:", err);
  process.exit(1);
}
