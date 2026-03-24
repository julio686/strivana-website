import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Get timestamp for cache busting
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Add timestamp to force cache bust
        entryFileNames: `assets/[name]-[hash]-${timestamp}.js`,
        chunkFileNames: `assets/[name]-[hash]-${timestamp}.js`,
        assetFileNames: `assets/[name]-[hash]-${timestamp}[extname]`,
      },
    },
  },
})
