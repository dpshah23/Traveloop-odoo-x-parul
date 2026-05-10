import { useState } from 'react'
import PropTypes from 'prop-types'
import { Sidebar } from '../components/dashboard/Sidebar'
import { TopNavbar } from '../components/dashboard/TopNavbar'

export function DashboardLayout({ children, title = 'Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <TopNavbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title={title}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}
