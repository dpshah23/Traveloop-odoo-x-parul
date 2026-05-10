import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { GridContainer, Card } from '../components/dashboard/Card'
import { StatCard } from '../components/dashboard/StatCard'
import { TripCard } from '../components/dashboard/TripCard'
import { SectionHeader } from '../components/dashboard/SectionHeader'
import {
  TrendingUp,
  Calendar,
  Wallet,
  MapPin,
  Activity,
  Plus,
  Compass,
  Globe,
  Plane
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState([])
  const [recentTrips, setRecentTrips] = useState([])

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay for skeleton loading state
      await new Promise(resolve => setTimeout(resolve, 1500))

      setStats([
        {
          icon: MapPin,
          label: 'Completed Trips',
          value: '12',
          change: 15,
          positive: true,
        },
        {
          icon: Calendar,
          label: 'Upcoming Trips',
          value: '3',
          change: 8,
          positive: true,
        },
        {
          icon: Wallet,
          label: 'Total Budget Used',
          value: '$4,250',
          change: 12,
          positive: false,
        },
        {
          icon: TrendingUp,
          label: 'Avg. Trip Cost',
          value: '$1,042',
          change: 5,
          positive: false,
        },
      ])

      setRecentTrips([
        {
          id: 1,
          name: 'Paris Getaway',
          dates: 'May 1 - May 8, 2026',
          budget: '$2,500',
          status: 'Completed',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
        },
        {
          id: 2,
          name: 'Tokyo Adventure',
          dates: 'Jun 15 - Jun 28, 2026',
          budget: '$3,200',
          status: 'Upcoming',
          image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
        },
        {
          id: 3,
          name: 'Bali Retreat',
          dates: 'Jul 5 - Jul 20, 2026',
          budget: '$1,800',
          status: 'Planning',
          image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
        },
      ])
      
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const emptyState = recentTrips.length === 0 && !isLoading

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome section */}
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
          Welcome back, {user?.username || 'Traveler'}! 👋
        </h2>
        <p className="text-slate-400 text-lg">
          Ready for your next adventure? Here is your travel summary.
        </p>
      </div>

      {/* Stats grid */}
      <div className="mb-12">
        <GridContainer columns={4}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <StatCard key={idx} loading={true} />
              ))
            : stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
        </GridContainer>
      </div>

      {/* Recent trips section */}
      <div className="mb-12">
        <SectionHeader 
          title="Recent Trips" 
          subtitle="Your active and completed journeys"
          action={
            <Link to="/trips/new" className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-teal-500/25 active:scale-95 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              Create Trip
            </Link>
          }
        />

        {emptyState ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed border-2 border-slate-700 bg-slate-800/20">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Plane className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No trips planned yet</h3>
            <p className="text-slate-400 max-w-sm mb-6">
              You haven&apos;t created any trips. Start planning your next adventure today!
            </p>
            <Link to="/trips/new" className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-teal-500/25 active:scale-95">
              <Plus className="w-5 h-5" />
              Plan Your First Trip
            </Link>
          </Card>
        ) : (
          <GridContainer columns={3}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <TripCard key={idx} loading={true} />
                ))
              : recentTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
          </GridContainer>
        )}
      </div>

      {/* Travel Inspiration Section */}
      <div className="mb-12">
        <SectionHeader 
          title="Travel Inspiration" 
          subtitle="Discover new places for your next adventure"
          action={
            <button className="text-teal-400 hover:text-teal-300 font-medium text-sm flex items-center gap-1 group transition-colors">
              Explore All <Compass className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          }
        />
        <GridContainer columns={2}>
          <Card className="p-0 overflow-hidden relative h-64 group cursor-pointer border-none rounded-2xl">
             <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop" alt="Paris" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
             <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white mb-3 inline-block">Trending</span>
                <h4 className="text-2xl font-bold text-white mb-1">European Tour</h4>
                <p className="text-slate-200 text-sm">Discover the romantic streets of Paris and Rome</p>
             </div>
          </Card>
          <Card className="p-0 overflow-hidden relative h-64 group cursor-pointer border-none rounded-2xl">
             <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop" alt="Nature" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
             <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white mb-3 inline-block">Nature</span>
                <h4 className="text-2xl font-bold text-white mb-1">Alpine Escapes</h4>
                <p className="text-slate-200 text-sm">Find peace in the majestic Swiss Alps</p>
             </div>
          </Card>
        </GridContainer>
      </div>

      {/* Quick actions grid */}
      <div>
        <SectionHeader title="Quick Tools" />
        <GridContainer columns={3}>
          <Card className="flex items-center gap-4 cursor-pointer hover:border-teal-500/50 hover:bg-slate-800/80 transition-all group">
            <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-xl group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white font-semibold group-hover:text-teal-400 transition-colors">Plan Itinerary</p>
              <p className="text-xs text-slate-400">Day-by-day planner</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 cursor-pointer hover:border-teal-500/50 hover:bg-slate-800/80 transition-all group">
            <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-xl group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white font-semibold group-hover:text-teal-400 transition-colors">Manage Budget</p>
              <p className="text-xs text-slate-400">Track spending</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 cursor-pointer hover:border-teal-500/50 hover:bg-slate-800/80 transition-all group">
            <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-xl group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white font-semibold group-hover:text-teal-400 transition-colors">Explore Destinations</p>
              <p className="text-xs text-slate-400">Find new places</p>
            </div>
          </Card>
        </GridContainer>
      </div>
    </DashboardLayout>
  )
}