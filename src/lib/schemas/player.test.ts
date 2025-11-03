import { describe, it, expect } from 'vitest'
import { ProfileSchema } from './player'

describe('ProfileSchema', () => {
  it('accepts minimal empty object', () => {
    const res = ProfileSchema.safeParse({})
    expect(res.success).toBe(true)
  })

  it('rejects invalid dominant_hand', () => {
    const res = ProfileSchema.safeParse({ dominant_hand: 'up' })
    expect(res.success).toBe(false)
  })

  it('enforces bio length', () => {
    const long = 'x'.repeat(2000)
    const res = ProfileSchema.safeParse({ bio: long })
    expect(res.success).toBe(false)
  })
})
