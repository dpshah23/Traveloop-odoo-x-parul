import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card, GridContainer, StatCard } from '../components/dashboard/Card'
import { Wallet, TrendingDown, TrendingUp } from 'lucide-react'

export default function BudgetPage() {
  const budgetStats = [
    {
      icon: Wallet,
      label: 'Total Budget',
      value: '$8,500',
      change: 12,
      positive: false,
    },
    {
      icon: TrendingDown,
      label: 'Spent',
      value: '$4,250',
      change: 8,
      positive: false,
    },
    {
      icon: TrendingUp,
      label: 'Remaining',
      value: '$4,250',
      change: 15,
      positive: true,
    },
    {
      icon: Wallet,
      label: 'Avg per Trip',
      value: '$1,708',
      change: 5,
      positive: false,
    },
  ]

  const expenses = [
    { category: 'Accommodation', amount: '$2,100', percentage: 49 },
    { category: 'Transportation', amount: '$1,200', percentage: 28 },
    { category: 'Food & Dining', amount: '$650', percentage: 15 },
    { category: 'Activities', amount: '$300', percentage: 8 },
  ]

  return (
    <DashboardLayout title="Budget">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Budget Tracking</h2>
        <p className="text-slate-400">Monitor your spending across all trips</p>
      </div>

      {/* Stats grid */}
      <GridContainer columns={4}>
        {budgetStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </GridContainer>

      {/* Expense breakdown */}
      <div className="mt-12">
        <Card>
          <h3 className="text-lg font-bold text-white mb-6">Expense Breakdown</h3>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">
                    {expense.category}
                  </span>
                  <span className="text-teal-400 font-semibold">
                    {expense.amount}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-teal-600 h-full rounded-full"
                    style={{ width: `${expense.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 mt-1">
                  {expense.percentage}% of total
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly comparison */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-white mb-4">Top Spending</h3>
          <div className="space-y-3">
            {[
              { trip: 'Tokyo Adventure', amount: '$3,200' },
              { trip: 'Paris Getaway', amount: '$2,500' },
              { trip: 'Bali Retreat', amount: '$1,800' },
            ].map((item) => (
              <div
                key={item.trip}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
              >
                <span className="text-slate-300">{item.trip}</span>
                <span className="font-semibold text-teal-400">{item.amount}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-white mb-4">Budget Goals</h3>
          <div className="space-y-3">
            {[
              { goal: 'Keep meals under $500', current: '$650', status: 'Over' },
              { goal: 'Transportation budget', current: '$1,200', status: 'On track' },
              {
                goal: 'Total trip budget',
                current: '$4,250',
                status: 'On track',
              },
            ].map((item) => (
              <div
                key={item.goal}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
              >
                <div>
                  <p className="text-slate-300 text-sm">{item.goal}</p>
                  <p className="text-xs text-slate-500">{item.current}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    item.status === 'On track'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
