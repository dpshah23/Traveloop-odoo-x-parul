import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Plus, Map, Loader2, Plane } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import CitySearchInput from '../components/itinerary/CitySearchInput'
import StopCard from '../components/itinerary/StopCard'
import apiClient from '../api/client'
import { toast } from 'react-hot-toast'

export default function ItineraryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [stops, setStops] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddingStop, setIsAddingStop] = useState(false)
  const [newStop, setNewStop] = useState({ city: '', startDate: '', endDate: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getCityName = (value) => value.split(',')[0].trim()

  const resolveCityId = async (cityInput) => {
    const cityName = getCityName(cityInput)
    const response = await apiClient.get('/api/cities/', {
      params: { search: cityName },
    })
    const cities = Array.isArray(response.data) ? response.data : (response.data?.results || [])
    const exactMatch = cities.find((city) => city.name.toLowerCase() === cityName.toLowerCase())
    return exactMatch || cities[0] || null
  }

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        let currentId = id;
        
        // If no ID is provided, try to find the most recent trip
        if (!currentId) {
          const tripsRes = await apiClient.get('/api/trips/');
          const tripsList = Array.isArray(tripsRes.data) ? tripsRes.data : (tripsRes.data?.results || []);
          if (tripsList.length > 0) {
            // Sort to get most recent and redirect
            const mostRecent = tripsList.sort((a,b) => new Date(b.start_date) - new Date(a.start_date))[0];
            navigate(`/trips/${mostRecent.id}/itinerary`, { replace: true });
            return;
          } else {
            // No trips exist
            setLoading(false);
            return;
          }
        }

        const [tripRes, stopsRes] = await Promise.all([
          apiClient.get(`/api/trips/${currentId}/`),
          apiClient.get(`/api/trips/${currentId}/stops/`)
        ])
        setTrip(tripRes.data)
        const fetchedStops = Array.isArray(stopsRes.data) ? stopsRes.data : (stopsRes.data?.results || [])
        setStops(fetchedStops)
      } catch (err) {
        toast.error('Failed to load itinerary.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTripData()
  }, [id, navigate])

  const grandTotal = stops.reduce((sum, stop) => {
    const activitiesSum = (stop.activities || []).reduce((s, a) => s + parseFloat(a.cost || 0), 0)
    return sum + activitiesSum
  }, 0)

  const handleAddStop = async (e) => {
    e.preventDefault()
    if (!newStop.city || !newStop.startDate || !newStop.endDate) return

    if (trip?.start_date && newStop.startDate < trip.start_date) {
      toast.error(`Stop start date must be on or after ${trip.start_date}.`)
      return
    }

    if (trip?.end_date && newStop.endDate > trip.end_date) {
      toast.error(`Stop end date must be on or before ${trip.end_date}.`)
      return
    }

    if (newStop.endDate < newStop.startDate) {
      toast.error('Stop end date must be after the start date.')
      return
    }

    setIsSubmitting(true)
    
    try {
      const city = await resolveCityId(newStop.city)
      if (!city) {
        toast.error('City not found. Try a known city from the suggestions.')
        return
      }

      const res = await apiClient.post(`/api/trips/${id}/stops/`, {
        trip: id,
        city_id: city.id,
        start_date: newStop.startDate,
        end_date: newStop.endDate,
      })
      
      const savedStop = { ...res.data, activities: res.data.activities || [] }
      setStops([...stops, savedStop])
      setNewStop({ city: '', startDate: '', endDate: '' })
      setIsAddingStop(false)
      toast.success('Destination added!')
    } catch (err) {
      console.warn('API Add Stop failed', err)
      toast.error('Failed to add destination.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateStop = (stopId, updatedStop) => {
    setStops(stops.map(s => s.id === stopId ? updatedStop : s))
  }

  if (loading) {
    return (
      <DashboardLayout title="Itinerary Builder">
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="w-10 h-10 text-teal-500 animate-spin mb-4" />
          <p className="text-slate-400">Loading your itinerary...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!id) {
    return (
      <DashboardLayout title="Itinerary Builder">
        <div className="flex flex-col items-center justify-center h-96 p-8 text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800 shadow-xl">
            <Plane className="w-10 h-10 text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Trips Available</h2>
          <p className="text-slate-400 mb-8">
            You need to create a trip before you can build an itinerary.
          </p>
          <Button onClick={() => navigate('/trips/new')} className="gap-2 px-6 py-3 shadow-lg shadow-teal-500/20">
            <Plus className="w-5 h-5" />
            Create Your First Trip
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Itinerary Builder">
      <div className="max-w-5xl mx-auto pb-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm font-semibold mb-3 border border-teal-500/20">
              <Map className="w-4 h-4" /> {trip ? trip.title : 'Trip Itinerary'}
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Itinerary Builder</h1>
            <p className="text-slate-400 mt-2">Organize your stops and activities seamlessly.</p>
          </div>
          
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/50 text-right sm:min-w-[200px]">
             <p className="text-sm font-medium text-slate-400 mb-1">Total Estimated Cost</p>
             <p className="text-3xl font-bold text-teal-400">₹{grandTotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Trip Timeline
          </h2>
          <Button className="gap-2 px-4 py-2" onClick={() => setIsAddingStop(!isAddingStop)}>
            <Plus className="w-4 h-4" />
            Add Destination
          </Button>
        </div>

        {/* Add Stop Form */}
        {isAddingStop && (
          <div className="bg-slate-800/80 border border-teal-500/30 p-6 rounded-2xl mb-8 animate-in slide-in-from-top-4 shadow-xl shadow-teal-900/10">
            <h3 className="text-lg font-bold text-white mb-4">New Destination</h3>
            <form onSubmit={handleAddStop} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <CitySearchInput 
                  value={newStop.city} 
                  onChange={(val) => setNewStop({...newStop, city: val})} 
                  onSelect={(val) => setNewStop({...newStop, city: val})} 
                />
              </div>
              <div>
                <Input 
                  label="Start Date" 
                  type="date" 
                  required 
                  value={newStop.startDate}
                  onChange={e => setNewStop({...newStop, startDate: e.target.value})}
                  min={trip?.start_date}
                  max={trip?.end_date}
                  className="[&::-webkit-calendar-picker-indicator]:filter-invert"
                />
              </div>
              <div>
                <Input 
                  label="End Date" 
                  type="date" 
                  required 
                  value={newStop.endDate}
                  onChange={e => setNewStop({...newStop, endDate: e.target.value})}
                  min={trip?.start_date}
                  max={trip?.end_date}
                  className="[&::-webkit-calendar-picker-indicator]:filter-invert"
                />
              </div>
              <div className="md:col-span-4 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-700/50">
                 <Button type="button" variant="secondary" onClick={() => setIsAddingStop(false)}>Cancel</Button>
                 <Button type="submit" disabled={isSubmitting}>
                   {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Stop'}
                 </Button>
              </div>
            </form>
          </div>
        )}

        {/* Timeline */}
        <div className="relative pl-4 sm:pl-8 mt-8 space-y-8 before:absolute before:inset-0 before:ml-[1.7rem] sm:before:ml-[2.7rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-500/20 before:via-teal-500/50 before:to-transparent">
          {stops.map((stop, index) => (
            <div key={stop.id} className="relative z-10 group">
               <div className="absolute -left-4 sm:-left-8 mt-5 w-8 h-8 rounded-full bg-slate-900 border-4 border-teal-500 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.4)] group-hover:scale-110 transition-transform"></div>
               <StopCard 
                 stop={stop} 
                 index={index}
                 onUpdateStop={handleUpdateStop}
               />
            </div>
          ))}
          
          {stops.length === 0 && !isAddingStop && (
            <div className="text-center py-16 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700 ml-4 sm:ml-0 relative z-10 hover:bg-slate-800/50 transition-colors">
               <Plane className="w-12 h-12 text-slate-500 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-white mb-2">Your itinerary is empty</h3>
               <p className="text-slate-400 max-w-md mx-auto mb-6">Start building your dream trip by adding your first destination stop.</p>
               <Button onClick={() => setIsAddingStop(true)}>
                 <Plus className="w-4 h-4 mr-2" /> Add First Stop
               </Button>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}
