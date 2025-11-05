import { useRequireAuth } from '@/lib/auth/hooks'
import { Role } from '@/lib/auth/types'
import { LoadingSpinner } from '../LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  role?: Role
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { checkAuth, loading } = useRequireAuth(role)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!checkAuth()) {
    return null // User will be redirected by the hook
  }

  return <>{children}</>
}