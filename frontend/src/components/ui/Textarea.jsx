import PropTypes from 'prop-types'
import { cn } from '../../utils/cn.js'

export default function Textarea({ className = '', label, hint, error, ...props }) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-slate-200">{label}</span> : null}
      <textarea
        className={cn(
          'w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-teal-300/60 focus:ring-4 focus:ring-teal-400/10 min-h-[100px] resize-y',
          error ? 'border-rose-400/60 focus:border-rose-300/60 focus:ring-rose-400/10' : '',
          className,
        )}
        {...props}
      />
      {error ? <p className="text-sm text-rose-300">{error}</p> : hint ? <p className="text-sm text-slate-400">{hint}</p> : null}
    </label>
  )
}

Textarea.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  error: PropTypes.string,
}
