export default function KeyConcept({ title, children }) {
  return (
    <div className="my-6 bg-gradient-to-r from-woah-gold-lighter/50 to-woah-cream border-l-4 border-woah-gold rounded-r-lg p-5 shadow-sm">
      <h4 className="font-bold text-woah-charcoal text-lg mb-2">{title}</h4>
      <div className="text-woah-charcoal/80 leading-relaxed">{children}</div>
    </div>
  )
}
