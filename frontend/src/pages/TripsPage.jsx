import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card, GridContainer } from '../components/dashboard/Card'
import { MapPin, Plus } from 'lucide-react'

export default function TripsPage() {
  const trips = [
    {
      id: 1,
      name: 'Paris Getaway',
      destination: 'Paris, France',
      dates: 'May 1 - May 8, 2026',
      budget: '$2,500',
      status: 'Completed',
      image: '🗼',
    },
    {
      id: 2,
      name: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      dates: 'Jun 15 - Jun 28, 2026',
      budget: '$3,200',
      status: 'Upcoming',
      image: '🗾',
    },
    {
      id: 3,
      name: 'Bali Retreat',
      destination: 'Bali, Indonesia',
      dates: 'Jul 5 - Jul 20, 2026',
      budget: '$1,800',
      status: 'Planning',
      image: '🏝️',
    },
  ]

  return (
    <DashboardLayout title="My Trips">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">My Trips</h2>
          <p className="text-slate-400">
            Create and manage all your travel plans in one place
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Trip
        </button>
      </div>

      {/* Trips grid */}
      <GridContainer columns={3}>
        {trips.map((trip) => (
          <Card
            key={trip.id}
            className="cursor-pointer hover:border-teal-500/50 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{trip.image}</span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  trip.status === 'Completed'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : trip.status === 'Upcoming'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}
              >
                {trip.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">
              {trip.name}
            </h3>
            <div className="flex items-center gap-1 text-slate-400 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              {trip.destination}
            </div>
            <div className="text-slate-400 text-sm mb-4">{trip.dates}</div>
            <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
              <span className="text-sm text-slate-400">Budget</span>
              <span className="text-lg font-bold text-teal-400">{trip.budget}</span>
            </div>
          </Card>
        ))}

        {/* Add new trip card */}
        <Card className="flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:border-teal-500/50 border-dashed">
          <Plus className="w-8 h-8 text-slate-400 mb-2" />
          <p className="text-slate-400 font-medium text-center">Create New Trip</p>
          <p className="text-xs text-slate-500 text-center mt-1">
            Start planning your next adventure
          </p>
        </Card>
      </GridContainer>
    </DashboardLayout>
  )
}
