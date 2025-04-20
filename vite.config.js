import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

// export default defineConfig({
//   plugins: [
//       vue(),
//       laravel({
//           input: ['src/main.js'], // Trỏ đến file chính của dự án
//           buildDirectory: 'build', // Thư mục build
//       }),
//   ],
//   build: {
//       outDir: '../Extra-Study-backend/public/build', // Đầu ra vào backend
//       manifest: true,
//       emptyOutDir: true,
//   },
// });
