import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, Code } from 'lucide-react'
import { useState } from 'react'

export default function CodeBlock({ code, language = 'r', title }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-woah-gray-light shadow-sm">
      {title && (
        <div className="bg-gray-800 text-woah-gold-light px-4 py-2.5 text-sm flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Code className="h-4 w-4 text-woah-orange" />
            {title}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-white/10 rounded transition-colors"
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <Check className="h-4 w-4 text-woah-green" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
