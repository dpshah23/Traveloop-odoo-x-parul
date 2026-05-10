import { useState } from 'react'
import { Calendar, ChevronDown, ChevronUp, MapPin, Plus, GripVertical } from 'lucide-react'
import ActivityCard from './ActivityCard'
import AddActivityModal from './AddActivityModal'

export default function StopCard({ stop, onUpdateStop, index }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalBudget = stop.activities.reduce((sum, act) => sum + act.cost, 0)

  const handleAddActivity = (activity) => {
    onUpdateStop(stop.id, {
      ...stop,
      activities: [...stop.activities, activity]
    })
  }

  const handleToggleActivity = (activityId) => {
    onUpdateStop(stop.id, {
      ...stop,
      activities: stop.activities.map(act => 
        act.id === activityId ? { ...act, completed: !act.completed } : act
      )
    })
  }

  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-800/80 to-slate-900 cursor-pointer select-none border-b border-slate-800"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="cursor-grab text-slate-500 hover:text-slate-300 active:cursor-grabbing p-1" onClick={(e) => e.stopPropagation()}>
            <GripVertical className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-500/10 text-teal-400 font-bold border border-teal-500/20">
            {index + 1}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-400 hidden sm:block" />
              {stop.city}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {stop.startDate} to {stop.endDate}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium text-teal-400">${totalBudget.toFixed(2)} Total</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 rounded-lg text-sm font-medium transition-colors border border-teal-500/20"
          >
            <Plus className="w-4 h-4" />
            Add Activity
          </button>
          <div className="p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="p-5 bg-slate-900/50">
          <div className="sm:hidden mb-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full flex justify-center items-center gap-2 px-3 py-2.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 rounded-lg text-sm font-medium transition-colors border border-teal-500/20"
            >
              <Plus className="w-4 h-4" />
              Add Activity
            </button>
          </div>

          <div className="space-y-3">
            {stop.activities.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-800 rounded-xl">
                No activities planned yet.
              </div>
            ) : (
              // Sort by time
              [...stop.activities].sort((a, b) => a.time.localeCompare(b.time)).map((activity) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  onToggle={handleToggleActivity}
                />
              ))
            )}
          </div>
        </div>
      )}

      <AddActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddActivity} 
      />
    </div>
  )
}
