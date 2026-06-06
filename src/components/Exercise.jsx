import { ClipboardList } from 'lucide-react'

export default function Exercise({ title, children }) {
  return (
    <div className="my-6 border-2 border-namibia-green rounded-lg overflow-hidden">
      <div className="bg-namibia-green text-white px-4 py-2 flex items-center gap-2">
        <ClipboardList className="h-5 w-5" />
        <span className="font-semibold">{title || 'Practical Exercise'}</span>
      </div>
      <div className="p-4 bg-green-50">
        {children}
      </div>
    </div>
  )
}