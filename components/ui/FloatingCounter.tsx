'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSelection } from '@/lib/SelectionContext'

export default function FloatingCounter() {
  const { selectedAgents } = useSelection()
  const count = selectedAgents.length

  if (count === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/ma-selection">
          <motion.div
            className="flex items-center gap-2 rounded-full px-5 py-3 shadow-lg"
            style={{
              background: 'rgba(19, 24, 41, 0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 229, 204, 0.3)',
              boxShadow: '0 0 20px rgba(0, 229, 204, 0.2), 0 4px 24px rgba(0, 0, 0, 0.4)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 229, 204, 0.3), 0 4px 24px rgba(0, 0, 0, 0.4)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-sm text-text-secondary">Ma sélection</span>
            <motion.span
              key={count}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-dark-bg"
            >
              {count}
            </motion.span>
          </motion.div>
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}
