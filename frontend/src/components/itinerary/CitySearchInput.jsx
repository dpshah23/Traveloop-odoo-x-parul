import { useState, useRef, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import Input from '../ui/Input'

export default function CitySearchInput({ value, onChange, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  const suggestions = ['Paris, France', 'Tokyo, Japan', 'New York, USA', 'Rome, Italy', 'London, UK', 'Kyoto, Japan', 'Barcelona, Spain', 'Bali, Indonesia'].filter((city) => city.toLowerCase().includes(value.toLowerCase()))

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        label="City"
        placeholder="Search a city..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && value && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
          {suggestions.map((city, idx) => (
            <button
              key={idx}
              className="w-full text-left px-4 py-3 text-slate-200 hover:bg-slate-700 flex items-center gap-3 transition-colors border-b border-slate-700/50 last:border-0"
              onMouseDown={() => {
                onSelect(city)
                setIsOpen(false)
              }}
              type="button"
            >
              <MapPin className="w-4 h-4 text-slate-400" />
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
