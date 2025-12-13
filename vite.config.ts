import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Make accessible from network (required for Android emulator)
    port: 5174,
    strictPort: false, // Allow fallback to other ports if 5174 is in use
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
      }
    }
  }
});
