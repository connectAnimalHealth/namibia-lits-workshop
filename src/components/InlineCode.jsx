import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function InlineCode({ children }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className="inline-flex items-center gap-1 group">
      <code className="bg-gray-800/10 text-woah-charcoal px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-woah-orange/10 rounded transition-all"
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-woah-green" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-woah-gray" />
        )}
      </button>
    </span>
  )
}
