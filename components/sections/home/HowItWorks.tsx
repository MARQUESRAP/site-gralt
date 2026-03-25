'use client'

import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionBackground from '@/components/ui/SectionBackground'
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal'

const steps = [
  {
    num: 1,
    title: 'Explorez les agents',
    desc: 'Découvrez les agents par section, sélectionnez ceux qui correspondent.',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="22" height="22" rx="4" stroke="#00E5CC" strokeWidth="2.5" opacity="0.9" />
        <rect x="42" y="8" width="22" height="22" rx="4" stroke="#00E5CC" strokeWidth="2.5" opacity="0.9" />
        <rect x="8" y="42" width="22" height="22" rx="4" stroke="#00E5CC" strokeWidth="2.5" opacity="0.9" />
        <rect x="42" y="42" width="22" height="22" rx="4" stroke="#00E5CC" strokeWidth="2.5" opacity="0.9" />
        <circle cx="19" cy="16" r="3" fill="#00E5CC" opacity="0.5" />
        <circle cx="53" cy="16" r="3" fill="#00E5CC" opacity="0.5" />
        <circle cx="19" cy="50" r="3" fill="#00E5CC" opacity="0.5" />
        <circle cx="53" cy="50" r="3" fill="#00E5CC" opacity="0.5" />
        <line x1="14" y1="24" x2="24" y2="24" stroke="#00E5CC" strokeWidth="1.5" opacity="0.4" />
        <line x1="48" y1="24" x2="58" y2="24" stroke="#00E5CC" strokeWidth="1.5" opacity="0.4" />
        <line x1="14" y1="58" x2="24" y2="58" stroke="#00E5CC" strokeWidth="1.5" opacity="0.4" />
        <line x1="48" y1="58" x2="58" y2="58" stroke="#00E5CC" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: 2,
    title: 'Réservez un audit gratuit',
    desc: 'On discute de votre business et des agents qui vous conviennent.',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="14" width="52" height="38" rx="6" stroke="#00E5CC" strokeWidth="2.5" opacity="0.9" />
        <circle cx="36" cy="33" r="8" stroke="#00E5CC" strokeWidth="2" opacity="0.6" />
        <path d="M33 33L35 35L39 31" stroke="#00E5CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 58L36 52L46 58" stroke="#00E5CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        <circle cx="20" cy="22" r="2" fill="#00E5CC" opacity="0.4" />
        <circle cx="26" cy="22" r="2" fill="#00E5CC" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: 3,
    title: 'Je construis votre agent',
    desc: 'En 2 à 5 semaines, votre agent est configuré, testé, opérationnel.',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="30" r="12" stroke="#00E5CC" strokeWidth="2.5" opacity="0.9" />
        <circle cx="46" cy="42" r="12" stroke="#00E5CC" strokeWidth="2.5" opacity="0.9" />
        <circle cx="26" cy="30" r="4" fill="#00E5CC" opacity="0.3" />
        <circle cx="46" cy="42" r="4" fill="#00E5CC" opacity="0.3" />
        <path d="M34 24L38 36" stroke="#00E5CC" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        <line x1="14" y1="56" x2="58" y2="56" stroke="#00E5CC" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 3" />
        <rect x="12" y="54" width="8" height="8" rx="2" stroke="#00E5CC" strokeWidth="1.5" opacity="0.5" />
        <rect x="52" y="54" width="8" height="8" rx="2" stroke="#00E5CC" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    num: 4,
    title: 'Votre agent travaille pour vous',
    desc: 'Il tourne 24h/24, vous récoltez les résultats.',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 56V28" stroke="#00E5CC" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M28 36L36 28L44 36" stroke="#00E5CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <path d="M24 18L36 10L48 18" stroke="#00E5CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        <ellipse cx="36" cy="60" rx="14" ry="4" stroke="#00E5CC" strokeWidth="2" opacity="0.4" />
        <circle cx="18" cy="44" r="4" stroke="#00E5CC" strokeWidth="1.5" opacity="0.5" />
        <circle cx="54" cy="44" r="4" stroke="#00E5CC" strokeWidth="1.5" opacity="0.5" />
        <path d="M16 42L20 46" stroke="#00E5CC" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <path d="M52 42L56 46" stroke="#00E5CC" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="relative px-6 py-[120px]">
      <SectionBackground color="#00E5CC" secondaryColor="#22C55E" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal>
          <NeonText as="h2" size="lg" className="mb-16 text-center">
            Comment ça marche
          </NeonText>
        </ScrollReveal>

        <ScrollRevealGroup className="grid gap-8 md:grid-cols-2">
          {steps.map((step) => (
            <ScrollRevealItem key={step.num}>
              <GlassCard color="#00E5CC" className="p-6">
                <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
                  {/* Left — Number + text */}
                  <div className="flex flex-1 items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-dark-bg"
                      style={{
                        background: '#00E5CC',
                        boxShadow: '0 0 15px rgba(0, 229, 204, 0.4)',
                      }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="text-sm text-text-secondary">{step.desc}</p>
                    </div>
                  </div>

                  {/* Right — SVG icon with glow */}
                  <div
                    className="shrink-0"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(0, 229, 204, 0.3))',
                    }}
                  >
                    {step.icon}
                  </div>
                </div>
              </GlassCard>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  )
}
