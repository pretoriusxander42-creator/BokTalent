import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const roleMap: Record<string, string[]> = {
  '/player': ['player'],
  '/school': ['school_admin'],
  '/scout': ['scout'],
  '/admin': ['admin'],
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Create supabase client for auth
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Check if path requires auth
  for (const prefix of Object.keys(roleMap)) {
    if (pathname.startsWith(prefix)) {
      // Verify session exists
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        const url = req.nextUrl.clone()
        url.pathname = '/auth/sign-in'
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url)
      }

      // Verify role matches
      const allowed = roleMap[prefix]
      const role = session.user.role as string
      if (!role || !allowed.includes(role)) {
        const url = req.nextUrl.clone()
        url.pathname = '/unauthorized'
        return NextResponse.redirect(url)
      }
    }
  }

  // Clone the request headers
  const requestHeaders = new Headers(req.headers)
  
  // Add user info to request headers if available
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    requestHeaders.set('x-user-id', session.user.id)
    requestHeaders.set('x-user-role', session.user.role as string)
  }

  // Return response with updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Update response cookies from Supabase client
  const supabaseCookies = response.cookies.getAll()
  supabaseCookies.forEach(cookie => {
    response.cookies.set(cookie.name, cookie.value, cookie)
  })

  return response
}

export const config = {
  matcher: ['/(player|school|scout|admin)(/.*)?'],
}
