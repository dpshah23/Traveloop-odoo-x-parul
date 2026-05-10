import PropTypes from 'prop-types'
import { Menu, Bell, Search } from 'lucide-react'

export function TopNavbar({ onMenuToggle, title = 'Dashboard' }) {
  return (
    <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left side: Menu button + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-200" />
          </button>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>

        {/* Right side: Search + Notifications + User */}
        <div className="flex items-center gap-4">
          {/* Search bar (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none w-48"
            />
          </div>

          {/* Notification bell */}
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative group">
            <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-teal-400 rounded-full" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-slate-700" />

          {/* Status indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-400">Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}

TopNavbar.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
  title: PropTypes.string,
}
