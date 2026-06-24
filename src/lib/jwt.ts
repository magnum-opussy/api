import {
  sign as hsign,
  verify as hverify,
} from 'hono/jwt'
import { env } from '../config/env'
import { JWTPayload } from 'hono/utils/jwt/types'

type VerifyJwtPayload = JWTPayload & {
  sub: string
}

const sign = (gid: string) =>
  hsign(
    {
      sub: gid,
      exp:
        Math.floor(Date.now() / 1000) +
        60 * 60 * 24 * 7,
    },
    env.JWT_SECRET,
  )

const verify = (
  token: string,
): Promise<VerifyJwtPayload> =>
  hverify(
    token,
    env.JWT_SECRET,
    'ES256',
  ) as Promise<VerifyJwtPayload>

export const JwtLib = {
  sign,
  verify,
}
