import { User } from '@supabase/supabase-js'

export type Role = 'player' | 'scout' | 'school_admin' | 'admin'

export interface AuthUser extends User {
  role?: Role
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: Error | null
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}