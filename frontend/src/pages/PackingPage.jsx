import { useState } from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/dashboard/Card'
import { Plus, CheckCircle, Circle, Trash2 } from 'lucide-react'

export default function PackingPage() {
  const [items, setItems] = useState([
    { id: 1, category: 'Clothing', item: 'T-shirts', packed: true },
    { id: 2, category: 'Clothing', item: 'Jeans', packed: true },
    { id: 3, category: 'Accessories', item: 'Passport', packed: false },
    { id: 4, category: 'Electronics', item: 'Phone charger', packed: true },
    { id: 5, category: 'Documents', item: 'Travel insurance', packed: false },
    { id: 6, category: 'Toiletries', item: 'Toothbrush', packed: true },
  ])

  const categories = ['Clothing', 'Accessories', 'Electronics', 'Documents', 'Toiletries']
  const packedCount = items.filter((i) => i.packed).length
  const totalCount = items.length
  const packedPercentage = Math.round((packedCount / totalCount) * 100)

  const togglePacked = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)))
  }

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <DashboardLayout title="Packing">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Packing Checklist</h2>
          <p className="text-slate-400">Stay organized for your trips</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Progress */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-slate-400 text-sm mb-2">Packing Progress</p>
          <p className="text-3xl font-bold text-white mb-3">{packedPercentage}%</p>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-400 to-teal-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${packedPercentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {packedCount} of {totalCount} items packed
          </p>
        </Card>

        <Card>
          <p className="text-slate-400 text-sm mb-2">Items Packed</p>
          <p className="text-3xl font-bold text-teal-400">{packedCount}</p>
        </Card>

        <Card>
          <p className="text-slate-400 text-sm mb-2">Still needed</p>
          <p className="text-3xl font-bold text-yellow-400">{totalCount - packedCount}</p>
        </Card>
      </div>

      {/* Checklist by category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryItems = items.filter((i) => i.category === category)
          if (categoryItems.length === 0) return null

          return (
            <Card key={category}>
              <h3 className="text-lg font-bold text-white mb-4">{category}</h3>
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <button
                      onClick={() => togglePacked(item.id)}
                      className="flex-shrink-0 transition-colors"
                    >
                      {item.packed ? (
                        <CheckCircle className="w-5 h-5 text-teal-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-500" />
                      )}
                    </button>
                    <span
                      className={`flex-1 ${
                        item.packed
                          ? 'text-slate-500 line-through'
                          : 'text-slate-300'
                      }`}
                    >
                      {item.item}
                    </span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
