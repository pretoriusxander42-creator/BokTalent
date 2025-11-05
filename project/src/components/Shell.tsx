"use client"

import * as React from 'react'
import Header from './Header'
import { AuthProvider } from '../lib/auth/AuthProvider'

export default function Shell({ children }: { children: React.ReactNode }){
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
    </AuthProvider>
  )
}
