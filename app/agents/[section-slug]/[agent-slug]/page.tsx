import { notFound } from 'next/navigation'
import {
  getSections,
  getAgentsBySection,
  getAgentBySlug,
  getSectionBySlug,
  getComplementaryAgents,
  getCaseStudyBySlug,
} from '@/lib/data'
import AgentPageClient from './AgentPageClient'

// Generate static params for all 31 agents
export function generateStaticParams() {
  const sections = getSections()
  const params: { 'section-slug': string; 'agent-slug': string }[] = []
  for (const section of sections) {
    const agents = getAgentsBySection(section.slug)
    for (const agent of agents) {
      params.push({
        'section-slug': section.slug,
        'agent-slug': agent.slug,
      })
    }
  }
  return params
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ 'section-slug': string; 'agent-slug': string }>
}) {
  return params.then((p) => {
    const agent = getAgentBySlug(p['agent-slug'])
    if (!agent) return { title: 'Agent introuvable' }
    const section = getSectionBySlug(p['section-slug'])
    return {
      title: `${agent.name} — ${section?.name || ''} — Gralt`,
      description: agent.accroche,
    }
  })
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ 'section-slug': string; 'agent-slug': string }>
}) {
  const { 'section-slug': sectionSlug, 'agent-slug': agentSlug } = await params
  const agent = getAgentBySlug(agentSlug)
  if (!agent) notFound()

  const section = getSectionBySlug(sectionSlug)
  if (!section) notFound()

  const complementaryAgents = getComplementaryAgents(agentSlug)
  const caseStudy = agent.case_study_slug
    ? getCaseStudyBySlug(agent.case_study_slug)
    : undefined

  return (
    <AgentPageClient
      agent={agent}
      section={section}
      complementaryAgents={complementaryAgents}
      caseStudy={caseStudy}
    />
  )
}
