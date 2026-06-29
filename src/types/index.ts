import { Role as GonerRole } from '../generated/prisma/enums'

export type AppVariables = {
  gid: string
  role: GonerRole
}
export type AppEnv = { Variables: AppVariables }
