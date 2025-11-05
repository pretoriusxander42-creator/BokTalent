export default function PlayerPage(){
  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Player Dashboard</h2>
          <p className="text-lg text-gray-600">Manage your profile and track your progress</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">My Profile</h3>
            <p className="text-gray-600">View and update your player profile</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Statistics</h3>
            <p className="text-gray-600">Track your performance metrics</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Scout Interactions</h3>
            <p className="text-gray-600">View scouts interested in your profile</p>
          </div>
        </div>
      </div>
    </div>
  )
}
