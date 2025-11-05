export default function AdminPage(){
  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-lg text-gray-600">System administration and management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">User Management</h3>
            <p className="text-gray-600">Manage users and permissions</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">System Settings</h3>
            <p className="text-gray-600">Configure platform settings</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reports</h3>
            <p className="text-gray-600">View system analytics and reports</p>
          </div>
        </div>
      </div>
    </div>
  )
}
