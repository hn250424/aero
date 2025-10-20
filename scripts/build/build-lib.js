import { execSync } from 'child_process'
import { rmSync, existsSync } from 'fs'
import path from 'path'

const rootDir = path.resolve()
const libDir = path.resolve('lib')

try {
    console.log("🚀 Building library...")

    execSync("npx vite build --config vite.config.lib.ts", {
        cwd: rootDir,
        stdio: "inherit",
    })

    const demoInLib = path.join(libDir, 'demo')
    if (existsSync(demoInLib)) {
        console.log("🗑 Removing demo from lib...")
        rmSync(demoInLib, { recursive: true, force: true })
    }

    console.log("✅ Library built successfully without demo")
} catch (err) {
    console.error("❌ Library build failed:", err)
    process.exit(1)
}