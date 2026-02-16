import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  publicDir: 'public',  // 確保 public 目錄被複製到 dist
  build: {
    outDir: 'dist',
    emptyOutDir: false  // 不清空 dist，保留 _worker.js
  }
})
