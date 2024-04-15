import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '127.0.0.1',
        port: 8001,
    },
    resolve: {
        alias: [
            {
                find: /\@\//,
                replacement: path.join(__dirname, './src/'),
            },
        ],
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/library.ts'),
            name: '@coder/prerender',
            fileName: (format, entry) => `@coder/prerender.${entry}.${format}.js`,
            formats: ['es'],
        },
    },
    plugins: [],
});