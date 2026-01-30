import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Load .env from root directory (parent of frontend)
  envDir: path.resolve(__dirname, '..'),
})
