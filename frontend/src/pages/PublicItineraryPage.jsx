import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, IndianRupee, Clock, Loader2, Plane } from 'lucide-react'
import apiClient from '../api/client'
import { cn } from '../utils/cn'

export default function PublicItineraryPage() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [trip, setTrip] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await apiClient.get(`/api/share/${slug}/`)
        setTrip(res.data)
      } catch (err) {
        setError('Itinerary not found or is private.')
      } finally {
        setLoading(false)
      }
    }
    fetchTrip()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-teal-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Loading itinerary...</p>
      </div>
    )
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
          <Plane className="w-10 h-10 text-slate-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Oops!</h1>
        <p className="text-slate-400 max-w-sm mb-8">{error}</p>
        <Link to="/" className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg font-bold transition-all">
          Go to Traveloop
        </Link>
      </div>
    )
  }

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)
  
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-teal-500/30">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        {trip.cover_image ? (
          <img src={trip.cover_image} alt={trip.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        {/* Top Nav */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <Link to="/" className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
               <MapPin className="w-5 h-5 text-white" />
             </div>
             <span className="text-xl font-bold text-white tracking-tight drop-shadow-md">Traveloop</span>
          </Link>
          <Link to="/auth/signup" className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-sm font-bold text-white transition-all border border-white/10">
            Create your own
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm font-semibold mb-4 border border-teal-500/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              Shared Itinerary
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
              {trip.title}
            </h1>
            {trip.description && (
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-6 drop-shadow-md leading-relaxed">
                {trip.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 text-white bg-slate-900/50 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                <Calendar className="w-5 h-5 text-teal-400" />
                {formatDate(trip.start_date)} — {formatDate(trip.end_date)}
              </div>
              {trip.total_budget && (
                <div className="flex items-center gap-2 text-white bg-slate-900/50 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                  <IndianRupee className="w-5 h-5 text-teal-400" />
                  {formatCurrency(trip.total_budget)} Budget
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Timeline Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              Journey Timeline
            </h2>
            
            <div className="relative pl-6 md:pl-10 space-y-12 before:absolute before:inset-0 before:ml-[1.4rem] md:before:ml-[2.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-500/50 before:via-teal-500/20 before:to-transparent">
              
              {trip.stops && trip.stops.length > 0 ? (
                trip.stops.map((stop, index) => (
                  <div key={stop.id} className="relative z-10">
                    <div className="absolute -left-6 md:-left-10 mt-1.5 w-6 h-6 rounded-full bg-slate-950 border-4 border-teal-500 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.5)]"></div>
                    
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl hover:border-slate-700 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div>
                          <div className="text-teal-400 font-bold text-sm tracking-widest uppercase mb-1">
                            Stop {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {stop.city?.name || `Destination ${index + 1}`}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                            <Calendar className="w-4 h-4" />
                            {formatDate(stop.start_date)} to {formatDate(stop.end_date)}
                          </div>
                        </div>
                        {stop.daily_budget && (
                          <div className="inline-flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-medium">
                            <IndianRupee className="w-4 h-4 text-slate-400" />
                            {formatCurrency(stop.daily_budget)} / day
                          </div>
                        )}
                      </div>
                      
                      {stop.stop_notes && (
                        <p className="text-slate-300 leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-800/50 mb-6 italic">
                          "{stop.stop_notes}"
                        </p>
                      )}

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Planned Highlights</h4>
                        <div className="group flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 transition-all">
                           <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                             <MapPin className="w-5 h-5 text-blue-400" />
                           </div>
                           <div className="flex-1">
                             <h5 className="font-semibold text-white">City Tour & Sightseeing</h5>
                             <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-medium">
                               <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 10:00 AM</span>
                             </div>
                           </div>
                        </div>
                        <div className="group flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 transition-all">
                           <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                             <MapPin className="w-5 h-5 text-orange-400" />
                           </div>
                           <div className="flex-1">
                             <h5 className="font-semibold text-white">Local Dinner Experience</h5>
                             <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-medium">
                               <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 07:30 PM</span>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="relative z-10 text-slate-400 py-8 pl-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                  No destinations added to this itinerary yet.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Notes Column */}
          <div className="space-y-8">
            {/* Trip Notes Section */}
            {trip.notes && trip.notes.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-8">
                <h3 className="text-lg font-bold text-white mb-6">Travel Notes</h3>
                <div className="space-y-4">
                  {trip.notes.filter(n => n.is_public).map(note => (
                    <div key={note.id} className="pb-4 border-b border-slate-800 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-teal-400 mb-2">{note.title}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  ))}
                  {trip.notes.filter(n => n.is_public).length === 0 && (
                    <p className="text-sm text-slate-500">No public notes available.</p>
                  )}
                </div>
              </div>
            )}
            
            {/* CTA */}
            <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                 <Plane className="w-32 h-32 rotate-[-45deg]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Inspired by this trip?</h3>
              <p className="text-sm text-slate-300 mb-8 relative z-10">
                Join Traveloop today to create your own stunning itineraries, track budgets, and share adventures with friends.
              </p>
              <Link to="/auth/signup" className="block w-full text-center px-4 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-xl font-bold transition-all shadow-lg hover:shadow-teal-500/25 relative z-10">
                Start Planning Free
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      
      <footer className="border-t border-slate-900 bg-slate-950 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
             <MapPin className="w-5 h-5 text-white" />
             <span className="text-lg font-bold text-white tracking-tight">Traveloop</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Traveloop. The modern way to plan your trips.
          </p>
        </div>
      </footer>
    </div>
  )
}
