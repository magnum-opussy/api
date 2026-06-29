import { sign as hsign, verify as hverify } from 'hono/jwt'
import { env } from '../config/env'
import { JWTPayload } from 'hono/utils/jwt/types'
import { Role as GonerRole } from '../generated/prisma/client'

type VerifyJwtPayload = JWTPayload & {
  sub: {
    gid: string
    role: GonerRole
  }
}

const sign = (gid: string, role: GonerRole) =>
  hsign(
    {
      sub: { gid, role },
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    env.JWT_SECRET,
    'HS256',
  )

const verify = (token: string): Promise<VerifyJwtPayload> =>
  hverify(
    token,
    env.JWT_SECRET,
    'HS256',
  ) as Promise<VerifyJwtPayload>

export const JwtLib = {
  sign,
  verify,
}
