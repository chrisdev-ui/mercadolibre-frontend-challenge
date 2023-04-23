/// <reference types="vitest" />
/// <reference types="Vite/client" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@contexts': path.resolve(__dirname, './src/contexts/'),
      '@constants': path.resolve(__dirname, './src/common/constants/'),
      '@styles': path.resolve(__dirname, './src/common/styles/'),
      '@utils': path.resolve(__dirname, './src/common/utils/'),
      '@types': path.resolve(__dirname, './src/@types/'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/setupTest.ts'],
  },
});
