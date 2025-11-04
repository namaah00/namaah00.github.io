import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ważne dla GitHub Pages!
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist'
  }
});
