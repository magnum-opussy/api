import { db } from '../../lib/db'
import {
  Goner,
  GonerProfile,
} from '../../generated/prisma/client'

export const gonerRepository = {
  get: {
    all: async () =>
      db.goner.findMany({
        orderBy: { createdAt: 'desc' },
        include: { profile: true },
      }),
    id: async (gid: string) =>
      db.goner.findUnique({
        where: { gid },
        include: { profile: true },
      }),
  },
  modify: async (
    gid: string,
    part: Partial<Goner & GonerProfile>,
  ) => {
    await db.goner.update({ where: { gid }, data: part })
    await db.gonerProfile.update({
      where: { gid },
      data: part,
    })
  },
  delete: async (gid: string) => {
    await db.goner.delete({ where: { gid } })
    await db.gonerProfile.delete({ where: { gid } })
  },
}
