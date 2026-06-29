import { Hono } from 'hono'
import { AppEnv } from '../../types'
import { authMiddleware as m } from '../../middleware/auth.middleware'
import { gonerService as s } from './goner.service'
import { zValidator as zval } from '@hono/zod-validator'
import {
  ModifyGonerSchema as ms,
  GonerParamSchema as ps,
} from './goner.schema'
import { adminMiddleware as admin } from '../../middleware/admin.middleware'

export const gonerRoutes = new Hono<AppEnv>()
  .use(m)
  .get('/', async (c) => c.json(await s.get.all()))
  .get('/:gid', zval('param', ps), async (c) =>
    c.json(await s.get.id(c.req.valid('param').gid)),
  )
  .put(
    '/:gid',
    zval('param', ps),
    zval('json', ms),
    async (c) => {
      const gid = c.get('gid')
      const role = c.get('role')
      return c.json(
        await s.modify(
          c.req.valid('param').gid,
          c.req.valid('json'),
          { gid, role },
        ),
      )
    },
  )
  .use(admin)
  .delete('/:gid', zval('param', ps), async (c) => {
    const gid = c.get('gid') // author
    const role = c.get('role') // author
    await s.delete(c.req.valid('param').gid, { gid, role })
    return c.json({ message: 'VERY INTERESTING.' })
  })
// TODO: /upload-avatar, /upload-banner
