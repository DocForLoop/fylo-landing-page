import { defineConfig } from 'vite';
import path from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, 'src/scss'),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});