import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import PostCard from './components/PostCard'
import Footer from './components/Footer'
import Hero from './components/Hero'
import SectionHeading from './components/SectionHeading'
import CategoriesBar from './components/CategoriesBar'
import PostSkeleton from './components/PostSkeleton'

function Home() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)

  const load = async (q = '', c = category) => {
    setLoading(true)
    setError('')
    try {
      const url = new URL(`${baseUrl}/api/posts`)
      if (q) url.searchParams.set('q', q)
      if (c) url.searchParams.set('category', c)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (q) => { setQuery(q); load(q, category) }
  const handleCategory = (c) => { setCategory(c); load(query, c) }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Nav onSearch={handleSearch} />
      <Hero onSearch={handleSearch} query={query} setQuery={setQuery} />

      <section className="max-w-6xl mx-auto px-4 -mt-6 md:-mt-10">
        <div className="bg-white/80 border border-gray-200 rounded-xl p-4 backdrop-blur shadow-sm">
          <CategoriesBar active={category} onChange={handleCategory} />
        </div>
      </section>

      <section id="latest" className="max-w-6xl mx-auto px-4 pb-16 mt-8">
        <SectionHeading
          subtitle="Fresh and verified"
          title="Latest Posts"
          action={<a href="#" onClick={(e)=>{e.preventDefault(); setQuery(''); setCategory(null); load('', null)}} className="text-sm text-blue-700 hover:underline">View all</a>}
        />

        {error && <p className="text-red-600">{error}</p>}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">No posts yet. Use the Admin panel to publish your first post.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(p => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Home
