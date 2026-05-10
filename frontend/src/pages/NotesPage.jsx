import { useState } from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/dashboard/Card'
import { Plus, Trash2, Clock } from 'lucide-react'

export default function NotesPage() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Tokyo Restaurant Recommendations',
      content: 'Must try: Sukiyabashi Jiro, Nabezo, Gonpachi',
      date: 'May 15, 2026',
      category: 'Tokyo Adventure',
    },
    {
      id: 2,
      title: 'Paris Museums to Visit',
      content: 'Louvre, Musée d\'Orsay, Centre Pompidou',
      date: 'May 10, 2026',
      category: 'Paris Getaway',
    },
    {
      id: 3,
      title: 'Bali Beach Spots',
      content: 'Uluwatu, Seminyak, Kuta beaches are great for sunset',
      date: 'May 8, 2026',
      category: 'Bali Retreat',
    },
  ])

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <DashboardLayout title="Notes">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Travel Notes</h2>
          <p className="text-slate-400">
            Keep important travel information organized
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Note
        </button>
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="flex flex-col hover:border-teal-500/50 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="inline-block px-2 py-1 bg-teal-500/10 text-teal-400 text-xs font-semibold rounded border border-teal-500/20 mb-2">
                  {note.category}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2">
                  {note.title}
                </h3>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-700 rounded transition-all text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="flex-1 text-slate-400 text-sm mb-4 line-clamp-3">
              {note.content}
            </p>

            <div className="flex items-center gap-1 text-slate-500 text-xs pt-4 border-t border-slate-700">
              <Clock className="w-3 h-3" />
              {note.date}
            </div>
          </Card>
        ))}

        {/* Add new note card */}
        <Card className="flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:border-teal-500/50 border-dashed">
          <Plus className="w-8 h-8 text-slate-400 mb-2" />
          <p className="text-slate-400 font-medium text-center">Create New Note</p>
          <p className="text-xs text-slate-500 text-center mt-1">
            Add important travel information
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}
