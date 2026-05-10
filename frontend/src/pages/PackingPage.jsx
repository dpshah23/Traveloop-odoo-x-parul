import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/dashboard/Card'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Switch from '../components/ui/Switch'
import Button from '../components/ui/Button'
import { Plus, CheckCircle, Circle, Trash2, Loader2, Package, AlertCircle, ChevronDown } from 'lucide-react'
import apiClient from '../api/client'
import { toast } from 'react-hot-toast'

const PACKING_CATEGORIES = [
  { value: 'CLOTHING', label: 'Clothing' },
  { value: 'DOCUMENTS', label: 'Documents' },
  { value: 'ELECTRONICS', label: 'Electronics' },
  { value: 'HEALTH', label: 'Health & Toiletries' },
  { value: 'OTHER', label: 'Other' },
]

const EMPTY_FORM = {
  name: '',
  category: 'OTHER',
  quantity: 1,
  notes: '',
  isEssential: false,
}

export default function PackingPage() {
  const [trips, setTrips] = useState([])
  const [items, setItems] = useState([])
  const [selectedTripId, setSelectedTripId] = useState('')
  const [loadingTrips, setLoadingTrips] = useState(true)
  const [loadingItems, setLoadingItems] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const selectedTrip = useMemo(
    () => trips.find((trip) => trip.id === selectedTripId) || null,
    [selectedTripId, trips],
  )

  const packedCount = items.filter((item) => item.is_packed).length
  const totalCount = items.length
  const packedPercentage = totalCount ? Math.round((packedCount / totalCount) * 100) : 0

  const groupedItems = useMemo(() => {
    return PACKING_CATEGORIES.map((category) => ({
      ...category,
      items: items.filter((item) => item.category === category.value),
    })).filter((group) => group.items.length > 0)
  }, [items])

  useEffect(() => {
    const fetchTrips = async () => {
      setLoadingTrips(true)
      try {
        const response = await apiClient.get('/api/trips/')
        const nextTrips = Array.isArray(response.data) ? response.data : (response.data?.results || [])
        setTrips(nextTrips)
        setSelectedTripId((current) => current || nextTrips[0]?.id || '')
      } catch (error) {
        console.error('Failed to fetch trips', error)
        toast.error('Failed to load trips.')
      } finally {
        setLoadingTrips(false)
      }
    }

    fetchTrips()
  }, [])

  useEffect(() => {
    const fetchPackingItems = async () => {
      if (!selectedTripId) {
        setItems([])
        return
      }

      setLoadingItems(true)
      try {
        const response = await apiClient.get('/api/packing/', {
          params: { trip: selectedTripId },
        })
        const nextItems = Array.isArray(response.data) ? response.data : (response.data?.results || [])
        setItems(nextItems)
      } catch (error) {
        console.error('Failed to fetch packing items', error)
        toast.error('Failed to load packing items.')
      } finally {
        setLoadingItems(false)
      }
    }

    fetchPackingItems()
  }, [selectedTripId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: name === 'quantity' ? Number(value) : value,
    }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: null }))
    }
  }

  const validate = () => {
    const nextErrors = {}
    if (!selectedTripId) nextErrors.trip = 'Create or choose a trip first.'
    if (!formData.name.trim()) nextErrors.name = 'Item name is required.'
    if (formData.quantity < 1) nextErrors.quantity = 'Quantity must be at least 1.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const openModal = () => {
    setFormData(EMPTY_FORM)
    setErrors({})
    setIsModalOpen(true)
  }

  const closeModal = () => {
    if (isSubmitting) return
    setIsModalOpen(false)
  }

  const refreshItems = async () => {
    if (!selectedTripId) return
    const response = await apiClient.get('/api/packing/', { params: { trip: selectedTripId } })
    const nextItems = Array.isArray(response.data) ? response.data : (response.data?.results || [])
    setItems(nextItems)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      await apiClient.post('/api/packing/', {
        trip: selectedTripId,
        name: formData.name,
        category: formData.category,
        quantity: formData.quantity,
        notes: formData.notes,
        is_essential: formData.isEssential,
        is_packed: false,
        position: items.length,
      })
      toast.success('Packing item added.')
      setIsModalOpen(false)
      await refreshItems()
    } catch (error) {
      console.error(error)
      toast.error('Failed to add packing item.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePacked = async (item) => {
    try {
      await apiClient.patch(`/api/packing/${item.id}/`, {
        is_packed: !item.is_packed,
      })
      setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, is_packed: !entry.is_packed } : entry)))
    } catch (error) {
      console.error(error)
      toast.error('Failed to update item.')
    }
  }

  const deleteItem = async (itemId) => {
    try {
      await apiClient.delete(`/api/packing/${itemId}/`)
      setItems((current) => current.filter((entry) => entry.id !== itemId))
      toast.success('Packing item removed.')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete item.')
    }
  }

  return (
    <DashboardLayout title="Packing">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Packing Checklist</h2>
          <p className="text-slate-400">Keep each trip organized with a live packing list.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="block min-w-[240px] space-y-2">
            <span className="text-sm font-medium text-slate-200">Trip</span>
            <div className="relative">
              <select
                value={selectedTripId}
                onChange={(event) => setSelectedTripId(event.target.value)}
                className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 pr-10 text-slate-100 outline-none transition focus:border-teal-300/60 focus:ring-4 focus:ring-teal-400/10"
              >
                <option value="">{loadingTrips ? 'Loading trips...' : 'Select a trip'}</option>
                {trips.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </label>

          <Button type="button" onClick={openModal} disabled={!selectedTripId || loadingTrips} className="gap-2 shadow-lg shadow-teal-500/20">
            <Plus className="h-5 w-5" />
            Add Item
          </Button>
        </div>
      </div>

      {!selectedTripId && !loadingTrips ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-slate-500" />
          <h3 className="mb-2 text-lg font-semibold text-white">Choose a trip to manage packing</h3>
          <p className="mb-6 text-slate-400">You need a trip before you can add packing items.</p>
          <Link to="/trips/new" className="inline-flex rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300">
            Create Trip
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <p className="mb-2 text-sm text-slate-400">Packing Progress</p>
              <p className="mb-3 text-3xl font-bold text-white">{packedPercentage}%</p>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-300" style={{ width: `${packedPercentage}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {packedCount} of {totalCount} items packed
              </p>
            </Card>

            <Card>
              <p className="mb-2 text-sm text-slate-400">Items Packed</p>
              <p className="text-3xl font-bold text-teal-400">{packedCount}</p>
            </Card>

            <Card>
              <p className="mb-2 text-sm text-slate-400">Still Needed</p>
              <p className="text-3xl font-bold text-yellow-400">{totalCount - packedCount}</p>
            </Card>
          </div>

          {loadingItems ? (
            <Card className="flex items-center gap-3 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin text-teal-400" />
              Loading packing items...
            </Card>
          ) : items.length === 0 ? (
            <Card className="border-dashed border-slate-700/70 text-center">
              <AlertCircle className="mx-auto mb-4 h-10 w-10 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">No packing items yet</h3>
              <p className="mb-6 text-slate-400">Add the first item for {selectedTrip?.title || 'this trip'}.</p>
              <Button type="button" onClick={openModal} className="gap-2">
                <Plus className="h-5 w-5" />
                Add First Item
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {groupedItems.map((group) => (
                <Card key={group.value}>
                  <h3 className="mb-4 text-lg font-bold text-white">{group.label}</h3>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-start gap-3 rounded-2xl bg-slate-700/30 p-3 transition-colors hover:bg-slate-700/50"
                      >
                        <button type="button" onClick={() => togglePacked(item)} className="mt-0.5 flex-shrink-0 transition-colors">
                          {item.is_packed ? (
                            <CheckCircle className="h-5 w-5 text-teal-400" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-600 transition-colors hover:text-slate-500" />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`font-medium ${item.is_packed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                              {item.name}
                            </span>
                            <span className="rounded-full border border-white/10 bg-slate-900/60 px-2 py-0.5 text-xs text-slate-400">
                              Qty {item.quantity}
                            </span>
                            {item.is_essential ? (
                              <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-300">
                                Essential
                              </span>
                            ) : null}
                          </div>
                          {item.notes ? <p className="mt-1 text-sm text-slate-400">{item.notes}</p> : null}
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteItem(item.id)}
                          className="flex-shrink-0 text-red-400 opacity-0 transition-all group-hover:opacity-100 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/40">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Add Packing Item</h3>
                <p className="text-sm text-slate-400">Add something you need for {selectedTrip?.title || 'this trip'}.</p>
              </div>
              <button type="button" onClick={closeModal} className="text-slate-400 transition hover:text-white">
                <AlertCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="Item name" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Passport holder" />
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">Category</span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-teal-300/60 focus:ring-4 focus:ring-teal-400/10"
                  >
                    {PACKING_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  type="number"
                  min="1"
                  label="Quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  error={errors.quantity}
                />
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                  <Switch
                    checked={formData.isEssential}
                    onChange={(value) => setFormData((current) => ({ ...current, isEssential: value }))}
                    label="Mark as essential"
                    description="Highlight items you absolutely cannot forget."
                  />
                </div>
              </div>

              <Textarea
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any details or reminders for this item?"
                rows={4}
              />

              {errors.trip ? <p className="text-sm text-rose-300">{errors.trip}</p> : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button type="button" variant="secondary" onClick={closeModal} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                  {isSubmitting ? 'Saving...' : 'Add Item'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </DashboardLayout>
  )
}