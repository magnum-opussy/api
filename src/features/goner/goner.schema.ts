import * as z from 'zod'
import { Gender } from '../../generated/prisma/enums'
import { rgxs } from '../../lib/regex'

export const GonerParamSchema = z.object({ gid: z.uuid() })

const pronounsValid = z
  .string()
  .trim()
  .refine((v) => {
    const parts = v.split('/')
    return (
      parts.length === 2 && parts.every((p) => p.length > 0)
    )
  })
  .toLowerCase()
  .catch('Изит окэй иф ай тачью')
  .optional()
const phoneValid = z
  .string()
  .regex(
    rgxs.KZ_PHONE,
    'Это даже не казахский номер, бро...',
  )

export const ModifyGonerSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).max(32).optional(),
  countryId: z.uuid().optional(),
  avatarId: z.uuid().optional(),
  bannerId: z.uuid().optional(),
  bio: z.string().optional(),
  fullname: z.string().optional(),
  pronouns: pronounsValid,
  gender: z.enum(Gender).optional(),
  phone: phoneValid,
  fullAddress: z.string().optional(),
  favouriteGame: z.string().optional(),
  favouriteWayToDie: z.string().optional(),
  favouriteWeapon: z.string().optional(),
  favouriteLocation: z.string().optional(),
  birthdate: z.coerce.date().optional(),
  firstSex: z.coerce.date().optional(),
  secondSex: z.coerce.date().optional(),
})
