import { ArrowRight, CalendarDays, MapPinned, Wallet, WandSparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const highlights = [
  {
    icon: MapPinned,
    title: 'Smart destination planning',
    description: 'Organize stops, routes, and must-see spots without losing the bigger picture.',
  },
  {
    icon: CalendarDays,
    title: 'Timeline-first itinerary building',
    description: 'Turn dates into a structured trip flow that is easy to adjust and share.',
  },
  {
    icon: Wallet,
    title: 'Budget visibility',
    description: 'Track estimates and actual spend so every trip stays grounded in reality.',
  },
]

export default function Home() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm text-teal-200">
            <WandSparkles className="h-4 w-4" />
            Travel planning, reworked for focus and speed
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Plan trips with a clean workflow and a modern interface.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Traveloop keeps destinations, dates, budgets, and packing in one place so travelers can move from idea to itinerary with less friction.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trips"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Open trip planner
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#highlights"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Explore features
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-teal-950/20 backdrop-blur">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Sample itinerary</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">Paris Weekend</p>
                  <p className="text-sm text-slate-400">Jun 12 - Jun 16</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">Confirmed</span>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">Kyoto Discovery</p>
                  <p className="text-sm text-slate-400">Sep 03 - Sep 11</p>
                </div>
                <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-medium text-sky-300">Planning</span>
              </div>
              <div className="rounded-2xl border border-dashed border-white/15 p-4 text-sm text-slate-400">
                Budget snapshots, packing lists, city notes, and activity tracking plug in here.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="highlights" className="mt-16 grid gap-5 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon

          return (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-inset ring-teal-300/20">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}