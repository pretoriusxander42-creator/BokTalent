import { createBrowserClient } from '@supabase/ssr'
import { clientEnv } from '../env'

if (!clientEnv) {
  throw new Error('Client environment not configured (clientEnv undefined)')
}

export const supabaseClient = createBrowserClient(
  clientEnv.NEXT_PUBLIC_SUPABASE_URL,
  clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
