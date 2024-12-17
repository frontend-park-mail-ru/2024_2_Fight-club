import { defineConfig } from 'vite';
import handlebarsCompilePlugin from './src/vite-plugins/hbs-recompile.js';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [handlebarsCompilePlugin()],
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern',
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
    preview: {
        host: '0.0.0.0',
        port: 5173,
    },
});
