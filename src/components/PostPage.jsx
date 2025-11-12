import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export default function PostPage(){
  const { slug } = useParams()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/posts/${slug}`)
        if (!res.ok) throw new Error('Post not found')
        setPost(await res.json())
      } catch (e) { setError(e.message) }
    }
    run()
  }, [slug])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Nav />
      <div className="max-w-3xl mx-auto px-4 py-10">
        {error && <p className="text-red-600">{error}</p>}
        {!post ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <article className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wide text-blue-600">{post.category || 'General'}</div>
            <h1 className="text-3xl font-bold mt-1">{post.title}</h1>
            {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full rounded-lg mt-4" />}
            {post.excerpt && <p className="text-gray-600 mt-4">{post.excerpt}</p>}
            <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        )}
      </div>
      <Footer />
    </div>
  )
}
