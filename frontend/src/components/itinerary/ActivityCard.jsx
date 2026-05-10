import { CheckCircle2, Circle, Clock, DollarSign, MapPin, Utensils, Train, Home, Activity as ActivityIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

const categoryIcons = {
  Sightseeing: MapPin,
  Food: Utensils,
  Transport: Train,
  Accommodation: Home,
  Activity: ActivityIcon
}

const categoryColors = {
  Sightseeing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Food: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Transport: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Accommodation: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Activity: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
}

export default function ActivityCard({ activity, onToggle }) {
  const Icon = categoryIcons[activity.category] || ActivityIcon
  const colorClass = categoryColors[activity.category] || categoryColors.Activity

  return (
    <div className={cn(
      "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
      activity.completed 
        ? "bg-slate-800/20 border-slate-700/30 opacity-60" 
        : "bg-slate-800 border-slate-700 hover:border-slate-600 hover:shadow-lg hover:shadow-black/20"
    )}>
      <button 
        onClick={() => onToggle(activity.id)} 
        className="shrink-0 text-slate-400 hover:text-teal-400 transition-colors focus:outline-none"
      >
        {activity.completed ? (
          <CheckCircle2 className="w-6 h-6 text-teal-500" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className={cn("text-base font-semibold transition-colors", activity.completed ? "text-slate-400 line-through" : "text-white")}>
              {activity.title}
            </h4>
            <div className="flex items-center gap-4 mt-1.5 text-xs font-medium">
              <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border", colorClass)}>
                <Icon className="w-3 h-3" />
                {activity.category}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {activity.time}
              </span>
            </div>
          </div>
          
          <div className="text-right shrink-0">
            <span className="flex items-center text-slate-300 font-semibold bg-slate-900/50 px-2 py-1 rounded-lg">
              <DollarSign className="w-3.5 h-3.5 text-teal-400 mr-0.5" />
              {activity.cost > 0 ? activity.cost.toFixed(2) : 'Free'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
