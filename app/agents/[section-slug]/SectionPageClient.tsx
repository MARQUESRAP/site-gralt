'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import AgentPlaceholder from '@/components/ui/AgentPlaceholder'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import ShimmerEffect from '@/components/ui/ShimmerEffect'
import AgentSelector from '@/components/ui/AgentSelector'
import AgentCarousel from '@/components/ui/AgentCarousel'
import { useSectionColor } from '@/lib/SectionContext'
import type { Section, Agent } from '@/types'

interface AgentGroup {
  name: string | null
  color: string
  agents: Agent[]
}

interface Props {
  section: Section
  agentGroups: AgentGroup[]
  goldenAgent: Agent | undefined
  nextSection: Section | null
}

export default function SectionPageClient({
  section,
  agentGroups,
  goldenAgent,
  nextSection,
}: Props) {
  const { setActiveColor } = useSectionColor()
  const router = useRouter()

  useEffect(() => {
    setActiveColor(section.color_primary)
    return () => setActiveColor('#00E5CC')
  }, [section.color_primary, setActiveColor])

  return (
    <div className="relative min-h-screen">
      <SectionBackground
        color={section.color_primary}
        secondaryColor={section.color_secondary || undefined}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <NeonText as="h1" size="xl" color={section.color_primary} className="mb-4">
              {section.name}
            </NeonText>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              {section.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Agent groups (by subsection) — Carousel */}
        {agentGroups.map((group) => (
          <div key={group.name || 'all'} className="mb-16">
            {group.name && (
              <ScrollReveal>
                <NeonText
                  as="h2"
                  size="md"
                  color={group.color}
                  className="mb-8"
                >
                  {group.name}
                </NeonText>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.1}>
              <AgentCarousel
                agents={group.agents.map((a) => ({
                  name: a.name,
                  slug: a.slug,
                  color: a.is_golden ? '#F5C842' : a.color,
                  sectionSlug: section.slug,
                  sectionName: group.name || section.name,
                  accroche: a.accroche,
                  isGolden: a.is_golden,
                  image: a.image,
                }))}
                showArrows={group.agents.length > 2}
                cardSize="md"
                onAgentClick={(slug) => router.push(`/agents/${section.slug}/${slug}`)}
              />
            </ScrollReveal>
          </div>
        ))}

        {/* Golden Agent — Separate premium card */}
        {goldenAgent && (
          <ScrollReveal>
            <div className="mb-16">
              <NeonText as="h2" size="md" color="#F5C842" className="mb-8 text-center">
                Agent Premium
              </NeonText>
              <Link href={`/agents/${section.slug}/${goldenAgent.slug}`}>
                <GlassCard
                  color="#F5C842"
                  className="relative mx-auto max-w-2xl overflow-hidden p-8"
                >
                  <ShimmerEffect />
                  <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                    {goldenAgent.image ? (
                      <div
                        className="relative w-full max-w-[400px] overflow-hidden rounded-xl"
                        style={{ aspectRatio: '4 / 3' }}
                      >
                        <Image
                          src={goldenAgent.image}
                          alt={`Photo de ${goldenAgent.name}`}
                          fill
                          className="object-cover"
                          sizes="400px"
                        />
                      </div>
                    ) : (
                      <ImagePlaceholder
                        width={400}
                        height={300}
                        label={`Image ${goldenAgent.name} — Agent Premium`}
                        color="#F5C842"
                      />
                    )}
                    <div className="flex-1">
                      <h3
                        className="mb-2 text-2xl font-bold"
                        style={{ color: '#F5C842', textShadow: '0 0 15px rgba(245, 200, 66, 0.4)' }}
                      >
                        {goldenAgent.name}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                        {goldenAgent.accroche}
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <AgentSelector
                          agentId={goldenAgent.id}
                          agentName={goldenAgent.name}
                          color="#F5C842"
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </div>
          </ScrollReveal>
        )}

        {/* Navigation vers section suivante */}
        {nextSection ? (
          <SectionTransition
            nextSectionName={nextSection.name}
            nextSectionSlug={nextSection.slug}
            nextColor={nextSection.color_primary}
          />
        ) : (
          <SectionTransition
            nextSectionName="Sur-Mesure"
            nextSectionSlug="../sur-mesure"
            nextColor="#00E5CC"
          />
        )}
      </div>
    </div>
  )
}
