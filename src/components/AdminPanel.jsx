import { useEffect, useState } from 'react'

export default function AdminPanel() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', cover_image: '', category: '', tags: '' })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      published: true
    }
    try {
      const res = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to publish')
      setMessage('Post published successfully!')
      setForm({ title: '', slug: '', excerpt: '', content: '', cover_image: '', category: '', tags: '' })
    } catch (e) {
      setMessage(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
      {message && <div className="mb-3 text-sm" dangerouslySetInnerHTML={{ __html: message }} />}
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border rounded-md px-3 py-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} required />
        <input className="border rounded-md px-3 py-2" placeholder="Slug" value={form.slug} onChange={(e)=>setForm({...form, slug: e.target.value})} required />
        <input className="md:col-span-2 border rounded-md px-3 py-2" placeholder="Excerpt" value={form.excerpt} onChange={(e)=>setForm({...form, excerpt: e.target.value})} />
        <input className="md:col-span-2 border rounded-md px-3 py-2" placeholder="Cover image URL" value={form.cover_image} onChange={(e)=>setForm({...form, cover_image: e.target.value})} />
        <input className="border rounded-md px-3 py-2" placeholder="Category (slug)" value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} />
        <input className="border rounded-md px-3 py-2" placeholder="Tags (comma separated)" value={form.tags} onChange={(e)=>setForm({...form, tags: e.target.value})} />
        <textarea className="md:col-span-2 border rounded-md px-3 py-2 h-40" placeholder="Content (Markdown or HTML)" value={form.content} onChange={(e)=>setForm({...form, content: e.target.value})} required />
        <div className="md:col-span-2 flex justify-end">
          <button disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60">{submitting ? 'Publishing...' : 'Publish'}</button>
        </div>
      </form>
    </div>
  )
}
