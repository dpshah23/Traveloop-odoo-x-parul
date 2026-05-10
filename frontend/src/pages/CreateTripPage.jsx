import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Switch from '../components/ui/Switch'
import Button from '../components/ui/Button'
import { Map, Calendar, Image as ImageIcon, IndianRupee, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { Card } from '../components/dashboard/Card'

export default function CreateTripPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    coverImage: '',
    isPublic: false
  })
  
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.endDate) newErrors.endDate = 'End date is required'
    else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsSubmitting(true)
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/trips')
    }, 1500)
  }

  return (
    <DashboardLayout title="Create Trip">
      <div className="max-w-4xl mx-auto pb-12">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-teal-500/10 rounded-2xl mb-4 border border-teal-500/20 shadow-inner">
            <Sparkles className="w-6 h-6 text-teal-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Plan a New Adventure</h1>
          <p className="text-slate-400 text-lg">Set up the details for your next journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="p-8 border-slate-700/60 bg-slate-800/40 backdrop-blur-sm shadow-2xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Map className="w-5 h-5 text-teal-400" />
                      Basic Details
                    </h3>
                    <div className="space-y-5">
                      <Input
                        label="Trip Title"
                        name="title"
                        placeholder="e.g. Summer in Kyoto"
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                      />
                      
                      <Textarea
                        label="Description (Optional)"
                        name="description"
                        placeholder="What is this trip about?"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                   <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-teal-400" />
                      Timing & Budget
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="date"
                        label="Start Date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        error={errors.startDate}
                        className="[&::-webkit-calendar-picker-indicator]:filter-invert"
                      />
                      <Input
                        type="date"
                        label="End Date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        error={errors.endDate}
                        className="[&::-webkit-calendar-picker-indicator]:filter-invert"
                      />
                    </div>

                    <Input
                      type="number"
                      label="Budget (Optional)"
                      name="budget"
                      placeholder="e.g. 200000"
                      value={formData.budget}
                      onChange={handleChange}
                    />
                </div>
             </div>

             <hr className="border-slate-700/50 my-8" />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                   <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-teal-400" />
                      Media & Privacy
                    </h3>
                   <Input
                      type="url"
                      label="Cover Image URL (Optional)"
                      name="coverImage"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.coverImage}
                      onChange={handleChange}
                    />

                    <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-700/50 mt-4 hover:border-slate-600 transition-colors">
                       <Switch
                         checked={formData.isPublic}
                         onChange={(val) => setFormData(prev => ({ ...prev, isPublic: val }))}
                         label="Make this trip public"
                         description="Allow others to view your itinerary and get inspired by your adventure."
                       />
                    </div>
                </div>
                
                {/* Live Preview */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-200 mb-2">Card Preview</span>
                  <div className="flex-1 rounded-2xl border border-slate-700/50 overflow-hidden bg-slate-900/30 relative group min-h-[200px]">
                     {formData.coverImage ? (
                        <img 
                          src={formData.coverImage} 
                          alt="Cover preview" 
                          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 group-hover:scale-105" 
                          onError={(e) => { e.target.style.display='none' }} 
                        />
                     ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                        <h4 className="text-2xl font-bold text-white mb-2">{formData.title || 'Your Trip Title'}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                           <span className="flex items-center gap-1 font-medium bg-slate-900/50 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/5">
                             <Calendar className="w-4 h-4 text-teal-400"/> 
                             {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Start'}
                           </span>
                           <span className="flex items-center gap-1 font-medium bg-slate-900/50 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/5">
                             <IndianRupee className="w-4 h-4 text-teal-400"/> 
                             {formData.budget || 'Budget'}
                           </span>
                        </div>
                     </div>
                  </div>
                </div>
             </div>

             {Object.keys(errors).length > 0 && (
               <div className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-400 animate-in fade-in slide-in-from-bottom-2">
                 <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                 <div>
                   <p className="font-medium">Please fix the following errors:</p>
                   <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                     {Object.values(errors).map((err, i) => (
                       <li key={i}>{err}</li>
                     ))}
                   </ul>
                 </div>
               </div>
             )}

             <div className="mt-10 flex items-center justify-end gap-4 border-t border-slate-700/50 pt-6">
                <Button type="button" variant="secondary" onClick={() => navigate(-1)} className="hover:bg-slate-700">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="min-w-[140px] shadow-lg shadow-teal-500/20">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Create Trip'
                  )}
                </Button>
             </div>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
