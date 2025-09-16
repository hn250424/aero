import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'Aero',
            fileName: (format) => `aero.${format}.js`
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            }
        }
    }
})