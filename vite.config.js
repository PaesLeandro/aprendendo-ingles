import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Simplificado para deploy em raiz (Vercel e outros hosts)
  base: '/',
  build: {
  outDir: 'dist',
  sourcemap: false
  }
})