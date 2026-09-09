import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react({}),
    ],
    resolve: {
        tsconfigPaths: true
    },
    assetsInclude: ['**/*.zip'],
    server: {
        port: 3000,
        open: true,
    },
    test: {
        globals: true,
        environment: 'jsdom'
    }
});
