import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AuthShell from '../../components/auth/AuthShell.jsx'
import Button from '../../components/ui/Button.jsx'
import Input from '../../components/ui/Input.jsx'
import { useAuth } from '../../hooks/useAuth.js'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ email: '', username: '', password: '', password2: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    try {
      await signup(form)
      toast.success('Account created')
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const apiErrors = error?.response?.data || {}
      setErrors(apiErrors)
      toast.error('Signup failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Create your travel profile"
      title="Build your Traveloop account in under a minute."
      subtitle="Register with email, username, and password. Once signed in, your trips are ready behind a protected JWT route."
      footerText="Already have an account?"
      footerLink={{ label: 'Sign in', to: '/auth/login' }}
    >
      <form onSubmit={onSubmit} className="space-y-5 rounded-[1.5rem] bg-slate-950/50 p-5 sm:p-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">Sign up</h2>
          <p className="text-sm text-slate-400">Creates a user through the Django registration endpoint.</p>
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
          label="Username"
          name="username"
          type="text"
          placeholder="traveler123"
          value={form.username}
          onChange={onChange}
          error={errors.username?.[0]}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={form.password}
          onChange={onChange}
          error={errors.password?.[0]}
        />

        <Input
          label="Confirm password"
          name="password2"
          type="password"
          placeholder="Repeat your password"
          value={form.password2}
          onChange={onChange}
          error={errors.password2?.[0] || errors.password?.[0]}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>

        <div className="text-center text-sm text-slate-400">
          <Link to="/" className="font-semibold text-teal-300 hover:text-teal-200">
            Back to home
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}