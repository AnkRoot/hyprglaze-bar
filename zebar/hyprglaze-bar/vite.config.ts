import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 确保使用相对路径
  build: {
    rollupOptions: {
      output: {
        // 手动分块优化
        manualChunks: {
          // React 核心库
          'react-vendor': ['react', 'react-dom'],
          // 动画库
          motion: ['framer-motion'],
          // 数据查询库
          query: ['@tanstack/react-query'],
          // 图标库
          icons: ['lucide-react'],
          // Zebar 核心
          zebar: ['zebar'],
        },
      },
    },
    // 生产环境关闭源码映射以减小体积
    sourcemap: false,
  },
});
