'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CTAButton from '@/components/ui/CTAButton'
import ChatModal from '@/components/ui/ChatModal'

export default function HeroSection() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <section className="relative flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-6">
        {/* Background image — full bleed */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(10, 14, 26, 0.55) 0%, rgba(10, 14, 26, 0.75) 60%, rgba(10, 14, 26, 0.95) 100%)',
            }}
          />
        </div>

        {/* Text content — centered */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Titre — animation mot par mot */}
          <motion.h1
            className="mb-6 text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
            style={{ textShadow: '0 0 40px rgba(0, 229, 204, 0.2), 0 2px 8px rgba(0, 0, 0, 0.5)' }}
          >
            {'Rencontrez les agents IA qui vont transformer votre entreprise.'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                className="mr-[0.3em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-text-secondary md:text-xl"
            style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}
          >
            Des agents IA sur mesure qui travaillent pour votre entreprise 24h/24 —
            prospection, marketing, support, admin, pilotage.
          </motion.p>

          {/* Barre de recherche → ouvre le chatbot */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mx-auto mb-10 max-w-xl"
          >
            <button
              onClick={() => setChatOpen(true)}
              className="glass flex w-full cursor-pointer items-center gap-3 rounded-xl px-5 py-3.5 transition-all duration-300 hover:border-accent/30"
              style={{ border: '1px solid rgba(0, 229, 204, 0.15)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <span className="text-sm text-text-secondary">
                Je sais ce que je veux...
              </span>
            </button>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <CTAButton href="#sections" pulse>
              Découvrir nos agents
            </CTAButton>
            <CTAButton variant="secondary" href="/rendez-vous">
              Réserver un audit gratuit
            </CTAButton>
          </motion.div>
        </div>
      </section>

      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}
