import { createMiddleware } from 'hono/factory'
import { AppEnv } from '../types'
import { HTTPException } from 'hono/http-exception'
import { JwtLib } from '../lib/jwt'

export const authMiddleware =
  createMiddleware<AppEnv>(async (c, next) => {
    const header = c.req.header('Authorization')
    const token = header?.startsWith('Bearer ')
      ? header.slice(7)
      : undefined

    if (!token)
      throw new HTTPException(401, {
        message: 'Токен где твой ало',
      })

    try {
      const payload = await JwtLib.verify(token)
      c.set('gid', payload.sub)
      await next()
    } catch (e) {
      throw new HTTPException(401, {
        message: 'Э токен неправильный ты чо',
      })
    }
  })
