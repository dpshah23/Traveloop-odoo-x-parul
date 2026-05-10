import { PlaneTakeoff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { appName } from '../constants/navigation.js'

export default function BrandMark() {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-300 ring-1 ring-inset ring-teal-300/30">
        <PlaneTakeoff className="h-5 w-5" />
      </span>
      <span className="text-lg font-semibold tracking-wide text-slate-50">{appName}</span>
    </Link>
  )
}