import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import apiClient from '../../api/client'
import { toast } from 'react-hot-toast'

export default function AddActivityModal({ isOpen, onClose, onAdd, stop }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'SIGHTSEEING',
    date: stop?.start_date || '',
    time: '',
    cost: '',
  })

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await apiClient.post(`/api/stops/${stop.id}/activities/`, {
        trip_stop: stop.id,
        title: formData.title,
        category: formData.category,
        date: formData.date,
        start_time: formData.time || null,
        cost: parseFloat(formData.cost) || 0,
        currency: 'INR'
      })
      
      onAdd({
        ...res.data,
        time: res.data.start_time,
        cost: parseFloat(res.data.cost),
        completed: res.data.is_completed
      })
      
      setFormData({ title: '', category: 'SIGHTSEEING', date: stop?.start_date || '', time: '', cost: '' })
      onClose()
      toast.success('Activity added!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to add activity. Check dates.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { id: 'SIGHTSEEING', label: 'Sightseeing' },
    { id: 'FOOD', label: 'Food & Dining' },
    { id: 'TRANSPORT', label: 'Transport' },
    { id: 'ACCOMMODATION', label: 'Accommodation' },
    { id: 'SHOPPING', label: 'Shopping' },
    { id: 'OTHER', label: 'Other' }
  ]

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
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </label>

          <Input 
            label="Date" 
            type="date" 
            required
            min={stop?.start_date}
            max={stop?.end_date}
            value={formData.date}
            onChange={e => setFormData(p => ({...p, date: e.target.value}))}
            className="[&::-webkit-calendar-picker-indicator]:filter-invert"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Time (Optional)" 
              type="time" 
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
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add Activity'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
