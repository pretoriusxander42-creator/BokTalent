"use client"

import * as React from 'react'
import Link from 'next/link'
import { useAuth } from '../lib/auth/hooks'
import { AuthStatus } from './auth/AuthStatus'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="glass-effect sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-teal-700 transition-all duration-200">
                BokTalent
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {user?.role === 'player' && (
                <Link
                  href="/player"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'scout' && (
                <Link
                  href="/scout"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'school_admin' && (
                <Link
                  href="/school"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <AuthStatus />
            ) : (
              <Link
                href="/auth/sign-in"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
