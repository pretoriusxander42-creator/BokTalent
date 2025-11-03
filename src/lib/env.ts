import { z } from 'zod'

// Schemas are exported so unit tests can validate behavior without importing
export const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().optional(),
  PAYFAST_MERCHANT_ID: z.string().optional(),
  PAYFAST_MERCHANT_KEY: z.string().optional(),
  PAYFAST_PASSPHRASE: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
})

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
})

// Helper to validate and return parsed envs. Tests can call this directly.
export function validateEnv(raw: Record<string, unknown> = process.env) {
  const server = serverEnvSchema.safeParse(raw)
  const pub = publicEnvSchema.safeParse(raw)

  return { server, public: pub }
}

// By default we validate on load and throw on failure to fail fast in non-test environments.
// During tests (NODE_ENV === 'test') we avoid throwing so unit tests can import the module.
const result = validateEnv(process.env)
if (process.env.NODE_ENV !== 'test') {
  if (!result.server.success) {
    throw new Error('Invalid server environment variables: ' + JSON.stringify(result.server.error.format(), null, 2))
  }
  if (!result.public.success) {
    throw new Error('Invalid public environment variables: ' + JSON.stringify(result.public.error.format(), null, 2))
  }
}

export const serverEnv = result.server.success ? result.server.data : undefined
export const publicEnv = result.public.success ? result.public.data : undefined

export const clientEnv = publicEnv
  ? {
      NEXT_PUBLIC_SUPABASE_URL: publicEnv.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  : undefined
