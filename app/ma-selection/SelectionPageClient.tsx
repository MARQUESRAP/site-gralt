'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import AgentPlaceholder from '@/components/ui/AgentPlaceholder'
import CTAButton from '@/components/ui/CTAButton'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useSelection } from '@/lib/SelectionContext'
import { getAgentBySlug, getSections } from '@/lib/data'
import type { Agent } from '@/types'

// Parse "15-20h/semaine" → average weekly hours
function parseHoursPerWeek(str: string): number {
  const match = str.match(/(\d+)[^\d]*(\d+)?/)
  if (!match) return 5
  const low = parseInt(match[1])
  const high = match[2] ? parseInt(match[2]) : low
  return (low + high) / 2
}

// Parse "3-6 semaines" → max weeks
function parseMaxWeeks(str: string): number {
  const match = str.match(/(\d+)[^\d]*(\d+)?/)
  if (!match) return 4
  return match[2] ? parseInt(match[2]) : parseInt(match[1])
}

export default function SelectionPageClient() {
  const { selectedAgents, removeAgent, clearSelection } = useSelection()

  const sections = getSections()

  // Resolve full agent data from selection IDs
  const fullAgents: Agent[] = useMemo(() => {
    return selectedAgents
      .map((sa) => getAgentBySlug(sa.id))
      .filter((a): a is Agent => a !== undefined)
  }, [selectedAgents])

  // Build rendez-vous URL with pre-selected sections
  const rdvUrl = useMemo(() => {
    const sectionNames = [...new Set(fullAgents.map((a) => {
      const section = sections.find((s) => s.slug === a.section_id)
      return section?.name || ''
    }).filter(Boolean))]
    if (sectionNames.length === 0) return '/rendez-vous'
    return `/rendez-vous?sections=${encodeURIComponent(sectionNames.join(','))}`
  }, [fullAgents, sections])

  // ─── Empty state ───
  if (fullAgents.length === 0) {
    return (
      <div className="relative min-h-[60vh]">
        <SectionBackground color="#00E5CC" />
        <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <NeonText as="h1" size="lg" className="mb-4">
            Aucun agent sélectionné
          </NeonText>
          <p className="mb-8 max-w-md text-text-secondary">
            Explorez mes 31 agents IA et sélectionnez ceux qui correspondent à vos besoins.
          </p>
          <CTAButton href="/#sections" pulse>
            Découvrir les agents
          </CTAButton>
        </div>
      </div>
    )
  }

  // ─── Calculations ───
  const totalSetup = fullAgents.reduce((s, a) => s + a.prix_setup, 0)
  const totalMonthly = fullAgents.reduce((s, a) => s + a.prix_mensuel, 0)

  const totalWeeklyHours = fullAgents.reduce(
    (s, a) => s + parseHoursPerWeek(a.resultats.heures_liberees),
    0
  )

  // 1 FTE = ~1600h/year = ~40h/week productive
  const fteEquivalent = totalWeeklyHours / 40
  const salaryMin = Math.round(fteEquivalent * 45000)
  const salaryMax = Math.round(fteEquivalent * 55000)

  // Deployment time = max of all agents (parallel deployment)
  const maxDeployWeeks = Math.max(...fullAgents.map((a) => parseMaxWeeks(a.delai)))

  // ROI = max of all agents
  const maxRoiWeeks = Math.max(...fullAgents.map((a) => parseMaxWeeks(a.roi)))

  // Annual cost of agents
  const annualAgentCost = totalSetup + totalMonthly * 12

  // Bar chart widths (salary is always wider to show the gap)
  const maxCost = Math.max(salaryMax, annualAgentCost)
  const agentBarPercent = maxCost > 0 ? (annualAgentCost / maxCost) * 100 : 50
  const salaryBarPercent = maxCost > 0 ? (salaryMax / maxCost) * 100 : 100

  return (
    <div className="relative min-h-screen">
      <SectionBackground color="#00E5CC" secondaryColor="#B44AFF" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        <ScrollReveal>
          <NeonText as="h1" size="xl" className="mb-4 text-center">
            Votre sélection
          </NeonText>
          <p className="mb-12 text-center text-text-secondary">
            {fullAgents.length} agent{fullAgents.length > 1 ? 's' : ''} sélectionné{fullAgents.length > 1 ? 's' : ''}
          </p>
        </ScrollReveal>

        {/* ═══ PARTIE 1 — Liste des agents ═══ */}
        <ScrollReveal>
          <div className="mb-12 flex flex-col gap-4">
            {fullAgents.map((agent) => (
              <GlassCard
                key={agent.id}
                color={agent.is_golden ? '#F5C842' : agent.color}
                className="p-5"
              >
                <div className="flex items-center gap-4">
                  {agent.image ? (
                    <div
                      className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full"
                      style={{
                        border: `2px solid ${agent.is_golden ? '#F5C842' : agent.color}`,
                        boxShadow: `0 0 12px ${agent.is_golden ? '#F5C842' : agent.color}4D`,
                      }}
                    >
                      <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="56px" />
                    </div>
                  ) : (
                    <AgentPlaceholder
                      name={agent.name}
                      color={agent.is_golden ? '#F5C842' : agent.color}
                      size="sm"
                      isGolden={agent.is_golden}
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/agents/${agent.section_id}/${agent.slug}`}
                      className="font-semibold text-text-primary hover:text-accent"
                    >
                      {agent.name}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-text-secondary">
                      {agent.accroche}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      Mise en place : {agent.prix_setup.toLocaleString('fr-FR')}€
                      {' · '}
                      {agent.prix_mensuel}€/mois
                    </p>
                  </div>
                  <button
                    onClick={() => removeAgent(agent.id)}
                    className="shrink-0 rounded-lg p-2 text-text-secondary transition-colors hover:bg-dark-border/30 hover:text-red-400"
                    aria-label={`Retirer ${agent.name}`}
                  >
                    ✕
                  </button>
                </div>
              </GlassCard>
            ))}

            <div className="flex items-center justify-between">
              <Link
                href="/#sections"
                className="text-sm text-accent transition-colors hover:text-accent/80"
              >
                + Ajouter d&apos;autres agents
              </Link>
              <button
                onClick={clearSelection}
                className="text-sm text-text-secondary transition-colors hover:text-red-400"
              >
                Tout supprimer
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ═══ PARTIE 2 — Récap financier ═══ */}
        <ScrollReveal>
          <div className="mb-12">
            <NeonText as="h2" size="md" className="mb-8">
              Récap financier
            </NeonText>

            <div className="grid gap-6 md:grid-cols-2">
              <GlassCard color="#00E5CC" className="p-6">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Mise en place (une fois)
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {totalSetup.toLocaleString('fr-FR')}€
                </p>
              </GlassCard>
              <GlassCard color="#00E5CC" className="p-6">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Frais d&apos;abonnements mensuels
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {totalMonthly.toLocaleString('fr-FR')}€/mois
                </p>
              </GlassCard>
            </div>

            {/* Comparatif employé */}
            <GlassCard color="#00E5CC" className="mt-6 p-6">
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                Le travail de ces <span className="font-semibold text-text-primary">{fullAgents.length} agents</span> libère
                l&apos;équivalent de <span className="font-semibold text-text-primary">{Math.round(totalWeeklyHours)}h par semaine</span>,
                soit le travail de <span className="font-semibold text-text-primary">{fteEquivalent.toFixed(1)} poste{fteEquivalent > 1 ? 's' : ''} à temps plein</span>.
              </p>
              <p className="mb-6 text-sm text-text-secondary">
                Coût salarial équivalent : <span className="font-semibold text-text-primary">{salaryMin.toLocaleString('fr-FR')}€ — {salaryMax.toLocaleString('fr-FR')}€/an</span> charges comprises.
              </p>

              {/* Barres animées */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-2 text-xs font-medium text-accent">
                    Votre investissement (1ère année)
                  </p>
                  <div className="h-8 overflow-hidden rounded-lg bg-dark-border/30">
                    <motion.div
                      className="flex h-full items-center rounded-lg px-3 text-xs font-medium text-dark-bg"
                      style={{ background: '#00E5CC' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${agentBarPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    >
                      {annualAgentCost.toLocaleString('fr-FR')}€
                    </motion.div>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-red-400">
                    Coût salarial équivalent
                  </p>
                  <div className="h-8 overflow-hidden rounded-lg bg-dark-border/30">
                    <motion.div
                      className="flex h-full items-center rounded-lg px-3 text-xs font-medium text-white"
                      style={{ background: 'rgba(239, 68, 68, 0.7)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${salaryBarPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    >
                      {salaryMin.toLocaleString('fr-FR')}€ — {salaryMax.toLocaleString('fr-FR')}€/an
                    </motion.div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ═══ PARTIE 3 — ROI combiné ═══ */}
        <ScrollReveal>
          <div className="mb-12">
            <NeonText as="h2" size="md" className="mb-8">
              ROI combiné estimé
            </NeonText>

            <div className="grid gap-6 md:grid-cols-3">
              <GlassCard color="#00E5CC" className="p-6 text-center">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Mise en place
                </p>
                <p className="text-3xl font-bold text-accent">
                  {maxDeployWeeks} sem.
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Déploiement en parallèle
                </p>
              </GlassCard>
              <GlassCard color="#00E5CC" className="p-6 text-center">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Premiers résultats
                </p>
                <p className="text-3xl font-bold text-accent">
                  {maxRoiWeeks} sem.
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Après mise en place
                </p>
              </GlassCard>
              <GlassCard color="#00E5CC" className="p-6 text-center">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Temps libéré
                </p>
                <p className="text-3xl font-bold text-accent">
                  {Math.round(totalWeeklyHours)}h
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  par semaine
                </p>
              </GlassCard>
            </div>
          </div>
        </ScrollReveal>

        {/* ═══ PARTIE 4 — CTA ═══ */}
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTAButton href={rdvUrl} pulse>
              Discutons de votre projet
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
