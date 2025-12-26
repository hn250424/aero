import { execSync } from "child_process";
import path from "path";

const rootDir = path.resolve();

try {
	console.log("🚀 Building docs...");

	execSync("npx vite build --config vite.config.docs.ts", {
		cwd: rootDir,
		stdio: "inherit",
	});

	console.log("✅ Docs successfully built and copied to ./docs");
} catch (err) {
	console.error("❌ Build failed:", err);
	process.exit(1);
}
