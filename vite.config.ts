import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`         → normal static site in dist/ (deploy to Netlify, Vercel, GitHub Pages)
// `npm run build:single`  → one self-contained HTML file in dist-single/ (used for the Claude preview)
export default defineConfig(({ mode }) => {
  const single = mode === 'single'
  return {
    base: './',
    plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
    build: single
      ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 5000 }
      : { outDir: 'dist', chunkSizeWarningLimit: 1500 },
  }
})
