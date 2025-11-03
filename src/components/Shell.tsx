"use client"

import * as React from 'react'
import Header from './Header'
import { AuthProvider } from '../lib/auth/AuthProvider'

export default function Shell({ children }: { children: React.ReactNode }){
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </div>
    </AuthProvider>
  )
}
