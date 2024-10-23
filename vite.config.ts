import { defineConfig } from 'vite';
import handlebarsCompilePlugin from './hbs-recompile.js';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    base: '/2024_2_Fight-club/',
    plugins: [handlebarsCompilePlugin()],
    server: {
        host: 'localhost',
        port: 80,
    },
    preview: {
        host: '0.0.0.0',
        port: 80,
    },
});
