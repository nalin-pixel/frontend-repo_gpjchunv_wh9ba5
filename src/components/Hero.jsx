export default function Hero({ onSearch, query, setQuery }){
  const submit = (e) => { e.preventDefault(); onSearch?.(query) }
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200 via-indigo-100 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">Official Updates Hub</span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Stay informed with a uniquely modern university portal
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            Notices, circulars, results, and events—curated into a fast, accessible, mobile‑first experience.
          </p>
        </div>
        <div className="bg-white/90 border border-gray-200 rounded-2xl p-6 shadow-sm backdrop-blur">
          <div className="text-sm text-gray-600 mb-3">Quick search</div>
          <form onSubmit={submit} className="flex gap-2">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search notices, results, circulars..." className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Search</button>
          </form>
          <p className="mt-3 text-xs text-gray-500">Tip: try keywords like "exam", "result", "recruitment"</p>
        </div>
      </div>
    </section>
  )
}
