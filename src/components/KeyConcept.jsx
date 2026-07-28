export default function KeyConcept({ title, children }) {
  return (
    <div className="my-6 bg-orange-50 border-l-4 border-woah-orange rounded-r-lg p-5">
      <h4 className="font-bold text-woah-charcoal text-lg mb-2">{title}</h4>
      <div className="text-woah-charcoal/80 leading-relaxed">{children}</div>
    </div>
  )
}
