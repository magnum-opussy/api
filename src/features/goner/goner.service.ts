import { HTTPException } from 'hono/http-exception'
import { gonerRepository as r } from './goner.repository'
import { AppVariables } from '../../types'
import { fuckyou } from '../../lib/error'
import {
  Goner,
  GonerProfile,
} from '../../generated/prisma/client'

export const gonerService = {
  get: {
    all: () => r.get.all(),
    id: async (gid: string) => {
      const goner = await r.get.id(gid)
      if (!goner)
        return fuckyou(404, 'Доходяги не существуеееееет!')
      return goner
    },
  },
  modify: async (
    gid: string,
    part: Partial<Goner & GonerProfile>,
    author: AppVariables,
  ) => {
    if (author.role != 'ADMIN' && gid != author.gid)
      fuckyou(403, 'Даже не пытайся чувак')

    const goner = await r.get.id(gid)

    if (!goner) return fuckyou(404, 'Его не существует...')

    return await r.modify(gid, part)
  },
  delete: async (gid: string, author: AppVariables) => {
    if (author.role != 'ADMIN' && gid != author.gid)
      fuckyou(403, 'Даже не пытайся чувак')

    const goner = await r.get.id(gid)

    if (!goner)
      return fuckyou(404, 'Ваш доходяга не был найден(((')

    await r.delete(gid)
  },
}
