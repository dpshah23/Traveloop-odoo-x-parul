import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card, GridContainer } from '../components/dashboard/Card'
import { MapPin, Plus, Loader2, IndianRupee, Calendar } from 'lucide-react'
import apiClient from '../api/client'
import { cn } from '../utils/cn'

export default function TripsPage() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await apiClient.get('/api/trips/')
        const data = Array.isArray(res.data) ? res.data : (res.data?.results || [])
        setTrips(data)
      } catch (error) {
        console.error('Failed to fetch trips', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrips()
  }, [])

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)
  
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'CONFIRMED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'IN_PROGRESS': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20' // PLANNING
    }
  }

  return (
    <DashboardLayout title="My Trips">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">My Trips</h2>
          <p className="text-slate-400">
            Create and manage all your travel plans in one place
          </p>
        </div>
        <Link to="/trips/new" className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-teal-500/25 active:scale-95">
          <Plus className="w-5 h-5" />
          New Trip
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <GridContainer columns={3}>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse bg-slate-800/50 border-slate-700/50 min-h-[220px]">
              <div className="h-32 bg-slate-800 rounded-lg mb-4"></div>
              <div className="h-6 bg-slate-800 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-slate-800 rounded w-1/2 mb-4"></div>
              <div className="pt-4 border-t border-slate-700/50 flex justify-between">
                 <div className="h-4 bg-slate-800 rounded w-12"></div>
                 <div className="h-4 bg-slate-800 rounded w-20"></div>
              </div>
            </Card>
          ))}
        </GridContainer>
      )}

      {/* Empty State */}
      {!loading && trips.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-10 h-10 text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No trips planned yet</h3>
          <p className="text-slate-400 max-w-sm text-center mb-6">
            Your itinerary is empty. Start planning your next adventure to track your budget and activities!
          </p>
          <Link to="/trips/new" className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-teal-500/25">
            Create First Trip
          </Link>
        </div>
      )}

      {/* Trips grid */}
      {!loading && trips.length > 0 && (
        <GridContainer columns={3}>
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => navigate(`/trips/${trip.id}/itinerary`)}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-32 w-full bg-slate-800">
                {trip.cover_image ? (
                  <img src={trip.cover_image} alt={trip.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <MapPin className="w-10 h-10 text-slate-700" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md", getStatusColor(trip.status))}>
                    {trip.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors line-clamp-1">
                  {trip.title}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  {formatDate(trip.start_date)} — {formatDate(trip.end_date)}
                </div>
                
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm text-slate-500 font-medium">Budget</span>
                  <span className="text-lg font-bold text-teal-400 flex items-center">
                    {formatCurrency(trip.total_budget)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Add new trip card */}
          <Link to="/trips/new" className="flex flex-col items-center justify-center min-h-[280px] bg-slate-900/30 border-2 border-dashed border-slate-700/50 rounded-2xl cursor-pointer hover:border-teal-500/50 hover:bg-slate-900/50 transition-all group">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-teal-500/20 group-hover:text-teal-400 transition-colors">
              <Plus className="w-6 h-6 text-slate-400 group-hover:text-teal-400" />
            </div>
            <p className="text-slate-300 font-medium text-center group-hover:text-white transition-colors">Create New Trip</p>
            <p className="text-sm text-slate-500 text-center mt-1">
              Start a new adventure
            </p>
          </Link>
        </GridContainer>
      )}
    </DashboardLayout>
  )
}
