import { notFound } from 'next/navigation'
import {
  getSections,
  getSectionBySlug,
  getSubsections,
  getAgentsBySubsection,
  getGoldenAgent,
  getRegularAgents,
} from '@/lib/data'
import SectionPageClient from './SectionPageClient'

// Generate static params for all 6 sections
export function generateStaticParams() {
  return getSections().map((s) => ({ 'section-slug': s.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ 'section-slug': string }> }) {
  // We need to handle this synchronously for metadata, so we use a workaround
  return params.then((p) => {
    const section = getSectionBySlug(p['section-slug'])
    if (!section) return { title: 'Section introuvable' }
    return {
      title: `Agents ${section.name}`,
      description: section.description,
      alternates: { canonical: `https://gralt.fr/agents/${p['section-slug']}` },
    }
  })
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ 'section-slug': string }>
}) {
  const { 'section-slug': slug } = await params
  const section = getSectionBySlug(slug)
  if (!section) notFound()

  const sections = getSections()
  const currentIndex = sections.findIndex((s) => s.slug === slug)
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null

  const subsections = getSubsections(slug)
  const goldenAgent = getGoldenAgent(slug)
  const regularAgents = getRegularAgents(slug)

  // Group agents by subsection
  const agentGroups = subsections.length > 0
    ? subsections.map((sub) => ({
        name: sub,
        color: sub === subsections[0] ? section.color_primary : (section.color_secondary || section.color_primary),
        agents: getAgentsBySubsection(slug, sub),
      }))
    : [{ name: null, color: section.color_primary, agents: regularAgents }]

  return (
    <SectionPageClient
      section={section}
      agentGroups={agentGroups}
      goldenAgent={goldenAgent}
      nextSection={nextSection}
    />
  )
}
