import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; //plugin umożliwiający użycie reacta w vite

export default defineConfig({
  plugins: [react()], //dodanie react plugin do vite
  base: './', //wszystkie assety są ładowane relatywnie, więc strona działa również w repozytorium GitHub Pages
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist' //folder, do którego Vite wrzuci zbudowaną aplikację
  }
});