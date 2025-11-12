import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './App'
import Test from './Test'
import AdminPage from './components/AdminPage'
import PostPage from './components/PostPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/post/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
