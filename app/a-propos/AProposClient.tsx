'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getSections, getAgentsBySection } from '@/lib/data'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import AgentPlaceholder from '@/components/ui/AgentPlaceholder'
import CTAButton from '@/components/ui/CTAButton'
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from '@/components/ui/ScrollReveal'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const sections = getSections()
const sectionsWithAgents = sections.map((s) => ({
  ...s,
  agents: getAgentsBySection(s.slug),
}))

// ---------------------------------------------------------------------------
// Timeline data
// ---------------------------------------------------------------------------

const timelinePoints = [
  {
    title: '18 ans : Le premier saut.',
    text: 'Agence web lancée en parallèle des études en commerce et management opérationnel à Lille. « Ce qui me plaît, c\'est de travailler pour moi. Quitte à travailler deux fois plus. »',
  },
  {
    title: 'Les années de construction.',
    text: 'Deuxième activité (UGC) en parallèle des études. Obsession : rendre service aux entreprises avec les outils les plus performants.',
  },
  {
    title: 'Le déclic IA.',
    text: 'Arrivée de ChatGPT. Plongée dans l\'IA + automatisation. Levier sans précédent pour les entreprises.',
  },
  {
    title: 'Les premiers agents.',
    text: 'Systèmes de prospection, machines à contenu, applications sur mesure, chatbots intelligents. Résultats immédiats.',
  },
  {
    title: 'Gralt, aujourd\'hui.',
    text: '30+ agents, des entreprises qui transforment leur manière de travailler.',
  },
]

// ---------------------------------------------------------------------------
// Convictions data
// ---------------------------------------------------------------------------

const convictions = [
  {
    title: "L'IA libère, elle ne remplace pas",
    text: "Les agents IA prennent en charge le travail répétitif et chronophage — pour que les équipes se concentrent sur ce qui demande vraiment de l'humain : la relation, la créativité, la décision.",
  },
  {
    title: 'La technologie doit être invisible',
    text: "Un bon agent IA, ça se voit dans les résultats, pas dans l'interface. Pas de tableaux de bord incompréhensibles, pas de formation interminable — juste un outil qui tourne en fond et délivre.",
  },
  {
    title: 'Les entreprises en croissance méritent mieux',
    text: "Les grandes entreprises ont des équipes entières dédiées à l'automatisation et à l'IA. Les entreprises de 20 à 500 personnes ont les mêmes besoins, les mêmes ambitions — elles méritent les mêmes outils.",
  },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AProposClient() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <SectionBackground color="#00E5CC" secondaryColor="#B44AFF" />
      </div>

      <div className="relative z-10">

        {/* ═══════════════════════════════════════════════════════════
            ZONE 1 — Intro
        ═══════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">

            {/* Photo Raph */}
            <ScrollReveal className="w-full flex-shrink-0 md:w-auto">
              <div
                className="relative mx-auto h-[280px] w-[210px] overflow-hidden rounded-2xl sm:h-[350px] sm:w-[260px] md:h-[400px] md:w-[300px]"
                style={{
                  border: '1px solid rgba(0, 229, 204, 0.2)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 40px rgba(0,229,204,0.05)',
                }}
              >
                <Image
                  src="/raph.webp"
                  alt="Raphaël, fondateur de Gralt"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            </ScrollReveal>

            {/* Intro text */}
            <div className="flex flex-col justify-center gap-6">
              <ScrollReveal delay={0.1}>
                <NeonText
                  as="p"
                  color="#00E5CC"
                  size="sm"
                  className="uppercase tracking-[0.2em]"
                >
                  À propos
                </NeonText>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                  Raphaël
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p
                  className="max-w-xl text-lg leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  J&rsquo;ai lancé ma première entreprise à 18 ans, en parallèle de mes études.
                  Depuis, je n&rsquo;ai jamais arrêté de construire. Aujourd&rsquo;hui, je conçois
                  des agents IA qui prennent en charge le travail ingrat des entreprises &mdash; pour que
                  les dirigeants se concentrent sur ce qu&rsquo;ils font de mieux : développer leur
                  business.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            ZONE 2 — Parcours (Timeline)
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-24">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(19,24,41,0.6)', backdropFilter: 'blur(8px)' }}
          />
          <div className="relative mx-auto max-w-6xl px-4">
            <ScrollReveal className="mb-16 text-center">
              <NeonText as="h2" color="#00E5CC" size="lg">
                Parcours
              </NeonText>
            </ScrollReveal>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Continuous connecting line — positioned at dot center (14px from top = half of dot 20px + 4px offset) */}
                <div
                  className="pointer-events-none absolute left-[10%] right-[10%] top-[14px] h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.35) 10%, rgba(0,229,204,0.35) 90%, transparent)',
                  }}
                />

                <ScrollRevealGroup stagger={0.15} className="relative">
                  <div className="grid grid-cols-5 gap-6">
                    {timelinePoints.map((point, i) => (
                      <ScrollRevealItem key={i}>
                        <div className="flex flex-col items-center text-center">
                          {/* Dot */}
                          <div
                            className="relative z-10 mb-6 h-5 w-5 shrink-0 rounded-full ring-2 ring-accent ring-offset-2 ring-offset-dark-bg"
                            style={{
                              background: '#00E5CC',
                              boxShadow: '0 0 16px rgba(0,229,204,0.6)',
                            }}
                          />
                          <NeonText as="h3" color="#00E5CC" size="sm" className="mb-3 leading-snug">
                            {point.title}
                          </NeonText>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: 'rgba(255,255,255,0.6)' }}
                          >
                            {point.text}
                          </p>
                        </div>
                      </ScrollRevealItem>
                    ))}
                  </div>
                </ScrollRevealGroup>
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden">
              <ScrollRevealGroup stagger={0.12} className="relative ml-4">
                {/* Vertical line — centered on dots (dot is 16px wide at left:0, so center = 8px) */}
                <div
                  className="absolute bottom-0 left-[7px] top-0 w-px"
                  style={{
                    background: 'linear-gradient(180deg, transparent, rgba(0,229,204,0.35) 5%, rgba(0,229,204,0.35) 95%, transparent)',
                  }}
                />
                <div className="flex flex-col gap-8">
                  {timelinePoints.map((point, i) => (
                    <ScrollRevealItem key={i}>
                      <div className="flex gap-5">
                        {/* Dot */}
                        <div
                          className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full"
                          style={{
                            background: '#00E5CC',
                            boxShadow: '0 0 12px rgba(0,229,204,0.6)',
                          }}
                        />
                        {/* Content */}
                        <div>
                          <NeonText as="h3" color="#00E5CC" size="sm" className="mb-2">
                            {point.title}
                          </NeonText>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: 'rgba(255,255,255,0.6)' }}
                          >
                            {point.text}
                          </p>
                        </div>
                      </div>
                    </ScrollRevealItem>
                  ))}
                </div>
              </ScrollRevealGroup>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            ZONE 3 — Convictions
        ═══════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-6xl px-4 py-24">
          <ScrollReveal className="mb-12 text-center">
            <NeonText as="h2" color="#B44AFF" size="lg">
              Convictions
            </NeonText>
          </ScrollReveal>

          <ScrollRevealGroup stagger={0.15} className="grid gap-6 md:grid-cols-3">
            {convictions.map((conviction, i) => (
              <ScrollRevealItem key={i}>
                <GlassCard color="#B44AFF" className="h-full p-8">
                  <div className="flex h-full flex-col gap-4">
                    <NeonText as="h3" color="#B44AFF" size="sm">
                      {conviction.title}
                    </NeonText>
                    <p
                      className="flex-1 text-sm leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      {conviction.text}
                    </p>
                  </div>
                </GlassCard>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            ZONE 4 — Au-delà du code
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative py-24">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(19,24,41,0.8)' }}
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <ScrollReveal>
              <NeonText as="h2" color="#F472B6" size="lg" className="mb-8">
                Au-delà du code
              </NeonText>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <GlassCard color="#F472B6" hoverable={false} className="p-10">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-5xl">⚽</span>
                  <p
                    className="max-w-2xl text-lg leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    Sport depuis l&rsquo;âge de 5 ans (14 ans de foot, 5 ans de tennis, padel,
                    course à pied). Parallèle sport/business&nbsp;: se dépasser, sacrifier le
                    présent pour le futur, mental à toute épreuve.
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            ZONE 5 — L'équipe
        ═══════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 py-24">
          <ScrollReveal className="mb-4 text-center">
            <NeonText as="h2" color="#00E5CC" size="lg">
              31 agents. 6 sections. 0 jour de congé.
            </NeonText>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mb-16 text-center">
            <p
              className="text-base"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Votre équipe IA disponible 24h/24, 7j/7.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-20">
            {sectionsWithAgents.map((section, sIdx) => {
              const goldenAgents = section.agents.filter((a) => a.is_golden)
              const regularAgents = section.agents.filter((a) => !a.is_golden)

              return (
                <ScrollReveal key={section.id} delay={sIdx * 0.05}>
                  {/* Section heading */}
                  <div className="mb-8 flex items-center gap-4">
                    <div
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(90deg, ${section.color_primary}4D, transparent)`,
                      }}
                    />
                    <NeonText
                      as="h3"
                      color={section.color_primary}
                      size="sm"
                      className="whitespace-nowrap uppercase tracking-widest"
                    >
                      {section.name}
                    </NeonText>
                    <div
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${section.color_primary}4D)`,
                      }}
                    />
                  </div>

                  {/* Golden agents — larger, centered */}
                  {goldenAgents.length > 0 && (
                    <ScrollRevealGroup
                      stagger={0.1}
                      className="mb-8 flex flex-wrap justify-center gap-8"
                    >
                      {goldenAgents.map((agent) => (
                        <ScrollRevealItem key={agent.id}>
                          <Link
                            href={`/agents/${section.slug}/${agent.slug}`}
                            className="group flex flex-col items-center gap-1 transition-transform hover:scale-105"
                          >
                            {agent.image ? (
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className="relative h-36 w-36 overflow-hidden rounded-full"
                                  style={{
                                    border: '2px solid #F5C842',
                                    boxShadow: '0 0 20px rgba(245, 200, 66, 0.3), 0 0 40px rgba(245, 200, 66, 0.1)',
                                  }}
                                >
                                  <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="144px" />
                                </div>
                                <span className="text-base font-medium" style={{ color: '#F5C842', textShadow: '0 0 8px rgba(245, 200, 66, 0.3)' }}>
                                  {agent.name}
                                </span>
                              </div>
                            ) : (
                              <AgentPlaceholder
                                name={agent.name}
                                color={agent.color}
                                size="lg"
                                isGolden
                              />
                            )}
                            <span
                              className="mt-1 max-w-[140px] text-center text-xs leading-snug"
                              style={{ color: 'rgba(255,255,255,0.45)' }}
                            >
                              {agent.accroche.slice(0, 60)}…
                            </span>
                          </Link>
                        </ScrollRevealItem>
                      ))}
                    </ScrollRevealGroup>
                  )}

                  {/* Regular agents — compact grid */}
                  <ScrollRevealGroup
                    stagger={0.06}
                    className="flex flex-wrap justify-center gap-6"
                  >
                    {regularAgents.map((agent) => (
                      <ScrollRevealItem key={agent.id}>
                        <Link
                          href={`/agents/${section.slug}/${agent.slug}`}
                          className="group transition-transform hover:scale-105"
                        >
                          {agent.image ? (
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="relative h-16 w-16 overflow-hidden rounded-full"
                                style={{
                                  border: `2px solid ${agent.color}`,
                                  boxShadow: `0 0 20px ${agent.color}4D, 0 0 40px ${agent.color}1A`,
                                }}
                              >
                                <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="64px" />
                              </div>
                              <span
                                className="text-xs font-medium"
                                style={{ color: agent.color, textShadow: `0 0 8px ${agent.color}4D` }}
                              >
                                {agent.name}
                              </span>
                            </div>
                          ) : (
                            <AgentPlaceholder
                              name={agent.name}
                              color={agent.color}
                              size="sm"
                              isGolden={false}
                            />
                          )}
                        </Link>
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            ZONE 6 — CTA
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-24">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(19,24,41,0.7)', backdropFilter: 'blur(8px)' }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,229,204,0.08) 0%, transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-3xl px-4 text-center">
            <ScrollReveal>
              <NeonText as="h2" color="#00E5CC" size="lg" className="mb-6">
                Envie de voir ce que mes agents peuvent faire pour vous&nbsp;?
              </NeonText>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p
                className="mb-10 text-lg"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Explorez le catalogue ou réservez 30 minutes pour un audit gratuit de votre activité.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <CTAButton
                  variant="primary"
                  color="#00E5CC"
                  href="/"
                  pulse
                >
                  Explorer les agents
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  color="#00E5CC"
                  href="/rendez-vous"
                >
                  Réserver un audit gratuit
                </CTAButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </div>
  )
}
