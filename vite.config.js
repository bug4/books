import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/helius-api': {
        target: 'https://api.helius.xyz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/helius-api/, '')
      }
    }
  }
})