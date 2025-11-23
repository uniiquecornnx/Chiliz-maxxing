import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      '@hardhat-artifacts': path.resolve(__dirname, 'hardhat-token/artifacts'),
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
})
