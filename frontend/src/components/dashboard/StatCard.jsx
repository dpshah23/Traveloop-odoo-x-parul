import PropTypes from 'prop-types'
import { Card } from './Card'

export function StatCard({ icon: Icon, label, value, change, positive, loading = false }) {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-slate-700/50 rounded-xl"></div>
          <div className="w-16 h-6 bg-slate-700/50 rounded-full"></div>
        </div>
        <div className="w-24 h-4 bg-slate-700/50 rounded mt-4 mb-2"></div>
        <div className="w-32 h-8 bg-slate-700/50 rounded"></div>
      </Card>
    )
  }

  return (
    <Card className="hover:bg-slate-800/80 transition-all duration-300 group cursor-default relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-teal-500/0 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-xl border border-teal-500/20 group-hover:scale-110 transition-transform duration-300 shadow-inner">
            {Icon && <Icon className="w-6 h-6 text-teal-400" />}
          </div>
          {change !== undefined && (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-md ${
                positive
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {positive ? '+' : '-'}
              {change}%
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm font-medium mb-1 group-hover:text-slate-300 transition-colors">{label}</p>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </Card>
  )
}

StatCard.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  change: PropTypes.number,
  positive: PropTypes.bool,
  loading: PropTypes.bool,
}
