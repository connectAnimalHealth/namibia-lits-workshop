import { Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react'

const variants = {
  info: {
    bg: 'bg-woah-blue/5',
    border: 'border-woah-blue/30',
    titleColor: 'text-woah-blue',
    icon: Info,
  },
  warning: {
    bg: 'bg-woah-orange-light',
    border: 'border-woah-orange/30',
    titleColor: 'text-woah-orange',
    icon: AlertTriangle,
  },
  success: {
    bg: 'bg-woah-green/5',
    border: 'border-woah-green/30',
    titleColor: 'text-woah-green',
    icon: CheckCircle,
  },
  tip: {
    bg: 'bg-woah-gold-lighter/30',
    border: 'border-woah-gold/30',
    titleColor: 'text-woah-gold-dark',
    icon: Lightbulb,
  }
}

export default function Callout({ type = 'info', title, children }) {
  const variant = variants[type]
  const Icon = variant.icon

  return (
    <div className={`my-4 rounded-lg border p-4 ${variant.bg} ${variant.border}`}>
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${variant.titleColor}`} />
        <div>
          {title && <p className={`font-semibold mb-1 ${variant.titleColor}`}>{title}</p>}
          <div className="text-sm text-woah-charcoal">{children}</div>
        </div>
      </div>
    </div>
  )
}
