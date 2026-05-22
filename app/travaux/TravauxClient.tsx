'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal'
import { useSectionColor } from '@/lib/SectionContext'
import type { CaseStudy, CaseStudyCategory } from '@/types'
import { CASE_STUDY_CATEGORIES } from '@/types'

const COLOR = '#00E5CC'

function ClientMark({ cs }: { cs: CaseStudy }) {
  // Pas de marque pour les clients anonymes — la confidentialité est
  // mentionnée dans la note en bas de page.
  if (cs.client_anonymous) return null

  if (cs.client_logo && cs.client_name) {
    return (
      <div
        className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white/[0.04]"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        title={cs.client_name}
      >
        <Image
          src={cs.client_logo}
          alt={cs.client_name}
          fill
          className="object-contain p-1"
          sizes="40px"
        />
      </div>
    )
  }

  if (cs.client_name) {
    return (
      <span
        className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider"
        style={{
          background: 'rgba(255,255,255,0.04)',
          color: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {cs.client_name}
      </span>
    )
  }

  return null
}

function MetricBadge({ cs, color }: { cs: CaseStudy; color: string }) {
  if (!cs.headline_metric && !cs.time_saved) return null
  const label = cs.headline_metric || cs.time_saved
  return (
    <div
      className="inline-flex items-baseline gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold"
      style={{
        background: `${color}14`,
        color,
        border: `1px solid ${color}33`,
        boxShadow: `0 0 12px ${color}1A`,
      }}
    >
      {label}
    </div>
  )
}

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const cat = CASE_STUDY_CATEGORIES[cs.category]
  const color = cat?.color ?? COLOR
  const hasClientMark = !cs.client_anonymous && cs.client_name

  const inner = (
    <GlassCard
      color={color}
      className="flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Logo client en haut à droite (uniquement si client nommé) */}
      {hasClientMark && (
        <div className="absolute right-4 top-4 z-10">
          <ClientMark cs={cs} />
        </div>
      )}

      {/* Metric */}
      <div className={`mb-4 ${hasClientMark ? 'pr-14' : ''}`}>
        <MetricBadge cs={cs} color={color} />
      </div>

      {/* Title */}
      <h3 className="mb-3 text-base font-semibold leading-snug text-text-primary">
        {cs.title}
      </h3>

      {/* Body */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-4">
        {cs.context}
      </p>

      {/* Sub-automations preview (Rapid-Pub LinkedIn) */}
      {cs.sub_automations && cs.sub_automations.length > 0 && (
        <ul className="mb-4 space-y-1.5">
          {cs.sub_automations.map((sa) => (
            <li
              key={sa.title}
              className="flex items-start gap-2 text-xs text-text-secondary"
            >
              <span
                className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full"
                style={{ background: color }}
              />
              <span>
                <span className="font-medium text-text-primary">{sa.title}</span>
                <span className="ml-1 opacity-70">— {sa.time_saved}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      {cs.type === 'detailed' ? (
        <span className="mt-auto text-sm font-medium" style={{ color }}>
          Lire le case study →
        </span>
      ) : (
        <span className="mt-auto text-xs text-text-secondary opacity-60">
          Automatisation livrée en production
        </span>
      )}
    </GlassCard>
  )

  if (cs.type === 'detailed') {
    return (
      <Link href={`/travaux/${cs.slug}`} className="block h-full">
        {inner}
      </Link>
    )
  }

  return <div className="h-full">{inner}</div>
}

function CategorySection({
  category,
  caseStudies,
}: {
  category: CaseStudyCategory
  caseStudies: CaseStudy[]
}) {
  const cat = CASE_STUDY_CATEGORIES[category]
  if (!cat || caseStudies.length === 0) return null

  return (
    <section className="mb-16">
      <ScrollReveal>
        <div className="mb-6 flex items-baseline gap-4">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{
              background: cat.color,
              boxShadow: `0 0 12px ${cat.color}`,
            }}
          />
          <h2 className="text-2xl font-bold text-text-primary">{cat.label}</h2>
          <span className="text-xs uppercase tracking-wider text-text-secondary opacity-60">
            {caseStudies.length} réalisation{caseStudies.length > 1 ? 's' : ''}
          </span>
        </div>
      </ScrollReveal>

      <ScrollRevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <ScrollRevealItem key={cs.id}>
            <CaseStudyCard cs={cs} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </section>
  )
}

export default function TravauxClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const { setActiveColor } = useSectionColor()

  useEffect(() => {
    setActiveColor(COLOR)
    return () => setActiveColor('#00E5CC')
  }, [setActiveColor])

  // Group by category, ordered
  const grouped = useMemo(() => {
    const byCat = new Map<CaseStudyCategory, CaseStudy[]>()
    for (const cs of caseStudies) {
      const arr = byCat.get(cs.category) ?? []
      arr.push(cs)
      byCat.set(cs.category, arr)
    }
    return Array.from(byCat.entries()).sort(
      (a, b) =>
        CASE_STUDY_CATEGORIES[a[0]].order - CASE_STUDY_CATEGORIES[b[0]].order
    )
  }, [caseStudies])

  return (
    <div className="relative min-h-screen">
      <SectionBackground color={COLOR} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* ═══ Header ═══ */}
        <ScrollReveal>
          <div className="mb-12 text-center">
            <NeonText as="h1" size="xl" color={COLOR} className="mb-4">
              Le temps que je rends à mes clients
            </NeonText>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              Chaque automatisation ci-dessous est en production chez un client.
              Le chiffre affiché, c&apos;est le temps libéré chaque semaine — ou
              le gain mesuré dans l&apos;activité.
            </p>
          </div>
        </ScrollReveal>

        {/* ═══ Sections par fonction métier ═══ */}
        {grouped.map(([category, items]) => (
          <CategorySection
            key={category}
            category={category}
            caseStudies={items}
          />
        ))}

        {/* ═══ Note confidentialité ═══ */}
        <ScrollReveal>
          <div
            className="mx-auto mt-8 max-w-2xl rounded-xl px-6 py-5 text-center text-sm text-text-secondary"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p>
              <span className="font-medium text-text-primary">
                Pourquoi certains clients ne sont pas nommés ?
              </span>{' '}
              Plusieurs réalisations sont anonymisées pour respecter la
              confidentialité de mes clients. Les chiffres et résultats restent
              ceux mesurés en production. Je peux en parler plus en détail lors
              d&apos;un échange.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
