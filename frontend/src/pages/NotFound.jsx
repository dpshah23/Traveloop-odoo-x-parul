import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.3em] text-teal-300">404</p>
      <h1 className="text-3xl font-semibold text-white sm:text-5xl">That page does not exist.</h1>
      <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
        Use the navigation to return to the homepage or open the trip planner.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
      >
        Go home
      </Link>
    </section>
  )
}