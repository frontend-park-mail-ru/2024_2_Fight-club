import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import handlebarsCompilePlugin from './src/vite-plugins/hbs-recompile.js';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [basicSsl(), handlebarsCompilePlugin()],
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
        proxy: {
            '/api': {
                target: 'http://localhost:8008/',
                changeOrigin: true,
            },

            '/websocket': {
                target: 'http://localhost:8008/api/messages/setconn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/websocket/, ''),
                ws: true, // Обязательно для WebSocket
            },

            '/images/': 'http://localhost:9000/',
            '/cities/': 'http://localhost:9000/',
        },
    },
    preview: {
        host: '0.0.0.0',
        port: 5173,
    },
});
