'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabaseClient } from '../supabase/client'
import { AuthContextType, AuthState, AuthUser } from './types'

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState)

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabaseClient.auth.getSession()
        if (session?.user) {
          setState({
            user: session.user as AuthUser,
            loading: false,
            error: null,
          })
        } else {
          setState({ ...initialState, loading: false })
        }

        // Listen for auth changes
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
          async (_event, session) => {
            if (session?.user) {
              setState({
                user: session.user as AuthUser,
                loading: false,
                error: null,
              })
            } else {
              setState({ ...initialState, loading: false })
            }
          }
        )

        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        setState({
          user: null,
          loading: false,
          error: error as Error,
        })
      }
    }

    initAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setState({ ...state, loading: true, error: null })
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      // User will be set by the auth state change listener
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error as Error,
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      setState({ ...state, loading: true, error: null })
      const { error } = await supabaseClient.auth.signOut()
      if (error) throw error
      // User will be cleared by the auth state change listener
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error as Error,
      })
      throw error
    }
  }

  const refreshSession = async () => {
    try {
      setState({ ...state, loading: true, error: null })
      const { data: { session }, error } = await supabaseClient.auth.getSession()
      if (error) throw error
      
      if (session?.user) {
        setState({
          user: session.user as AuthUser,
          loading: false,
          error: null,
        })
      } else {
        setState({ ...initialState, loading: false })
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error as Error,
      })
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
