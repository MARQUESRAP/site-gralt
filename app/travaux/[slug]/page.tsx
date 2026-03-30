import { notFound } from 'next/navigation'
import {
  getDetailedCaseStudies,
  getCaseStudyBySlug,
  getAgentBySlug,
} from '@/lib/data'
import TravauxDetailClient from './TravauxDetailClient'

// Generate static params for the 5 detailed case studies only
export function generateStaticParams() {
  return getDetailedCaseStudies().map((cs) => ({ slug: cs.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((p) => {
    const cs = getCaseStudyBySlug(p.slug)
    if (!cs || cs.type !== 'detailed') return { title: 'Projet introuvable' }
    return {
      title: cs.title,
      description: cs.context?.slice(0, 155),
      alternates: { canonical: `https://gralt.fr/travaux/${p.slug}` },
    }
  })
}

export default async function TravauxDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  // Only render pages for detailed case studies
  if (!caseStudy || caseStudy.type !== 'detailed') notFound()

  const linkedAgents = caseStudy.agent_slugs
    .map((s) => getAgentBySlug(s))
    .filter((a): a is NonNullable<typeof a> => a !== undefined)

  return <TravauxDetailClient caseStudy={caseStudy} linkedAgents={linkedAgents} />
}
