'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthProvider'
import { Role } from './types'

export { useAuth } from './AuthProvider'

export function useRequireAuth(role?: Role) {
  const { user, loading } = useAuth()
  const router = useRouter()

  const checkAuth = useCallback(() => {
    if (!loading && !user) {
      router.push('/auth/sign-in')
      return false
    }

    if (!loading && role && user?.role !== role) {
      router.push('/unauthorized')
      return false
    }

    return true
  }, [loading, user, role, router])

  return { checkAuth, user, loading }
}

export function useRedirectIfAuthenticated() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const checkRedirect = useCallback(() => {
    if (!loading && user) {
      const roleRoutes: Record<Role, string> = {
        player: '/player/dashboard',
        scout: '/scout/dashboard',
        school_admin: '/school/dashboard',
        admin: '/admin/dashboard',
      }
      
      const route = user.role ? roleRoutes[user.role] : '/'
      router.push(route)
      return true
    }
    return false
  }, [loading, user, router])

  return { checkRedirect, user, loading }
}

export function useSignIn() {
  const { signIn, loading, error } = useAuth()
  const router = useRouter()

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password)
      router.refresh() // Refresh to update server-side session
    } catch (error) {
      // Error state is handled by AuthContext
      console.error('Sign in failed:', error)
    }
  }

  return { handleSignIn, loading, error }
}

export function useSignOut() {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.refresh() // Refresh to update server-side session
      router.push('/') // Redirect to home
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return { handleSignOut }
}