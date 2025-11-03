import { describe, it, expect } from 'vitest'
import { niceAge } from './format'

describe('format utils', ()=>{
  it('calculates age from birth year', ()=>{
    const age = niceAge(2000, new Date('2025-01-01'))
    expect(age).toBe(25)
  })
})
