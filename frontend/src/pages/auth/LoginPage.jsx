import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AuthShell from '../../components/auth/AuthShell.jsx'
import Button from '../../components/ui/Button.jsx'
import Input from '../../components/ui/Input.jsx'
import { useAuth } from '../../hooks/useAuth.js'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const destination = location.state?.from?.pathname || '/dashboard'

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    try {
      await login(form)
      toast.success('Welcome back')
      navigate(destination, { replace: true })
    } catch (error) {
      const apiErrors = error?.response?.data || {}
      setErrors(apiErrors)
      toast.error('Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Secure access for travelers"
      title="Sign in to your Traveloop workspace."
      subtitle="Use your email and password to open your saved trips, budgets, and packing lists in one place."
      footerText="New to Traveloop?"
      footerLink={{ label: 'Create an account', to: '/auth/signup' }}
    >
      <form onSubmit={onSubmit} className="space-y-5 rounded-[1.5rem] bg-slate-950/50 p-5 sm:p-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">Login</h2>
          <p className="text-sm text-slate-400">JWT auth with token refresh and protected pages.</p>
        </div>

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          error={errors.email?.[0]}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Your password"
          value={form.password}
          onChange={onChange}
          error={errors.password?.[0] || errors.detail}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <p className="font-medium text-white">Demo hint</p>
          <p className="mt-2">Use an account created on the signup screen or any existing backend user with a valid email and password.</p>
        </div>

        <div className="text-center text-sm text-slate-400">
          <Link to="/" className="font-semibold text-teal-300 hover:text-teal-200">
            Back to home
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}