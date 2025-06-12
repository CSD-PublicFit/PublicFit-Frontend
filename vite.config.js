/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  clearScreen: false
})*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    proxy: {
      '/api': {
        target: 'http://3.36.169.185:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
