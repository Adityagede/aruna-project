import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  base: '/aruna-project/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        accommodation: resolve(import.meta.dirname, 'accommodation.html'),
        offers: resolve (import.meta.dirname, 'offers.html'),
        
        
      },
    },
  },
})