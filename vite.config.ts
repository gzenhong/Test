
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 定義 process.env 避免瀏覽器找不到變數而崩潰
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env': process.env
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
});
