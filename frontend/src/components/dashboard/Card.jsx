import PropTypes from 'prop-types'

export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors ${className}`}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
}) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-lg border border-teal-500/20">
          <Icon className="w-6 h-6 text-teal-400" />
        </div>
        {change && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
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
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </Card>
  )
}

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.number,
  positive: PropTypes.bool,
}

export function GridContainer({ children, columns = 4 }) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1'

  return <div className={`grid ${colClass} gap-6`}>{children}</div>
}

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([2, 3, 4]),
}
