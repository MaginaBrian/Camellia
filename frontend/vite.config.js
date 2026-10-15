import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const frontendRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  server: {
    // Journeys fallback JSON lives in the backend folder, outside this root.
    fs: { allow: [path.resolve(frontendRoot, '..')] },
    // Forward API calls to Flask during development
    proxy: { '/api': 'http://127.0.0.1:5000' },
  },
})
