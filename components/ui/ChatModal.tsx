'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'

const ChatInterface = dynamic(() => import('./ChatInterface'), {
  loading: () => (
    <div className="flex min-h-[300px] items-center justify-center text-text-secondary text-sm">
      Chargement du chat...
    </div>
  ),
})

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  initialMessage?: string
}

export default function ChatModal({ isOpen, onClose, initialMessage }: ChatModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl"
            style={{
              background: 'rgba(19, 24, 41, 0.9)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 229, 204, 0.15)',
              boxShadow: '0 0 40px rgba(0, 229, 204, 0.1), 0 25px 50px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-lg p-2 text-text-secondary transition-colors hover:bg-dark-border/30 hover:text-text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6">
              <ChatInterface
                initialMessage={initialMessage}
                className="max-h-[70vh]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
