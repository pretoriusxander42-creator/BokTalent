import { describe, it, expect } from 'vitest'
import { getRoleFromCookie } from './middleware'

function makeReq(cookieValue?: string){
  return {
    cookies: {
      get: (name: string) => ({ value: cookieValue })
    },
    nextUrl: { pathname: '/' }
  } as any
}

describe('getRoleFromCookie', ()=>{
  it('returns null when no cookie', ()=>{
    const r = makeReq(undefined)
    expect(getRoleFromCookie(r)).toBeNull()
  })

  it('parses role correctly', ()=>{
    const raw = encodeURIComponent(JSON.stringify({ role: 'player' }))
    const r = makeReq(raw)
    expect(getRoleFromCookie(r)).toBe('player')
  })

  it('returns null for malformed json', ()=>{
    const r = makeReq(encodeURIComponent('not-json'))
    expect(getRoleFromCookie(r)).toBeNull()
  })
})
