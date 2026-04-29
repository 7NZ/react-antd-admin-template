import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      svgr(),
      react(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      port: 8004,
      host: true,
      // proxy
      proxy: {
        '/apis': {
          target: 'http://api.domain.com/',
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apis/, '')
        }
      }
    }
  };
});
