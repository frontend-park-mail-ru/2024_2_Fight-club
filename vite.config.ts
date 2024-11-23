import { defineConfig } from 'vite';
import handlebarsCompilePlugin from './hbs-recompile.js';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [
        handlebarsCompilePlugin(),
        {
            name: 'multiple-index-html',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/surveys/') {
                        req.url = '/surveys/surveys.html';
                    }
                    next();
                });
            },
        },
    ],
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
