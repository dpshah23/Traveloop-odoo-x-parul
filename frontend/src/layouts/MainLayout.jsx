import { LogOut, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import BrandMark from '../components/BrandMark.jsx'
import { navigationLinks } from '../constants/navigation.js'
import { cn } from '../utils/cn.js'
import { useAuth } from '../hooks/useAuth.js'

export default function MainLayout() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [isAuthenticated])

  const handleLogout = () => {
    logout()
    toast.success('Signed out')
  }

  return (
    <div className="min-h-screen text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 md:hidden"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

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

          <div className="hidden items-center gap-3 sm:flex">
            {isLoading ? (
              <div className="h-10 w-36 animate-pulse rounded-full bg-white/10" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                <span>{user.username || user.email}</span>
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
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/signup"
                  className="rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              <nav className="flex flex-col gap-2">
                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'rounded-2xl px-4 py-3 text-sm font-medium transition',
                        isActive ? 'bg-teal-400 text-slate-950' : 'bg-white/5 text-slate-200',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {isAuthenticated && user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link
                    to="/auth/login"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="inline-flex items-center justify-center rounded-2xl bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
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