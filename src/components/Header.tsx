"use client"

import * as React from 'react'
import Link from 'next/link'
import { useAuth } from '../lib/auth/hooks'
import { AuthStatus } from './auth/AuthStatus'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between gap-4 p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-bold">BokTalent</Link>
        <nav className="flex gap-2">
          {user?.role === 'player' && (
            <Link href="/player" className="text-sm text-gray-600">Player Dashboard</Link>
          )}
          {user?.role === 'scout' && (
            <Link href="/scout" className="text-sm text-gray-600">Scout Dashboard</Link>
          )}
          {user?.role === 'school_admin' && (
            <Link href="/school" className="text-sm text-gray-600">School Dashboard</Link>
          )}
          {user?.role === 'admin' && (
            <Link href="/admin" className="text-sm text-gray-600">Admin Dashboard</Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <AuthStatus />
        ) : (
          <Link
            href="/auth/sign-in"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}
