import { useState } from 'react'
import { X } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'

export default function AddActivityModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sightseeing',
    cost: '',
    time: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...formData,
      id: Date.now().toString(),
      cost: parseFloat(formData.cost) || 0,
      completed: false
    })
    setFormData({ title: '', category: 'Sightseeing', cost: '', time: '' })
    onClose()
  }

  const categories = ['Sightseeing', 'Food', 'Transport', 'Accommodation', 'Activity']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white">Add Activity</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <Input 
            label="Activity Title" 
            required 
            value={formData.title}
            onChange={e => setFormData(p => ({...p, title: e.target.value}))}
            placeholder="e.g. Visit Eiffel Tower" 
          />
          
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Category</span>
            <div className="relative">
              <select 
                value={formData.category}
                onChange={e => setFormData(p => ({...p, category: e.target.value}))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-teal-300/60 focus:ring-4 focus:ring-teal-400/10 appearance-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Time" 
              type="time" 
              required
              value={formData.time}
              onChange={e => setFormData(p => ({...p, time: e.target.value}))}
              className="[&::-webkit-calendar-picker-indicator]:filter-invert"
            />
            <Input 
              label="Cost (₹)" 
              type="number" 
              min="0"
              step="0.01"
              value={formData.cost}
              onChange={e => setFormData(p => ({...p, cost: e.target.value}))}
              placeholder="0.00" 
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Activity</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
