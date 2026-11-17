import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { errorPages } from './error-pages.js'

export default defineConfig({
  plugins: [vue(), errorPages()],
  server: { watch: { ignored: ['**/.playwright-mcp/**', '**/brand-assets/**', '**/*.zip'] } },
})
