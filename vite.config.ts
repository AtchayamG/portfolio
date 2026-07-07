import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed at https://atchayamg.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: {
    target: 'es2019',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['gsap', 'framer-motion'],
        },
      },
    },
  },
});
