import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

const PROXY_OPTIONS = {
  target: 'http://localhost:8080',
  changeOrigin: true,
  secure: false,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@core', replacement: resolve(__dirname, 'src', 'core') },
      {
        find: '@modules',
        replacement: resolve(__dirname, 'src', 'modules'),
      },
      {
        find: '@shared',
        replacement: resolve(__dirname, 'src', 'shared'),
      },
    ],
  },
  server: {
    port: 5173,
    proxy: {
      '/auth': PROXY_OPTIONS,
      '/api': PROXY_OPTIONS,
    },
  },
});
