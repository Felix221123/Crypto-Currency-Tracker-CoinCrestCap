/// <reference types="vitest" />
/// <reference types="vite/client" />


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests
      '/api': {
        target: 'https://api.coingecko.com/api/v3',
        changeOrigin: true, // necessary for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/coinranking': {
        target: 'https://coinranking1.p.rapidapi.com/',
        changeOrigin: true, // necessary for virtual hosted sites
        rewrite: (path) => path.replace(/^\/coinranking/, '')
      },
      '/coinpaprika': {
        target: 'https://api.coinpaprika.com/v1/',
        changeOrigin: true, // necessary for virtual hosted sites
        rewrite: (path) => path.replace(/^\/coinpaprika/, '')
      },
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles:'./src/test/setup.ts'
  }
})
