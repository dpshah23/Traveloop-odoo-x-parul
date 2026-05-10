import { useState, useEffect } from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card, GridContainer } from '../components/dashboard/Card'
import { StatCard } from '../components/dashboard/StatCard'
import { IndianRupee, TrendingDown, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { cn } from '../utils/cn'
import apiClient from '../api/client'

export default function BudgetPage() {
  const [loading, setLoading] = useState(true)
  const [trips, setTrips] = useState([])
  const [budgetEntries, setBudgetEntries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripsRes, budgetRes] = await Promise.all([
          apiClient.get('/api/trips/'),
          apiClient.get('/api/budget/')
        ])
        
        const tripsData = Array.isArray(tripsRes.data) ? tripsRes.data : (tripsRes.data?.results || [])
        const budgetData = Array.isArray(budgetRes.data) ? budgetRes.data : (budgetRes.data?.results || [])
        
        setTrips(tripsData)
        setBudgetEntries(budgetData)
      } catch (error) {
        console.error("Error fetching budget data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const TOTAL_BUDGET = trips.reduce((sum, trip) => sum + parseFloat(trip.total_budget || 0), 0)
  
  const TOTAL_SPENT = budgetEntries.reduce((sum, entry) => sum + parseFloat(entry.amount), 0)
  
  const REMAINING = Math.max(TOTAL_BUDGET - TOTAL_SPENT, 0)
  const SPENT_PERCENTAGE = TOTAL_BUDGET > 0 ? (TOTAL_SPENT / TOTAL_BUDGET) * 100 : 0

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)

  const budgetStats = [
    {
      icon: IndianRupee,
      label: 'Total Budget',
      value: formatCurrency(TOTAL_BUDGET),
      change: 0,
      positive: false,
    },
    {
      icon: TrendingDown,
      label: 'Spent',
      value: formatCurrency(TOTAL_SPENT),
      change: 0,
      positive: false,
    },
    {
      icon: TrendingUp,
      label: 'Remaining',
      value: formatCurrency(REMAINING),
      change: 0,
      positive: true,
    },
    {
      icon: IndianRupee,
      label: 'Avg per Trip',
      value: trips.length ? formatCurrency(TOTAL_SPENT / trips.length) : '₹0',
      change: 0,
      positive: false,
    },
  ]

  const CATEGORY_MAP = {
    'ACCOMMODATION': { label: 'Accommodation', color: '#0ea5e9' }, // sky-500
    'TRANSPORT': { label: 'Transportation', color: '#a855f7' }, // purple-500
    'FOOD': { label: 'Food & Dining', color: '#f59e0b' },   // amber-500
    'SIGHTSEEING': { label: 'Sightseeing', color: '#10b981' },      // emerald-500
    'SHOPPING': { label: 'Shopping', color: '#ec4899' }, // pink-500
    'OTHER': { label: 'Other', color: '#64748b' } // slate-500
  }

  const categoryTotals = budgetEntries.reduce((acc, entry) => {
    const cat = entry.category || 'OTHER'
    acc[cat] = (acc[cat] || 0) + parseFloat(entry.amount)
    return acc
  }, {})

  const expenses = Object.keys(categoryTotals).map(cat => ({
    category: CATEGORY_MAP[cat]?.label || cat,
    amount: categoryTotals[cat],
    color: CATEGORY_MAP[cat]?.color || '#cbd5e1'
  })).sort((a, b) => b.amount - a.amount)

  const tripTotals = budgetEntries.reduce((acc, entry) => {
    const tripId = entry.trip
    acc[tripId] = (acc[tripId] || 0) + parseFloat(entry.amount)
    return acc
  }, {})

  const topTrips = Object.keys(tripTotals).map(tripId => {
    const trip = trips.find(t => t.id === tripId)
    return {
      trip: trip ? trip.title : 'Unknown Trip',
      amount: tripTotals[tripId]
    }
  }).sort((a, b) => b.amount - a.amount).slice(0, 5)

  if (loading) {
    return (
      <DashboardLayout title="Budget Breakdown">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Budget Breakdown">
      <div className="max-w-6xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Budget Analytics</h2>
          <p className="text-slate-400 text-lg">Monitor your spending across all categories</p>
        </div>

        {/* Global Progress */}
        <Card className="mb-8 border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <IndianRupee className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 w-full">
               <h3 className="text-slate-400 font-medium mb-1">Total Trip Budget</h3>
               <div className="flex items-baseline gap-3 mb-6">
                 <span className="text-5xl font-black text-white">{formatCurrency(TOTAL_SPENT)}</span>
                 <span className="text-xl text-slate-500 font-medium">/ {formatCurrency(TOTAL_BUDGET)}</span>
               </div>
               
               <div className="space-y-2">
                 <div className="flex justify-between text-sm font-medium">
                   <span className="text-slate-300">Overall Progress</span>
                   <span className={cn(SPENT_PERCENTAGE > 90 ? "text-rose-400" : "text-teal-400")}>{SPENT_PERCENTAGE.toFixed(1)}%</span>
                 </div>
                 <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-slate-700/50 p-0.5">
                   <div
                     className={cn(
                       "h-full rounded-full transition-all duration-1000",
                       SPENT_PERCENTAGE > 90 ? "bg-rose-500" : SPENT_PERCENTAGE > 75 ? "bg-amber-500" : "bg-gradient-to-r from-teal-400 to-emerald-400"
                     )}
                     style={{ width: `${Math.min(SPENT_PERCENTAGE, 100)}%` }}
                   />
                 </div>
               </div>
               
               {SPENT_PERCENTAGE > 90 && (
                 <div className="mt-4 inline-flex items-center gap-2 text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg text-sm font-medium border border-rose-500/20">
                   <AlertTriangle className="w-4 h-4" />
                   Warning: You are approaching your budget limit!
                 </div>
               )}
            </div>

            <div className="w-full md:w-64 h-64 shrink-0">
               {expenses.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={expenses}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="amount"
                       stroke="none"
                     >
                       {expenses.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <RechartsTooltip 
                       formatter={(value) => formatCurrency(value)}
                       contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc' }}
                       itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                     />
                   </PieChart>
                 </ResponsiveContainer>
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-500">
                   No expenses to display
                 </div>
               )}
            </div>
          </div>
        </Card>

        {/* Stats grid */}
        <GridContainer columns={4} className="mb-8">
          {budgetStats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </GridContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Breakdown */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Category Breakdown</h3>
            <div className="space-y-6">
              {expenses.length === 0 && (
                <div className="text-slate-500 py-4 text-center border-2 border-dashed border-slate-700/50 rounded-xl">
                  No expense records found.
                </div>
              )}
              {expenses.map((expense) => {
                const percent = TOTAL_SPENT > 0 ? (expense.amount / TOTAL_SPENT) * 100 : 0;
                
                return (
                <div key={expense.category} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: expense.color }}></div>
                      <span className="text-slate-200 font-semibold group-hover:text-white transition-colors">
                        {expense.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-white">
                        {formatCurrency(expense.amount)}
                      </span>
                      <span className="text-slate-500 text-sm ml-1">({percent.toFixed(1)}%)</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 relative"
                      style={{ width: `${percent}%`, backgroundColor: expense.color }}
                    />
                  </div>
                </div>
              )})}
            </div>
          </Card>

          {/* Quick Insights */}
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Top Spending Trips</h3>
              <div className="space-y-3">
                {topTrips.length === 0 && (
                  <div className="text-slate-500 py-4 text-center border-2 border-dashed border-slate-700/50 rounded-xl">
                    No trips with expenses found.
                  </div>
                )}
                {topTrips.map((item, idx) => (
                  <div
                    key={item.trip}
                    className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/60 transition-colors border border-slate-700/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        #{idx + 1}
                      </div>
                      <span className="text-slate-200 font-medium">{item.trip}</span>
                    </div>
                    <span className="font-bold text-teal-400">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </Card>

            {trips.length > 0 && (
              <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                <h3 className="text-lg font-bold text-white mb-2">Smart Insight</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  You have planned <span className="text-indigo-400 font-bold">{trips.length} trips</span> with a combined budget of <span className="text-teal-400 font-bold">{formatCurrency(TOTAL_BUDGET)}</span>. Start adding your individual expenses to track them here in real-time!
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
