import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Nav({ onSearch }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-tight">
          VSK Blog Modern
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="/" className="hover:text-gray-900">Home</a>
          <a href="#latest" className="hover:text-gray-900">Latest</a>
          <a href="/admin" className="hover:text-gray-900">Admin</a>
        </nav>
        <form onSubmit={submit} className="hidden md:flex items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-64 px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">Search</button>
        </form>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4 space-y-3">
          <a href="/" className="block">Home</a>
          <a href="#latest" className="block">Latest</a>
          <a href="/admin" className="block">Admin</a>
          <form onSubmit={submit} className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-3 py-2 bg-blue-600 text-white rounded-md">Go</button>
          </form>
        </div>
      )}
    </header>
  )
}
