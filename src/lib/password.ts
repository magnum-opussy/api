import bcrypt from 'bcryptjs'

const hash = (plain: string) =>
  bcrypt.hash(plain, 12)

const verify = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash)

export const PasswordLib = {
  hash,
  verify,
}
