import { CalendarDays, MapPinned, Wallet, ShieldCheck } from 'lucide-react'

const stats = [
  { label: 'Active trips', value: '4', icon: MapPinned },
  { label: 'Upcoming dates', value: '11', icon: CalendarDays },
  { label: 'Budget tracked', value: '$9.2K', icon: Wallet },
]

export default function Dashboard() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 text-emerald-50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Protected area</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Your personal Traveloop dashboard.
          </h1>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/60 px-4 py-2 text-sm text-emerald-100 ring-1 ring-inset ring-emerald-300/20">
          <ShieldCheck className="h-4 w-4" />
          Protected route enabled
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <article key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <Icon className="h-5 w-5 text-teal-300" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
            </article>
          )
        })}
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-300">
        This is the protected landing area for user-specific trip management. Keep shared data fetching in the API layer and render trip detail screens here as the app grows.
      </div>
    </section>
  )
}