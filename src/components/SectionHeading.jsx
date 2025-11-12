export default function SectionHeading({ title, subtitle, action }){
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="text-xs font-semibold tracking-wider text-blue-700/80">{subtitle}</div>
        <h2 className="text-xl md:text-2xl font-semibold mt-1">{title}</h2>
      </div>
      {action}
    </div>
  )
}
