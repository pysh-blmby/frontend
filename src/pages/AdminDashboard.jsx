import React from 'react'
import TopStatsAdmin from '../sections/TopStatsAdmin'
import AdminSidebar from '../sections/AdminSidebar'
import AdminHeader from '../sections/AdminHeader'

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-zinc-950 overflow-hidden">
      
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Right Side Content */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* Header */}
        <AdminHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <TopStatsAdmin />
        </main>

      </div>

    </div>
  )
}

export default AdminDashboard
