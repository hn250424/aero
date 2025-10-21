import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        outDir: 'lib',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'Aero',
            fileName: (format) => `aero.${format}.js`,
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
    },
    plugins: [
        dts({
            entryRoot: 'src',
            insertTypesEntry: true,
            outDir: 'lib',
            copyDtsFiles: true,
        }),
    ],
})