import { Compass, ShieldCheck, Sparkles } from 'lucide-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BrandMark from '../BrandMark.jsx'

export default function AuthShell({ eyebrow, title, subtitle, children, footerLink, footerText }) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-16">
      <div className="space-y-8">
        <BrandMark />

        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm text-teal-200">
            <Sparkles className="h-4 w-4" />
            {eyebrow}
          </div>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">{subtitle}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <ShieldCheck className="h-5 w-5 text-teal-300" />
            <p className="mt-4 text-sm font-medium text-white">JWT ready</p>
            <p className="mt-2 text-sm text-slate-400">Access and refresh token flow with automatic renewal.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <Compass className="h-5 w-5 text-teal-300" />
            <p className="mt-4 text-sm font-medium text-white">Travel-first</p>
            <p className="mt-2 text-sm text-slate-400">Designed for planning trips, not generic admin screens.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <Sparkles className="h-5 w-5 text-teal-300" />
            <p className="mt-4 text-sm font-medium text-white">Premium UI</p>
            <p className="mt-2 text-sm text-slate-400">Clean gradients, cards, and spacing that feels polished.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-teal-950/20 backdrop-blur sm:p-6">
        {children}

        {footerLink && footerText ? (
          <p className="mt-6 text-center text-sm text-slate-400">
            {footerText}{' '}
            <Link to={footerLink.to} className="font-semibold text-teal-300 hover:text-teal-200">
              {footerLink.label}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  )
}

AuthShell.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footerText: PropTypes.string,
  footerLink: PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
}