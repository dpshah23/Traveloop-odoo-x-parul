import PropTypes from 'prop-types'
import { Calendar, Wallet, ArrowRight } from 'lucide-react'
import { Card } from './Card'

export function TripCard({ trip, loading = false }) {
  if (loading) {
    return (
      <Card className="p-0 overflow-hidden animate-pulse">
        <div className="h-48 bg-slate-700/50 w-full"></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="w-1/2 h-6 bg-slate-700/50 rounded"></div>
            <div className="w-20 h-6 bg-slate-700/50 rounded-full"></div>
          </div>
          <div className="space-y-3 mb-6">
            <div className="w-3/4 h-4 bg-slate-700/50 rounded"></div>
            <div className="w-1/2 h-4 bg-slate-700/50 rounded"></div>
          </div>
          <div className="w-full h-10 bg-slate-700/50 rounded-lg"></div>
        </div>
      </Card>
    )
  }

  const statusColors = {
    Completed: 'bg-green-500/10 text-green-400 border-green-500/20',
    Upcoming: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Planning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  }

  return (
    <Card className="p-0 overflow-hidden hover:border-teal-500/30 transition-all duration-300 group flex flex-col h-full bg-slate-800/40">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
        <img
          src={trip.image || `https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop`}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-lg ${statusColors[trip.status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
            {trip.status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
           <div className="h-1 w-12 bg-teal-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow relative">
        <h4 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">{trip.name}</h4>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center text-slate-400 text-sm">
            <Calendar className="w-4 h-4 mr-3 text-slate-500" />
            <span>{trip.dates}</span>
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <Wallet className="w-4 h-4 mr-3 text-slate-500" />
            <span>Budget: <span className="text-white font-medium">{trip.budget}</span></span>
          </div>
        </div>
        
        <button className="w-full py-2.5 rounded-lg bg-slate-700/50 hover:bg-teal-500 hover:text-white text-slate-300 font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-slate-600/50 hover:border-teal-400 shadow-sm">
          View Details
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </Card>
  )
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string,
    dates: PropTypes.string,
    budget: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string,
  }),
  loading: PropTypes.bool,
}
