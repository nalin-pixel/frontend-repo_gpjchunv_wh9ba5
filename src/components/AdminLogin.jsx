import { useState } from 'react'

export default function AdminLogin({ onAuthed }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()
      if (data.token === 'ok') onAuthed?.()
      else throw new Error('Login failed')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full px-3 py-2 border rounded-md" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border rounded-md" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 rounded-md">{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
    </div>
  )
}
