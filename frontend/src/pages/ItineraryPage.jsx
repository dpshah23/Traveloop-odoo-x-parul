import { useState } from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Plus, Map, Settings2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import CitySearchInput from '../components/itinerary/CitySearchInput'
import StopCard from '../components/itinerary/StopCard'

export default function ItineraryPage() {
  const [stops, setStops] = useState([
    {
      id: '1',
      city: 'Paris, France',
      startDate: '2026-05-01',
      endDate: '2026-05-05',
      activities: [
        { id: 'a1', title: 'Visit Eiffel Tower', category: 'Sightseeing', cost: 35, time: '10:00', completed: false },
        { id: 'a2', title: 'Dinner at Le Jules Verne', category: 'Food', cost: 150, time: '19:30', completed: false }
      ]
    }
  ])

  const [isAddingStop, setIsAddingStop] = useState(false)
  const [newStop, setNewStop] = useState({ city: '', startDate: '', endDate: '' })

  const grandTotal = stops.reduce((sum, stop) => sum + stop.activities.reduce((s, a) => s + a.cost, 0), 0)

  const handleAddStop = (e) => {
    e.preventDefault()
    if (!newStop.city || !newStop.startDate || !newStop.endDate) return
    
    setStops([...stops, { ...newStop, id: Date.now().toString(), activities: [] }])
    setNewStop({ city: '', startDate: '', endDate: '' })
    setIsAddingStop(false)
  }

  const handleUpdateStop = (stopId, updatedStop) => {
    setStops(stops.map(s => s.id === stopId ? updatedStop : s))
  }

  return (
    <DashboardLayout title="Itinerary Builder">
      <div className="max-w-5xl mx-auto pb-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm font-semibold mb-3 border border-teal-500/20">
              <Map className="w-4 h-4" /> Trip to Europe
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Itinerary Builder</h1>
            <p className="text-slate-400 mt-2">Organize your stops and activities seamlessly.</p>
          </div>
          
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/50 text-right sm:min-w-[200px]">
             <p className="text-sm font-medium text-slate-400 mb-1">Total Estimated Cost</p>
             <p className="text-3xl font-bold text-teal-400">${grandTotal.toFixed(2)}</p>
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
                  className="[&::-webkit-calendar-picker-indicator]:filter-invert"
                />
              </div>
              <div className="md:col-span-4 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-700/50">
                 <Button type="button" variant="secondary" onClick={() => setIsAddingStop(false)}>Cancel</Button>
                 <Button type="submit">Add Stop</Button>
              </div>
            </form>
          </div>
        )}

        {/* Timeline */}
        <div className="relative pl-4 sm:pl-8 mt-8 space-y-8 before:absolute before:inset-0 before:ml-[1.7rem] sm:before:ml-[2.7rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-500/20 before:via-teal-500/50 before:to-transparent">
          {stops.map((stop, index) => (
            <div key={stop.id} className="relative z-10">
               <div className="absolute -left-4 sm:-left-8 mt-5 w-8 h-8 rounded-full bg-slate-900 border-4 border-teal-500 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.4)]"></div>
               <StopCard 
                 stop={stop} 
                 index={index}
                 onUpdateStop={handleUpdateStop}
               />
            </div>
          ))}
          
          {stops.length === 0 && !isAddingStop && (
            <div className="text-center py-16 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700 ml-4 sm:ml-0 relative z-10">
               <Map className="w-12 h-12 text-slate-500 mx-auto mb-4" />
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
