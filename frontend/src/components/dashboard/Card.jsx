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
