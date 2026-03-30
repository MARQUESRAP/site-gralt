'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal'
import { useSectionColor } from '@/lib/SectionContext'
import type { CaseStudy } from '@/types'

const COLOR = '#00E5CC'

export default function TravauxClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const { setActiveColor } = useSectionColor()

  useEffect(() => {
    setActiveColor(COLOR)
    return () => setActiveColor('#00E5CC')
  }, [setActiveColor])

  return (
    <div className="relative min-h-screen">
      <SectionBackground color={COLOR} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* ═══ Header ═══ */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <NeonText as="h1" size="xl" color={COLOR} className="mb-4">
              Mes réalisations
            </NeonText>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              Projets concrets déployés pour mes clients — automatisations, applications, systèmes sur mesure.
            </p>
          </div>
        </ScrollReveal>

        {/* ═══ Grid de projets ═══ */}
        <ScrollRevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <ScrollRevealItem key={cs.id}>
              {cs.type === 'detailed' ? (
                /* Detailed case study — links to individual page */
                <Link href={`/travaux/${cs.slug}`} className="block h-full">
                  <GlassCard
                    color={COLOR}
                    className="relative flex h-full flex-col overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-1"
                  >
                    {/* Project image */}
                    {cs.image && (
                      <div className="relative w-full bg-[#0d1120]" style={{ aspectRatio: '16 / 10' }}>
                        <Image src={cs.image} alt={cs.title} fill className="object-contain" sizes="400px" />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                    {/* Badge */}
                    <span
                      className="mb-4 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: `${COLOR}1A`,
                        color: COLOR,
                        border: `1px solid ${COLOR}4D`,
                        boxShadow: `0 0 8px ${COLOR}33`,
                      }}
                    >
                      Case study
                    </span>

                    <h2 className="mb-3 text-lg font-semibold leading-snug text-text-primary">
                      {cs.title}
                    </h2>

                    <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {cs.context}
                    </p>

                    {/* Tech pills */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {cs.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full px-2 py-0.5 text-xs"
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="mt-auto text-sm font-medium" style={{ color: COLOR }}>
                      Lire le case study →
                    </span>
                    </div>
                  </GlassCard>
                </Link>
              ) : (
                /* Mini case study — content displayed directly, no individual page */
                <GlassCard
                  color={COLOR}
                  className="flex h-full flex-col p-6"
                >
                  {/* Mini badge */}
                  <span
                    className="mb-4 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    Projet
                  </span>

                  <h2 className="mb-3 text-lg font-semibold leading-snug text-text-primary">
                    {cs.title}
                  </h2>

                  <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                    {cs.context}
                  </p>
                </GlassCard>
              )}
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </div>
  )
}
