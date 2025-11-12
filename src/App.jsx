import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import PostCard from './components/PostCard'
import Footer from './components/Footer'

function Home() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  const load = async (q = '') => {
    setLoading(true)
    setError('')
    try {
      const url = new URL(`${baseUrl}/api/posts`)
      if (q) url.searchParams.set('q', q)
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Failed to load posts')
      const data = await res.json()
      setPosts(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Nav onSearch={(q)=>{ setQuery(q); load(q) }} />

      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">Modern University Blog</span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              News, Notices and Updates in a clean, fast interface
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Explore official announcements, exam notices, circulars and events with an elegant, mobile-first experience.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-600 mb-3">Quick search</div>
            <form onSubmit={(e)=>{e.preventDefault(); load(query)}} className="flex gap-2">
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search notices, results, circulars..." className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Search</button>
            </form>
            <p className="mt-3 text-xs text-gray-500">Tip: try keywords like "exam", "result", "recruitment"</p>
          </div>
        </div>
      </section>

      <section id="latest" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Latest Posts</h2>
          <a href="#" onClick={(e)=>{e.preventDefault(); load('')}} className="text-sm text-blue-700 hover:underline">View all</a>
        </div>
        {loading && <p className="text-gray-500">Loading posts...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && posts.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">No posts yet. Use the Admin panel to publish your first post.</div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
