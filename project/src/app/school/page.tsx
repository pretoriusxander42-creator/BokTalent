export default function SchoolPage(){
  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">School Dashboard</h2>
          <p className="text-lg text-gray-600">Manage your sports programs and recruitment</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Programs</h3>
            <p className="text-gray-600">Manage your sports programs</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Recruitment</h3>
            <p className="text-gray-600">View potential recruits and applications</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600">Track program performance and metrics</p>
          </div>
        </div>
      </div>
    </div>
  )
}
