import { CheckCircle2, CircleDashed, Compass, IndianRupee, ListTodo } from 'lucide-react'

const trips = [
  {
    name: 'Lisbon Summer Escape',
    status: 'Planning',
    budget: '₹2,03,000',
    dates: 'Aug 08 - Aug 14',
  },
  {
    name: 'Bangkok Food Trail',
    status: 'Confirmed',
    budget: '₹1,43,000',
    dates: 'Oct 02 - Oct 09',
  },
  {
    name: 'Swiss Alpine Circuit',
    status: 'Draft',
    budget: '₹4,00,000',
    dates: 'Jan 11 - Jan 20',
  },
]

const stats = [
  { label: 'Trips planned', value: '12', icon: Compass },
  { label: 'Budget tracked', value: '₹15.3L', icon: IndianRupee },
  { label: 'Tasks completed', value: '84%', icon: ListTodo },
]

export default function Trips() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Trip planner</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A dashboard-style view for every upcoming journey.
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          This screen is a frontend starting point for the Django travel API. Replace the sample data with live trip, stop, and budget endpoints as the backend integration grows.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
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

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Upcoming trips</h2>
            <span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">Live-ready layout</span>
          </div>

          <div className="mt-6 space-y-4">
            {trips.map((trip) => (
              <article key={trip.name} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {trip.status === 'Confirmed' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <CircleDashed className="h-4 w-4 text-sky-300" />
                    )}
                    <p className="font-medium text-white">{trip.name}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{trip.dates}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <span>{trip.budget}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1">{trip.status}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-xl font-semibold text-white">Next integration steps</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            <li>Connect the trip list to the Django REST API with axios.</li>
            <li>Store authenticated user state in the auth context.</li>
            <li>Replace sample cards with live packing, notes, and budget data.</li>
            <li>Add nested routes for trip details, stops, and activities.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}