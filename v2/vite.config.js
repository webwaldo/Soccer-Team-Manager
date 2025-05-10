import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const versionName = process.env.VERSION_NAME || 'dist'; // Default to 'dist' if no version name is provided
  const outDir = command === 'build' ? `../${versionName}` : 'dist';
  const base = command === 'build' ? `/Soccer-Team-Manager/${versionName}/` : '/';

  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: base,
    build: {
      outDir: outDir,
    }
  };
})
