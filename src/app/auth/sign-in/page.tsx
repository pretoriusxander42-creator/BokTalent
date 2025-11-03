import { SignInForm } from '@/components/auth/SignInForm'
import { useRedirectIfAuthenticated } from '@/lib/auth/hooks'

export default function SignInPage() {
  const { checkRedirect, loading } = useRedirectIfAuthenticated()
  
  // If already authenticated, user will be redirected
  if (checkRedirect() || loading) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SignInForm />
    </div>
  )
}