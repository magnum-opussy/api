import * as z from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
})

const parsedEnv = EnvSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'ЛЕЕЕЕЕЕ!!!! .env нормально тоже делай полный рост!',
  )
  console.error(JSON.stringify(parsedEnv.error.issues))
  process.exit(1)
}

export const env = parsedEnv.data
