import { describe, it, expect } from 'vitest'
import { serverEnvSchema, publicEnvSchema, validateEnv } from './env'

describe('env schemas', () => {
  it('public schema should fail with empty values', () => {
    const res = publicEnvSchema.safeParse({})
    expect(res.success).toBe(false)
  })

  it('server schema should allow optional keys to be missing but require service role', () => {
    const res = serverEnvSchema.safeParse({})
    expect(res.success).toBe(false)
  })

  it('validateEnv should report both failures for empty process', () => {
    const out = validateEnv({})
    expect(out.public.success).toBe(false)
    expect(out.server.success).toBe(false)
  })
})
