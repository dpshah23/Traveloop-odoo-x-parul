import PropTypes from 'prop-types'
import { cn } from '../../utils/cn.js'

export default function Button({ className = '', variant = 'primary', ...props }) {
  const styles =
    variant === 'secondary'
      ? 'border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10'
      : 'bg-teal-400 text-slate-950 hover:bg-teal-300'

  return <button className={cn('inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60', styles, className)} {...props} />
}

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
}