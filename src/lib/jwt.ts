import {
  sign as hsign,
  verify as hverify,
} from 'hono/jwt'
import { env } from '../config/env'

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

const verify = (token: string) =>
  hverify(token, env.JWT_SECRET, 'ES256')

export const JwtLib = {
  sign,
  verify,
}
