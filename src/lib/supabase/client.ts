import { createBrowserClient } from '@supabase/ssr'

// Access environment variables directly from process.env on the client
// Next.js automatically injects NEXT_PUBLIC_* variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
}

export const supabaseClient = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)
