'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import AgentPlaceholder from '@/components/ui/AgentPlaceholder'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import CTAButton from '@/components/ui/CTAButton'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal'
import ShimmerEffect from '@/components/ui/ShimmerEffect'
import AgentSelector from '@/components/ui/AgentSelector'
import ChatModal from '@/components/ui/ChatModal'
import { useSectionColor } from '@/lib/SectionContext'
import type { Agent, Section, CaseStudy } from '@/types'

interface Props {
  agent: Agent
  section: Section
  complementaryAgents: Agent[]
  caseStudy: CaseStudy | undefined
}

export default function AgentPageClient({
  agent,
  section,
  complementaryAgents,
  caseStudy,
}: Props) {
  const { setActiveColor } = useSectionColor()
  const [chatOpen, setChatOpen] = useState(false)
  const color = agent.is_golden ? '#F5C842' : agent.color

  useEffect(() => {
    setActiveColor(color)
    return () => setActiveColor('#00E5CC')
  }, [color, setActiveColor])

  return (
    <div className="relative min-h-screen">
      <SectionBackground
        color={color}
        secondaryColor={agent.is_golden ? '#D4A528' : section.color_secondary || undefined}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        {/* ═══ BLOC 1 — Hero ═══ */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center justify-center gap-2 text-sm text-text-secondary">
              <Link href={`/agents/${section.slug}`} className="transition-colors hover:text-accent">
                {section.name}
              </Link>
              <span>/</span>
              {agent.subsection && (
                <>
                  <span>{agent.subsection}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-text-primary">{agent.name}</span>
            </div>

            <div className="relative inline-block">
              {agent.image ? (
                <div
                  className="relative mx-auto h-48 w-48 overflow-hidden rounded-full"
                  style={{
                    border: `3px solid ${color}`,
                    boxShadow: `0 0 25px ${color}4D, 0 0 50px ${color}1A`,
                  }}
                >
                  <Image
                    src={agent.image}
                    alt={`Photo de ${agent.name}`}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                  {agent.is_golden && <ShimmerEffect />}
                </div>
              ) : (
                <>
                  <AgentPlaceholder
                    name={agent.name}
                    color={color}
                    size="lg"
                    isGolden={agent.is_golden}
                  />
                  {agent.is_golden && (
                    <div className="absolute inset-0 rounded-full">
                      <ShimmerEffect />
                    </div>
                  )}
                </>
              )}
            </div>

            <NeonText as="h1" size="xl" color={color} className="mb-4 mt-6">
              {agent.name}
            </NeonText>
            {agent.subsection && (
              <p className="mb-4 text-sm text-text-secondary">{agent.subsection}</p>
            )}
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
              {agent.accroche}
            </p>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 2 — Ce qu'il fait ═══ */}
        <ScrollReveal>
          <div className="mb-16">
            <NeonText as="h2" size="md" color={color} className="mb-8">
              Ce que {agent.name} fait pour vous
            </NeonText>
            <ScrollRevealGroup className="flex flex-col gap-4">
              {agent.description_steps.map((step) => (
                <ScrollRevealItem key={step.step}>
                  <GlassCard color={color} className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          background: `${color}1A`,
                          color,
                          border: `1px solid ${color}4D`,
                          boxShadow: `0 0 10px ${color}33`,
                        }}
                      >
                        {step.step}
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {step.text}
                      </p>
                    </div>
                  </GlassCard>
                </ScrollRevealItem>
              ))}
            </ScrollRevealGroup>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 3 — Résultats estimés ═══ */}
        <ScrollReveal>
          <div className="mb-16">
            <NeonText as="h2" size="md" color={color} className="mb-8">
              Résultats estimés
            </NeonText>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Metrics */}
              <GlassCard color={color} className="p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color }}>
                  ROI estimé
                </h3>
                <ul className="flex flex-col gap-2">
                  {agent.resultats.metrics.map((m, i) => (
                    <li key={i} className="text-sm leading-relaxed text-text-secondary">
                      • {m}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Temps libéré */}
              <GlassCard color={color} className="p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color }}>
                  Temps libéré
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Libère <span className="font-semibold text-text-primary">{agent.resultats.heures_liberees}</span> pour
                  que votre équipe se concentre sur les tâches à forte valeur.
                </p>
              </GlassCard>

              {/* ROI */}
              <GlassCard color={color} className="p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color }}>
                  Retour sur investissement
                </h3>
                <p className="text-3xl font-bold" style={{ color }}>
                  {agent.resultats.roi_semaines}
                </p>
              </GlassCard>
            </div>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 4 — Informations pratiques ═══ */}
        <ScrollReveal>
          <div className="mb-16">
            <NeonText as="h2" size="md" color={color} className="mb-8">
              Informations pratiques
            </NeonText>
            <GlassCard color={color} className="p-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                    Mise en place
                  </p>
                  <p className="text-xl font-bold text-text-primary">
                    {agent.prix_setup_min.toLocaleString('fr-FR')}€ — {agent.prix_setup_max.toLocaleString('fr-FR')}€
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                    Abonnement mensuel
                  </p>
                  <p className="text-xl font-bold text-text-primary">
                    {agent.prix_mensuel_min}€ — {agent.prix_mensuel_max}€/mois
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                    Délai de mise en place
                  </p>
                  <p className="text-xl font-bold text-text-primary">
                    {agent.delai}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 6 — CTA ═══ */}
        <ScrollReveal>
          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <AgentSelector
              agentId={agent.id}
              agentName={agent.name}
              color={color}
            />
            <CTAButton variant="secondary" color={color} href="/rendez-vous">
              Réserver un audit
            </CTAButton>
            <CTAButton variant="secondary" color={color} onClick={() => setChatOpen(true)}>
              Poser une question sur {agent.name}
            </CTAButton>
          </div>
        </ScrollReveal>

        {/* ═══ Agents complémentaires ═══ */}
        {complementaryAgents.length > 0 && (
          <ScrollReveal>
            <div className="mb-16">
              <NeonText as="h2" size="md" color={color} className="mb-8">
                Agents complémentaires
              </NeonText>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {complementaryAgents.map((comp) => (
                  <Link
                    key={comp.slug}
                    href={`/agents/${comp.section_id}/${comp.slug}`}
                  >
                    <GlassCard
                      color={comp.is_golden ? '#F5C842' : comp.color}
                      className="p-5"
                    >
                      <div className="flex items-center gap-3">
                        {comp.image ? (
                          <div
                            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full"
                            style={{
                              border: `2px solid ${comp.is_golden ? '#F5C842' : comp.color}`,
                              boxShadow: `0 0 12px ${comp.is_golden ? '#F5C842' : comp.color}4D`,
                            }}
                          >
                            <Image src={comp.image} alt={comp.name} fill className="object-cover" sizes="48px" />
                          </div>
                        ) : (
                          <AgentPlaceholder
                            name={comp.name}
                            color={comp.is_golden ? '#F5C842' : comp.color}
                            size="sm"
                            isGolden={comp.is_golden}
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-text-primary">
                            {comp.name}
                          </p>
                          <p className="line-clamp-2 text-xs text-text-secondary">
                            {comp.accroche}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ═══ Projet associé ═══ */}
        {caseStudy && (
          <ScrollReveal>
            <div className="mb-16">
              <NeonText as="h2" size="md" color={color} className="mb-6">
                Projet associé
              </NeonText>
              <Link href={`/travaux/${caseStudy.slug}`}>
                <GlassCard color={color} className="overflow-hidden p-0">
                  {caseStudy.image && (
                    <div className="relative w-full bg-[#0d1120]" style={{ aspectRatio: '16 / 10' }}>
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="mb-1 font-semibold text-text-primary">{caseStudy.title}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2">{caseStudy.context}</p>
                    <span className="mt-2 inline-block text-sm" style={{ color }}>
                      Voir le projet →
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>

      <ChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialMessage={`Je voudrais en savoir plus sur ${agent.name} — ${agent.accroche.slice(0, 100)}...`}
      />
    </div>
  )
}
