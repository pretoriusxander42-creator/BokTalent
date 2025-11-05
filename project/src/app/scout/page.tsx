export default function ScoutPage(){
  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Scout Dashboard</h2>
          <p className="text-lg text-gray-600">Discover and manage talented players</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Player Search</h3>
            <p className="text-gray-600">Find players matching your criteria</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Saved Players</h3>
            <p className="text-gray-600">View your list of potential recruits</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reports</h3>
            <p className="text-gray-600">Generate scouting reports and analytics</p>
          </div>
        </div>
      </div>
    </div>
  )
}
