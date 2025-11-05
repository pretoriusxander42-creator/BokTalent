import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { serverEnv } from '../env'

// Allow disabling Supabase client (useful for E2E/dev when a live Supabase isn't available)
let _supabase: any = undefined

if (process.env.DISABLE_SUPABASE === '1') {
  _supabase = undefined
} else {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required')
  }

  if (!serverEnv) {
    throw new Error('Server environment is not configured (serverEnv undefined)')
  }

  _supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookies().set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookies().set(name, '', { ...options, maxAge: 0 })
        },
      },
      global: { 
        headers: { 'X-Project-Client': 'boktalent-server' } 
      }
    }
  )
}

export let supabaseServer = _supabase

// Allow tests to inject a fake supabase server client
export function setSupabaseServerForTests(client: any) {
  supabaseServer = client
}
