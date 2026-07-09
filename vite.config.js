import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update `base` to match your GitHub repo name if it differs from "Portfolio"
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
})
