import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    server: {
        host: 'localhost',
        port: 80,
    },
    preview: {
        host: '0.0.0.0',
        port: 80,
    },
});
