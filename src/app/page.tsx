import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
              Connecting Sports Communities
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              BokTalent
            </span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed">
            The premier platform connecting players, scouts, and schools in the world of sports
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="card group">
            <div className="p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Players</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Create and manage your player profile, showcase your skills, and connect with scouts looking for talent.
              </p>
              <Link
                href="/auth/sign-in?role=player"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold group-hover:translate-x-1 transition-transform duration-200"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="card group">
            <div className="p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Scouts</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Discover talent, view detailed player profiles, and manage your scouting activities efficiently.
              </p>
              <Link
                href="/auth/sign-in?role=scout"
                className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold group-hover:translate-x-1 transition-transform duration-200"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="card group sm:col-span-2 lg:col-span-1">
            <div className="p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Schools</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Manage your sports programs and connect with potential recruits to build winning teams.
              </p>
              <Link
                href="/auth/sign-in?role=school_admin"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold group-hover:translate-x-1 transition-transform duration-200"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="glass-effect inline-block px-8 py-6 rounded-2xl shadow-lg">
            <p className="text-gray-600 text-lg">
              Join thousands of athletes, scouts, and institutions already using BokTalent
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
