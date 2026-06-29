import { createMiddleware as create } from 'hono/factory'
import { AppEnv } from '../types'
import { HTTPException } from 'hono/http-exception'
import { fuckyou } from '../lib/error'

export const adminMiddleware = create<AppEnv>(
  async (c, next) => {
    const role = c.get('role')

    if (role != 'ADMIN')
      fuckyou(403, 'Ты не крут, отдыхай, плесень.')

    await next()
  },
)
