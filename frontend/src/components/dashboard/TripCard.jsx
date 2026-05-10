import PropTypes from 'prop-types'
import { Calendar, Wallet, ArrowRight, MapPin } from 'lucide-react'
import { Card } from './Card'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

export function TripCard({ trip, loading = false }) {
  if (loading) {
    return (
      <Card className="p-0 overflow-hidden animate-pulse border-slate-700/50">
        <div className="h-48 bg-slate-800 w-full"></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="w-1/2 h-6 bg-slate-800 rounded"></div>
            <div className="w-20 h-6 bg-slate-800 rounded-full"></div>
          </div>
          <div className="space-y-3 mb-6">
            <div className="w-3/4 h-4 bg-slate-800 rounded"></div>
            <div className="w-1/2 h-4 bg-slate-800 rounded"></div>
          </div>
          <div className="w-full h-10 bg-slate-800 rounded-lg"></div>
        </div>
      </Card>
    )
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'CONFIRMED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'IN_PROGRESS': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20' // PLANNING
    }
  }

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)
  
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <Card className="p-0 overflow-hidden hover:border-teal-500/30 transition-all duration-300 group flex flex-col h-full bg-slate-900 border-slate-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10">
      <div className="relative h-48 overflow-hidden bg-slate-800">
        {trip.cover_image ? (
          <img
            src={trip.cover_image}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 z-10">
             <MapPin className="w-10 h-10 text-slate-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent z-10" />
        <div className="absolute top-4 right-4 z-20">
          <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-lg", getStatusColor(trip.status))}>
            {trip.status?.replace('_', ' ')}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
           <div className="h-1 w-12 bg-teal-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow relative">
        <h4 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors line-clamp-1">{trip.title}</h4>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center text-slate-400 text-sm">
            <Calendar className="w-4 h-4 mr-3 text-slate-500" />
            <span>{formatDate(trip.start_date)} — {formatDate(trip.end_date)}</span>
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <Wallet className="w-4 h-4 mr-3 text-slate-500" />
            <span>Budget: <span className="text-white font-medium">{formatCurrency(trip.total_budget)}</span></span>
          </div>
        </div>
        
        <Link to={`/trips/${trip.id}/itinerary`} className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-teal-500 hover:text-slate-900 text-slate-300 font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-slate-700 hover:border-teal-400 shadow-sm hover:shadow-teal-500/25">
          View Itinerary
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  )
}

TripCard.propTypes = {
  trip: PropTypes.object,
  loading: PropTypes.bool,
}
