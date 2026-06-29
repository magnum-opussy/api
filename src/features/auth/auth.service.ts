import {
  SignInInput,
  SignUpInput,
} from './auth.schema'
import { db } from '../../lib/db'
import { HTTPException } from 'hono/http-exception'
import { PasswordLib } from '../../lib/password'
import { JwtLib } from '../../lib/jwt'

export const authService = {
  async signUp(input: SignUpInput) {
    const {
      email,
      password,
      username,
      fullname,
    } = input

    const exists = await db.goner.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (exists) {
      throw new HTTPException(409, {
        message:
          'Ле ты чо тваришь такой йемайл и юзернейм уже есть!',
      })
    }

    const { gid } = await db.goner.create({
      data: {
        email,
        username,
        password:
          await PasswordLib.hash(password),
      },
    })

    await db.gonerProfile.create({
      data: {
        gid,
        fullname: fullname ?? null,
      },
    })

    return {
      message:
        'Ваш доходяга успешно зарегистрирован!',
    }
  },

  async signIn(input: SignInInput) {
    const goner = await db.goner.findFirst({
      where: {
        OR: [
          {
            email: input.email,
            username: input.username,
          },
        ],
      },
      omit: {
        password: false,
      },
    })

    if (!goner) {
      throw new HTTPException(404, {
        message: 'Ваш доходяга не был найден!',
      })
    }

    const isCorrectPassword =
      await PasswordLib.verify(
        input.password,
        goner.password,
      )

    if (!isCorrectPassword) {
      throw new HTTPException(401, {
        message:
          'Лееее пароль напиши нормальный да тоже',
      })
    }

    const { password, ...safeGoner } = goner

    return {
      goner: safeGoner,
      token: await JwtLib.sign(goner.gid),
    }
  },

  async me(gid: string) {
    const goner = await db.goner.findUnique({
      where: {
        gid,
      },
      include: {
        profile: true,
      },
    })

    if (!goner) {
      throw new HTTPException(404, {
        message: 'Ваш доходяга не был найден!',
      })
    }

    return goner
  },
}
