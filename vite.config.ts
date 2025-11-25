import react from '@vitejs/plugin-react';
import process from 'process';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      port: 3800,
      host: true
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
