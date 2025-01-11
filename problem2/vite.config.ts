import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      'prices.json': 'https://interview.switcheo.com',  // Đổi địa chỉ theo backend của bạn
    },
  },
})
