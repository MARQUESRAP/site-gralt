'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatInterfaceProps {
  initialMessage?: string
  className?: string
}

const WELCOME_MESSAGE =
  "Bonjour ! Je suis là pour vous aider à trouver les agents IA qui correspondent à votre business. Décrivez-moi votre activité ou un problème que vous aimeriez résoudre, et je vous orienterai."

export default function ChatInterface({
  initialMessage,
  className = '',
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initialSent = useRef(false)

  const scrollToBottom = () => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsStreaming(true)

    const allMessages = [...messages, userMessage].filter(
      (m) => !(m.role === 'assistant' && m.content === WELCOME_MESSAGE)
    )

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let assistantContent = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break

            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                assistantContent += parsed.text
                setMessages((prev) => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                  }
                  return updated
                })
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'assistant',
          content:
            "Désolé, je rencontre un problème technique. N'hésitez pas à [réserver un audit gratuit](/rendez-vous) pour discuter directement avec Raphaël.",
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }, [messages, isStreaming])

  // Handle initial message (from idea gallery or agent question)
  useEffect(() => {
    if (initialMessage && !initialSent.current) {
      initialSent.current = true
      // Small delay so the UI renders first
      const timer = setTimeout(() => sendMessage(initialMessage), 500)
      return () => clearTimeout(timer)
    }
  }, [initialMessage, sendMessage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  // Render inline markdown (bold, links)
  function renderInline(text: string, keyPrefix: string = '') {
    // Split by bold and links
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)
    return parts.map((part, i) => {
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch) {
        return (
          <a key={`${keyPrefix}-${i}`} href={linkMatch[2]} className="text-accent underline underline-offset-2 hover:text-accent/80">
            {linkMatch[1]}
          </a>
        )
      }
      const boldMatch = part.match(/\*\*([^*]+)\*\*/)
      if (boldMatch) {
        return <strong key={`${keyPrefix}-${i}`}>{boldMatch[1]}</strong>
      }
      return <span key={`${keyPrefix}-${i}`}>{part}</span>
    })
  }

  // Render full markdown content (headings, lists, paragraphs, bold, links)
  function renderContent(content: string) {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Skip empty lines
      if (!line.trim()) { i++; continue }

      // Headings (## or ###)
      const headingMatch = line.match(/^#{1,3}\s+(.+)/)
      if (headingMatch) {
        elements.push(
          <p key={i} className="mt-3 mb-1 font-semibold text-text-primary">
            {renderInline(headingMatch[1], `h-${i}`)}
          </p>
        )
        i++; continue
      }

      // List items (- or *)
      if (/^[-*]\s+/.test(line.trim())) {
        const listItems: { text: string; idx: number }[] = []
        while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
          listItems.push({ text: lines[i].trim().replace(/^[-*]\s+/, ''), idx: i })
          i++
        }
        elements.push(
          <ul key={`ul-${listItems[0].idx}`} className="my-1 ml-1 flex flex-col gap-1">
            {listItems.map((item) => (
              <li key={item.idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                <span>{renderInline(item.text, `li-${item.idx}`)}</span>
              </li>
            ))}
          </ul>
        )
        continue
      }

      // Regular paragraph
      elements.push(
        <p key={i} className="my-1">
          {renderInline(line, `p-${i}`)}
        </p>
      )
      i++
    }

    return elements
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Concierge header */}
      <div className="mb-4 flex items-center gap-3 px-2">
        <div
          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full"
          style={{
            border: '2px solid #00E5CC',
            boxShadow: '0 0 12px rgba(0, 229, 204, 0.3)',
          }}
        >
          <Image src="/agents/aria.webp" alt="Aria" fill className="object-cover" sizes="48px" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">Aria — Concierge IA</p>
          <p className="text-xs text-text-secondary">Disponible 24h/24</p>
        </div>
      </div>

      {/* Messages area */}
      <div ref={messagesContainerRef} className="flex-1 space-y-4 overflow-y-auto rounded-xl bg-dark-bg/50 p-4" style={{ maxHeight: '450px', minHeight: '300px' }}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent/15 text-text-primary'
                    : 'bg-dark-card/80 text-text-secondary'
                }`}
                style={{
                  border:
                    msg.role === 'user'
                      ? '1px solid rgba(0, 229, 204, 0.2)'
                      : '1px solid rgba(30, 36, 54, 0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {msg.content ? (
                  <div>{renderContent(msg.content)}</div>
                ) : (
                  <TypingIndicator />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Décrivez votre besoin..."
          disabled={isStreaming}
          className="flex-1 rounded-xl bg-[rgba(19,24,41,0.6)] px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 backdrop-blur-[16px] transition-all duration-300 focus:border-accent/50 focus:shadow-[0_0_15px_rgba(0,229,204,0.15)] focus:outline-none"
          style={{ border: '1px solid rgba(30, 36, 54, 0.4)' }}
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="shrink-0 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-dark-bg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,204,0.4)] disabled:opacity-40"
        >
          {isStreaming ? '...' : 'Envoyer'}
        </button>
      </form>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-text-secondary/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}
