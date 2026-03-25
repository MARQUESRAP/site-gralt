'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import AgentPlaceholder from '@/components/ui/AgentPlaceholder'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import CTAButton from '@/components/ui/CTAButton'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal'
import { useSectionColor } from '@/lib/SectionContext'
import type { CaseStudy, Agent } from '@/types'

const COLOR = '#00E5CC'

interface Props {
  caseStudy: CaseStudy
  linkedAgents: Agent[]
}

export default function TravauxDetailClient({ caseStudy, linkedAgents }: Props) {
  const { setActiveColor } = useSectionColor()
  const [workflowsOpen, setWorkflowsOpen] = useState(false)

  useEffect(() => {
    setActiveColor(COLOR)
    return () => setActiveColor('#00E5CC')
  }, [setActiveColor])

  return (
    <div className="relative min-h-screen">
      <SectionBackground color={COLOR} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        {/* ═══ Breadcrumb ═══ */}
        <ScrollReveal>
          <div className="mb-12 flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/travaux" className="transition-colors hover:text-accent">
              Travaux Réalisés
            </Link>
            <span>/</span>
            <span className="text-text-primary">{caseStudy.title}</span>
          </div>
        </ScrollReveal>

        {/* ═══ Hero title ═══ */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <NeonText as="h1" size="xl" color={COLOR} className="mb-4">
              {caseStudy.title}
            </NeonText>
          </div>
        </ScrollReveal>

        {/* ═══ Image principale ═══ */}
        <ScrollReveal>
          <div className="mb-12">
            {caseStudy.image ? (
              <GlassCard color={COLOR} className="overflow-hidden p-0">
                <div className="relative w-full bg-[#0d1120]" style={{ aspectRatio: '16 / 10' }}>
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </GlassCard>
            ) : (
              <ImagePlaceholder
                width="100%"
                height={400}
                label="Capture d'écran à venir"
                color={COLOR}
              />
            )}
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 1 — Contexte ═══ */}
        <ScrollReveal>
          <div className="mb-12">
            <NeonText as="h2" size="md" color={COLOR} className="mb-6">
              Contexte
            </NeonText>
            <GlassCard color={COLOR} className="p-6">
              <p className="text-base leading-relaxed text-text-secondary">
                {caseStudy.context}
              </p>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 2 — Problème ═══ */}
        <ScrollReveal>
          <div className="mb-12">
            <NeonText as="h2" size="md" color={COLOR} className="mb-6">
              Problème
            </NeonText>
            <GlassCard color={COLOR} className="p-6">
              <p className="text-base leading-relaxed text-text-secondary">
                {caseStudy.problem}
              </p>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 3 — Solution ═══ */}
        <ScrollReveal>
          <div className="mb-12">
            <NeonText as="h2" size="md" color={COLOR} className="mb-6">
              Solution
            </NeonText>
            <GlassCard color={COLOR} className="p-6">
              <p className="text-base leading-relaxed text-text-secondary">
                {caseStudy.solution}
              </p>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 4 — Infrastructure technique ═══ */}
        <ScrollReveal>
          <div className="mb-12">
            <NeonText as="h2" size="md" color={COLOR} className="mb-6">
              Infrastructure technique
            </NeonText>
            <div className="flex flex-wrap gap-3">
              {caseStudy.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    background: `${COLOR}1A`,
                    color: COLOR,
                    border: `1px solid ${COLOR}4D`,
                    boxShadow: `0 0 10px ${COLOR}22`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 5 — Résultats ═══ */}
        <ScrollReveal>
          <div className="mb-12">
            <NeonText as="h2" size="md" color={COLOR} className="mb-6">
              Résultats
            </NeonText>
            <ScrollRevealGroup className="flex flex-col gap-4">
              {caseStudy.results.map((result, i) => (
                <ScrollRevealItem key={i}>
                  <GlassCard color={COLOR} className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          background: `${COLOR}1A`,
                          color: COLOR,
                          border: `1px solid ${COLOR}4D`,
                          boxShadow: `0 0 10px ${COLOR}33`,
                        }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {result}
                      </p>
                    </div>
                  </GlassCard>
                </ScrollRevealItem>
              ))}
            </ScrollRevealGroup>
          </div>
        </ScrollReveal>

        {/* ═══ BLOC 6 — Workflows n8n ═══ */}
        {caseStudy.workflows && caseStudy.workflows.length > 0 && (
          <ScrollReveal>
            <div className="mb-12">
              <button
                onClick={() => setWorkflowsOpen(!workflowsOpen)}
                className="mb-6 flex w-full items-center justify-between rounded-xl px-6 py-4 text-left transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: 'rgba(19, 24, 41, 0.6)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${COLOR}26`,
                }}
              >
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4m0 14v4m-9.5-13.5 3 1.5m13-1.5-3 1.5M4.5 19.5l3-1.5m9 1.5-3-1.5" />
                  </svg>
                  <span className="text-base font-semibold text-text-primary">
                    Voir les systèmes derrière le projet
                  </span>
                </div>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLOR}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: workflowsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="m6 9 6 6 6-6" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {workflowsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mb-6 text-sm text-text-secondary">
                      Voici une partie des workflows n8n qui font tourner ce projet. Tous les workflows ne sont pas présentés ici.
                    </p>
                    <div className="flex flex-col gap-6">
                      {caseStudy.workflows.map((wf, i) => (
                        <GlassCard key={i} color={COLOR} className="overflow-hidden p-0">
                          <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                            <Image
                              src={wf.image}
                              alt={wf.title}
                              fill
                              className="object-contain bg-[#1a1a2e]"
                              sizes="(max-width: 768px) 100vw, 800px"
                            />
                          </div>
                          <div className="p-5">
                            <h4 className="mb-1 font-semibold text-text-primary">{wf.title}</h4>
                            <p className="text-sm text-text-secondary">{wf.description}</p>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        )}

        {/* ═══ BLOC 7 — Agents liés ═══ */}
        {linkedAgents.length > 0 && (
          <ScrollReveal>
            <div className="mb-16">
              <NeonText as="h2" size="md" color={COLOR} className="mb-4">
                Agents liés
              </NeonText>
              <p className="mb-6 text-sm text-text-secondary">
                Ce projet a été rendu possible par{' '}
                {linkedAgents.map((a, i) => (
                  <span key={a.slug}>
                    <span className="font-medium text-text-primary">{a.name}</span>
                    {i < linkedAgents.length - 2 && ', '}
                    {i === linkedAgents.length - 2 && ' et '}
                  </span>
                ))}
                . Découvrez-les.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {linkedAgents.map((agent) => {
                  const agentColor = agent.is_golden ? '#F5C842' : agent.color
                  return (
                    <Link
                      key={agent.slug}
                      href={`/agents/${agent.section_id}/${agent.slug}`}
                    >
                      <GlassCard
                        color={agentColor}
                        className="p-5 transition-transform duration-200 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3">
                          {agent.image ? (
                            <div
                              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full"
                              style={{
                                border: `2px solid ${agentColor}`,
                                boxShadow: `0 0 12px ${agentColor}4D`,
                              }}
                            >
                              <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="48px" />
                            </div>
                          ) : (
                            <AgentPlaceholder
                              name={agent.name}
                              color={agentColor}
                              size="sm"
                              isGolden={agent.is_golden}
                            />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              {agent.name}
                            </p>
                            <p className="line-clamp-2 text-xs text-text-secondary">
                              {agent.accroche}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </Link>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ═══ CTA ═══ */}
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTAButton variant="primary" color={COLOR} href="/rendez-vous">
              Réserver un audit gratuit
            </CTAButton>
            <CTAButton variant="secondary" color={COLOR} href="/sur-mesure">
              Discuter d&apos;un projet similaire
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
