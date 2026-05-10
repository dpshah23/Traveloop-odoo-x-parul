import { useAuth } from '../hooks/useAuth'
import { DashboardLayout } from '../layouts/DashboardLayout'
import {
  StatCard,
  GridContainer,
  Card,
} from '../components/dashboard/Card'
import {
  TrendingUp,
  Calendar,
  Wallet,
  Users,
  MapPin,
  Activity,
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()

  // Mock data - replace with API calls
  const stats = [
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
  ]

  const recentTrips = [
    {
      id: 1,
      name: 'Paris Getaway',
      dates: 'May 1 - May 8, 2026',
      budget: '$2,500',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Tokyo Adventure',
      dates: 'Jun 15 - Jun 28, 2026',
      budget: '$3,200',
      status: 'Upcoming',
    },
    {
      id: 3,
      name: 'Bali Retreat',
      dates: 'Jul 5 - Jul 20, 2026',
      budget: '$1,800',
      status: 'Planning',
    },
  ]

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.username}! 👋
        </h2>
        <p className="text-slate-400">
          Here&apos;s a summary of your travel activity this month
        </p>
      </div>

      {/* Stats grid */}
      <GridContainer columns={4}>
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </GridContainer>

      {/* Recent trips section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Trips</h3>
            <p className="text-sm text-slate-400">Your active and completed trips</p>
          </div>
          <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
            + New Trip
          </button>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Trip Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {recentTrips.map((trip) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-white">
                      {trip.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {trip.dates}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-teal-400">
                      {trip.budget}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          trip.status === 'Completed'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : trip.status === 'Upcoming'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}
                      >
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Quick actions grid */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
        <GridContainer columns={3}>
          <Card className="flex items-center gap-4 cursor-pointer hover:border-teal-500/50">
            <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-lg">
              <Activity className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Plan New Trip</p>
              <p className="text-xs text-slate-400">Start your next adventure</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 cursor-pointer hover:border-teal-500/50">
            <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-lg">
              <Wallet className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Manage Budget</p>
              <p className="text-xs text-slate-400">Track spending</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 cursor-pointer hover:border-teal-500/50">
            <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-lg">
              <Users className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Invite Friends</p>
              <p className="text-xs text-slate-400">Travel together</p>
            </div>
          </Card>
        </GridContainer>
      </div>
    </DashboardLayout>
  )
}