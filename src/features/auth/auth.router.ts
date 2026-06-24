import { Hono } from 'hono'
import { AppEnv } from '../../types'
import { zValidator } from '@hono/zod-validator'
import {
  SignInSchema,
  SignUpSchema,
} from './auth.schema'
import { authService } from './auth.service'
import { authMiddleware } from '../../middleware/auth'

export const authRoutes = new Hono<AppEnv>()
  .post(
    '/sign-in',
    zValidator('json', SignInSchema),
    async (c) => {
      return c.json(
        await authService.signIn(
          c.req.valid('json'),
        ),
      )
    },
  )
  .post(
    '/sign-up',
    zValidator('json', SignUpSchema),
    async (c) => {
      return c.json(
        await authService.signUp(
          c.req.valid('json'),
        ),
        201,
      )
    },
  )
  .get('/me', authMiddleware, async (c) => {
    return c.json(
      await authService.me(c.get('gid')),
    )
  })
