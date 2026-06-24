import * as z from 'zod'

export const SignInSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).max(32).optional(),
  password: z.string().min(8).max(128),
})

export const SignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(128),
  fullname: z.string().min(2).optional(),
})

export type SignUpInput = z.infer<
  typeof SignUpSchema
>
export type SignInInput = z.infer<
  typeof SignInSchema
>
