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
    const exists = await db.goner.findFirst({
      where: {
        OR: [
          { email: input.email },
          { username: input.username },
        ],
      },
    })

    if (exists) {
      throw new HTTPException(409, {
        message:
          'Ле ты чо тваришь такой йемайл и юзернейм уже есть!',
      })
    }

    await db.goner.create({
      data: {
        ...input,
        password: await PasswordLib.hash(
          input.password,
        ),
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
    })

    if (!goner) {
      throw new HTTPException(404, {
        message: 'Ваш доходяга не был найден!',
      })
    }
  },
}
