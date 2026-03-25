'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import CTAButton from '@/components/ui/CTAButton'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal'
import dynamic from 'next/dynamic'

const ChatInterface = dynamic(() => import('@/components/ui/ChatInterface'), {
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center text-text-secondary text-sm">
      Chargement du chat...
    </div>
  ),
})
import { getDetailedCaseStudies } from '@/lib/data'

const ideas = [
  'Un système qui envoie un SMS à vos clients la veille de leur rendez-vous',
  'Un outil qui transforme vos bons de commande papier en données exploitables',
  'Un agent qui surveille les prix de vos fournisseurs et vous alerte quand c\'est le moment d\'acheter',
  'Un assistant qui rédige vos comptes-rendus de réunion à partir d\'un enregistrement audio',
  'Un système qui détecte quand un client est sur le point de partir et envoie une offre de rétention',
  'Un agent qui génère vos posts LinkedIn à partir de vos échanges email avec vos clients',
]

export default function SurMesureClient() {
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>(undefined)
  const chatRef = useRef<HTMLDivElement>(null)
  const caseStudies = getDetailedCaseStudies().slice(0, 3)

  const handleIdeaClick = (idea: string) => {
    setChatInitialMessage(idea)
    chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="relative min-h-screen">
      <SectionBackground color="#00E5CC" secondaryColor="#B44AFF" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12 text-center">
            <NeonText as="h1" size="xl" className="mb-4">
              Sur-Mesure
            </NeonText>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              Vous avez un besoin spécifique ? Décrivez-le à mon assistant IA — il vous
              orientera vers les bons agents ou proposera une solution sur-mesure.
            </p>
          </div>
        </ScrollReveal>

        {/* Chatbot */}
        <ScrollReveal>
          <div ref={chatRef} className="mb-16">
            <GlassCard color="#00E5CC" className="p-6" hoverable={false}>
              <ChatInterface
                initialMessage={chatInitialMessage}
                className="min-h-[400px]"
              />
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* Mini case studies */}
        <ScrollReveal>
          <div className="mb-16">
            <NeonText as="h2" size="md" className="mb-8">
              Des exemples concrets de ce que j&apos;ai déjà construit
            </NeonText>
            <div className="grid gap-4 sm:grid-cols-3">
              {caseStudies.map((cs) => (
                <Link key={cs.slug} href={`/travaux/${cs.slug}`}>
                  <GlassCard color="#00E5CC" className="p-5 h-full">
                    <h3 className="mb-2 text-sm font-semibold text-text-primary">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2">
                      {cs.results[0]}
                    </p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Galerie d'idées */}
        <ScrollReveal>
          <div className="mb-16">
            <NeonText as="h2" size="md" className="mb-8">
              Et si on allait plus loin ?
            </NeonText>
            <ScrollRevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ideas.map((idea, i) => (
                <ScrollRevealItem key={i}>
                  <button
                    onClick={() => handleIdeaClick(idea)}
                    className="w-full text-left"
                  >
                    <GlassCard color="#B44AFF" className="p-5 h-full">
                      <p className="text-sm leading-relaxed text-text-secondary">
                        &ldquo;{idea}&rdquo;
                      </p>
                      <p className="mt-3 text-xs text-accent">
                        Discuter de cette idée →
                      </p>
                    </GlassCard>
                  </button>
                </ScrollRevealItem>
              ))}
            </ScrollRevealGroup>
          </div>
        </ScrollReveal>

        {/* CTA audit */}
        <ScrollReveal>
          <div className="text-center">
            <p className="mb-6 text-text-secondary">
              Vous préférez en discuter de vive voix ?
            </p>
            <CTAButton href="/rendez-vous" pulse>
              Réservez un audit gratuit
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
