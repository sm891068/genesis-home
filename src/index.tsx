import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import indexHtml from '../public/index.html?raw'
import gameMainHtml from '../public/game-main.html?raw'

const app = new Hono()

// 靜態文件服務 - CSS, JS, images etc.
app.use('/static/*', serveStatic({ root: './' }))

// 主頁 - 返回 HTML 內容
app.get('/', (c) => {
  return c.html(indexHtml)
})

app.get('/index.html', (c) => {
  return c.html(indexHtml)
})

// 遊戲頁面
app.get('/game-main.html', (c) => {
  return c.html(gameMainHtml)
})

app.get('/game', (c) => c.redirect('/game-main.html', 302))

export default app
