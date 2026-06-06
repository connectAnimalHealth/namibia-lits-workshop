import { Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react'

const variants = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: Info,
    iconColor: 'text-blue-500'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500'
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-500'
  },
  tip: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: Lightbulb,
    iconColor: 'text-purple-500'
  }
}

export default function Callout({ type = 'info', title, children }) {
  const variant = variants[type]
  const Icon = variant.icon

  return (
    <div className={`my-4 p-4 rounded-lg border ${variant.bg} ${variant.border}`}>
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${variant.iconColor}`} />
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  )
}