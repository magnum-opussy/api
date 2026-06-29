import { Hono } from 'hono'
import { AppEnv } from '../../types'
import { zValidator } from '@hono/zod-validator'
import { SignInSchema, SignUpSchema } from './auth.schema'
import { authService as s } from './auth.service'
import { authMiddleware as m } from '../../middleware/auth.middleware'

export const authRoutes = new Hono<AppEnv>()
  .post(
    '/sign-in',
    zValidator('json', SignInSchema),
    async (c) =>
      c.json(await s.sign.in(c.req.valid('json'))),
  )
  .post(
    '/sign-up',
    zValidator('json', SignUpSchema),
    async (c) =>
      c.json(await s.sign.up(c.req.valid('json')), 201),
  )
  .get('/me', m, async (c) =>
    c.json(await s.me(c.get('gid'))),
  )
