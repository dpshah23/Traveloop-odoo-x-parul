import PropTypes from 'prop-types'
import { cn } from '../../utils/cn.js'

export default function Switch({ checked, onChange, label, description }) {
  return (
    <label className="flex items-center justify-between cursor-pointer space-x-4">
      <div className="flex-1">
        {label && <span className="block text-sm font-medium text-slate-200">{label}</span>}
        {description && <span className="block text-xs text-slate-400 mt-1 leading-relaxed">{description}</span>}
      </div>
      <div className="relative inline-flex items-center shrink-0">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={cn("w-12 h-6 rounded-full transition-colors duration-300", checked ? "bg-teal-500" : "bg-slate-700")}></div>
        <div className={cn("absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm", checked ? "translate-x-6" : "translate-x-0")}></div>
      </div>
    </label>
  )
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
}
