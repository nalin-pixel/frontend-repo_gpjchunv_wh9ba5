export default function Footer(){
  return (
    <footer className="mt-16 border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} VSK Blog Modern. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-900">Privacy</a>
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="/admin" className="hover:text-gray-900">Admin</a>
        </div>
      </div>
    </footer>
  )
}
