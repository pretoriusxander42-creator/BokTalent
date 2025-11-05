'use client'

import { useAuth } from '@/lib/auth/hooks'
import { useSignOut } from '@/lib/auth/hooks'

export function AuthStatus() {
  const { user, loading } = useAuth()
  const { handleSignOut } = useSignOut()

  if (loading) {
    return <div className="h-10 w-32 animate-pulse bg-gray-200 rounded-lg" />
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">
            {user.email?.[0].toUpperCase()}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user.email}
        </span>
      </div>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
      >
        Sign Out
      </button>
    </div>
  )
}