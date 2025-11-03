import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome to BokTalent
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Connecting players, scouts, and schools in the world of sports
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Players</h3>
              <p className="mt-2 text-sm text-gray-500">
                Create and manage your player profile, showcase your skills, and connect with scouts.
              </p>
              <div className="mt-4">
                <Link
                  href="/auth/sign-in?role=player"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in as Player →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Scouts</h3>
              <p className="mt-2 text-sm text-gray-500">
                Discover talent, view player profiles, and manage your scouting activities.
              </p>
              <div className="mt-4">
                <Link
                  href="/auth/sign-in?role=scout"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in as Scout →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Schools</h3>
              <p className="mt-2 text-sm text-gray-500">
                Manage your school's sports programs and connect with potential recruits.
              </p>
              <div className="mt-4">
                <Link
                  href="/auth/sign-in?role=school_admin"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in as School Admin →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
