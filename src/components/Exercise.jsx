import { ClipboardList, User, Users, Clock } from 'lucide-react'

export default function Exercise({ title, type = 'individual', duration, children }) {
  const TypeIcon = type === 'group' ? Users : User
  const typeLabel = type === 'group' ? 'Group' : type === 'pair' ? 'Pair' : 'Individual'

  return (
    <div className="my-6 border border-woah-orange/30 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-orange-500 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            <span className="font-semibold">{title || 'Practical Exercise'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded">
              <TypeIcon className="h-4 w-4" />
              <span>{typeLabel}</span>
            </div>
            {duration && (
              <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 bg-woah-orange-light/30">
        {children}
      </div>
    </div>
  )
}
