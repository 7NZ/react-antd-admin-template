import { defineConfig, splitVendorChunkPlugin } from 'vite';
import legacy from '@vitejs/plugin-legacy';
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
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      splitVendorChunkPlugin()
    ],
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
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
