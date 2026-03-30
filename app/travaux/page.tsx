import type { Metadata } from 'next'
import { getCaseStudies } from '@/lib/data'
import TravauxClient from './TravauxClient'

export const metadata: Metadata = {
  title: 'Nos réalisations',
  description:
    'Découvrez les projets réalisés par Gralt : automatisation, agents IA, applications sur mesure.',
  alternates: { canonical: 'https://gralt.fr/travaux' },
}

export default function TravauxPage() {
  const caseStudies = getCaseStudies()
  return <TravauxClient caseStudies={caseStudies} />
}
