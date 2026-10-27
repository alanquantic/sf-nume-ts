import react from '@vitejs/plugin-react';
import process from 'process';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      port: 3800,
      host: true,
      // La API de NUME solo acepta los dominios de producción (CORS). En local
      // se llama a través de este proxy, mismo origen, sin cabecera Origin.
      proxy: {
        '/promo-api': {
          target: 'https://api-nume-production.up.railway.app/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/promo-api/, ''),
        },
      },
    },
    build: {
      sourcemap: true,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': `${process.cwd()}/src`,
      }
    }
  }
})
