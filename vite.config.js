import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@components': new URL('./src/components', import.meta.url).pathname,
      '@pages': new URL('./src/pages', import.meta.url).pathname,
      '@hooks': new URL('./src/hooks', import.meta.url).pathname,
      '@lib': new URL('./src/lib', import.meta.url).pathname,
      '@assets': new URL('./src/assets', import.meta.url).pathname
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion']
        }
      }
    },
    sourcemap: true
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
