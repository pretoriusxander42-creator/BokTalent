'use client'

import { useAuth } from '@/lib/auth/hooks'
import { useSignOut } from '@/lib/auth/hooks'

export function AuthStatus() {
  const { user, loading } = useAuth()
  const { handleSignOut } = useSignOut()

  if (loading) {
    return <div className="h-8 w-8 animate-pulse bg-gray-200 rounded" />
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">
        {user.email}
      </span>
      <button
        onClick={handleSignOut}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        Sign Out
      </button>
    </div>
  )
}