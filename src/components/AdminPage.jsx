import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'
import Nav from './Nav'
import Footer from './Footer'

export default function AdminPage(){
  const [authed, setAuthed] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {!authed ? <AdminLogin onAuthed={() => setAuthed(true)} /> : <AdminPanel />}
      </div>
      <Footer />
    </div>
  )
}
