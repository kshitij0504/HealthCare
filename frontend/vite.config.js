import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // Ensure this matches your deployment subpath if any
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: [],
  },
});
