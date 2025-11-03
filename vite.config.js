import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use base dinâmico: na Vercel o site roda na raiz '/',
  // localmente para GitHub Pages mantemos o caminho '/aprendendo-ingles/'
  base: process.env.VERCEL ? '/' : '/aprendendo-ingles/',
  build: {
  outDir: 'dist',
  sourcemap: false
  }
})