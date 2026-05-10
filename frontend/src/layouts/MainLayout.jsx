import { useState } from 'react'
import { ArrowRight, LogOut } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import BrandMark from '../components/BrandMark.jsx'
import { navigationLinks } from '../constants/navigation.js'
import { cn } from '../utils/cn.js'
import { useAuth } from '../hooks/useAuth.js'

export default function MainLayout() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleDemoSignIn = () => {
    setIsSigningIn(true)
    login({
      name: 'Traveloop Planner',
      email: 'planner@traveloop.app',
    })
    toast.success('Demo session started')
    setIsSigningIn(false)
  }

  const handleLogout = () => {
    logout()
    toast.success('Signed out')
  }

  return (
    <div className="min-h-screen text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive ? 'bg-teal-400 text-slate-950' : 'text-slate-300 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 sm:flex">
                <span>{user.name}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDemoSignIn}
                disabled={isSigningIn}
                className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Start planning
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-400 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <p>Built for modern trip planning with React, Vite, Tailwind CSS, and Django REST.</p>
          <p>Traveloop</p>
        </div>
      </footer>
    </div>
  )
}