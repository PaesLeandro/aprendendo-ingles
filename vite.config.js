import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use relative base so the produced `dist` works when opened from
  // file:// or when served from a subpath. Also safe for Netlify root.
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
