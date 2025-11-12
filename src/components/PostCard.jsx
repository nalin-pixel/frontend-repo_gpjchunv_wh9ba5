export default function PostCard({ post }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  return (
    <a href={`/post/${post.slug}`} className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} className="h-44 w-full object-cover group-hover:scale-[1.02] transition" />
      )}
      <div className="p-4 space-y-2">
        <div className="text-xs uppercase tracking-wide text-blue-600">{post.category || 'General'}</div>
        <h3 className="text-lg font-semibold group-hover:text-blue-700">{post.title}</h3>
        {post.excerpt && <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>}
        <div className="text-xs text-gray-400">{post.author || 'Admin'}</div>
      </div>
    </a>
  )
}
