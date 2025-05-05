import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias “@” para src/
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // redireciona tudo em /api para o seu backend
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
