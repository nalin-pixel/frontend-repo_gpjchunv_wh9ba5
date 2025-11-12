import { useEffect, useState } from 'react'

export default function CategoriesBar({ active, onChange }){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/categories`)
        if (!res.ok) throw new Error('Failed to load categories')
        const data = await res.json()
        setItems(data)
      } catch (e){
        // fail silently, bar is optional
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const chip = (label, value) => (
    <button
      key={value ?? 'all'}
      onClick={() => onChange?.(value || null)}
      className={`px-3 py-1.5 rounded-full text-sm border transition ${
        (active || null) === (value || null)
          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2">
        {chip('All', null)}
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
          ))
        ) : (
          items.map(c => chip(c.name, c.slug))
        )}
      </div>
    </div>
  )
}
