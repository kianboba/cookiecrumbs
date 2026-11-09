import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed at the Vercel root (vite.config base '/'); main.jsx derives the
// router basename from BASE_URL, so subpath deployments still work.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
