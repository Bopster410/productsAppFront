import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    build: {
        rollupOptions: {
            input: {
                app: './index.html',
                'service-worker': './src/serviceWorker/sw/index.sw.tsx',
            },
            output: {
                entryFileNames: (assetInfo) =>
                    assetInfo.name === 'service-worker'
                        ? 'sw.js'
                        : '[name]-[hash].js',
            },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.tsx',
    },
});
