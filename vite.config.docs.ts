import { defineConfig } from 'vite'

export default defineConfig({
    base: '/aero/',
    build: {
        outDir: 'docs',
        emptyOutDir: true
    }
})
