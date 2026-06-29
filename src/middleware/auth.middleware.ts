import { createMiddleware } from 'hono/factory'
import { AppEnv } from '../types'
import { HTTPException } from 'hono/http-exception'
import { JwtLib } from '../lib/jwt'
import { fuckyou } from '../lib/error'

export const authMiddleware = createMiddleware<AppEnv>(
  async (c, next) => {
    const header = c.req.header('Authorization')
    const token = header?.startsWith('Bearer ')
      ? header.slice(7)
      : undefined

    if (!token) return fuckyou(401, 'Токен где твой ало')

    try {
      const payload = await JwtLib.verify(token)
      c.set('gid', payload.sub.gid)
      c.set('role', payload.sub.role)
      await next()
    } catch (e) {
      fuckyou(401, 'Э токен неправильный ты чо')
    }
  },
)
