import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/health', (c) => {
  return c.json({
    status: 200,
    message: 'Джеронимооооооо!',
  })
})

const server = serve(app)

process.on('SIGNINT', () => {
  console.log(
    'К прибольшому сожалению, мне придётся вас покинуть, господа. Бай-бай!',
  )
  server.close()
  process.exit(0)
})

process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.log('АХТУНГ УКУСИ МЕНЯ ПЧЕЛА!')
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})
