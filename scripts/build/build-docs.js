import { execSync } from 'child_process'
import { rmSync, mkdirSync, cpSync, existsSync } from 'fs'
import path from 'path'

const rootDir = path.resolve()

const srcDir = path.resolve('src')
const demoDir = path.resolve('demo')

const libDir = path.resolve('lib')
const docsDir = path.resolve('docs')

try {
    console.log("🚀 Building docs...")

    if (!(existsSync(libDir))) {
        console.log("📦 Library not built. Building src...")
        execSync("node scripts/build/build-lib.js", {
            cwd: rootDir,
            stdio: "inherit",
        })
    } else {
        console.log("✅ Library already built.")
    }

    execSync("npx vite build --config vite.config.docs.ts", {
        cwd: rootDir,
        stdio: "inherit",
    })

    console.log("📂 Copying lib → docs...")
    cpSync(libDir, docsDir, { recursive: true })

    console.log("✅ Docs successfully built and copied to ./docs")
} catch (err) {
    console.error("❌ Build failed:", err)
    process.exit(1)
}