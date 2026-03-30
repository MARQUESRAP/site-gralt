import type { Metadata } from 'next'
import { getSections, getDetailedCaseStudies } from '@/lib/data'
import HeroSection from '@/components/sections/home/HeroSection'

export const metadata: Metadata = {
  title: 'Gralt — 31 agents IA au service de votre entreprise',
  description:
    'Prospection, marketing, support, recrutement, admin, pilotage. 31 agents IA sur mesure pour les entreprises en croissance.',
  alternates: { canonical: 'https://gralt.fr' },
}

// JSON-LD WebSite with SearchAction (homepage only)
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Gralt',
  url: 'https://gralt.fr',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://gralt.fr/sur-mesure?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

import SectionsGrid from '@/components/sections/home/SectionsGrid'
import SocialProof from '@/components/sections/home/SocialProof'
import CaseStudiesPreview from '@/components/sections/home/CaseStudiesPreview'
import HowItWorks from '@/components/sections/home/HowItWorks'
import FinalCTA from '@/components/sections/home/FinalCTA'

export default function HomePage() {
  const sections = getSections()
  const sectionCards = sections.map((s) => ({
    name: s.name,
    slug: s.slug,
    color: s.color_primary,
    description: s.description,
    sceneImage: `/sections/${s.slug}.webp`,
  }))
  const caseStudies = getDetailedCaseStudies()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <SectionsGrid sections={sectionCards} />
      <SocialProof />
      <CaseStudiesPreview caseStudies={caseStudies} />
      <HowItWorks />
      <FinalCTA />
    </>
  )
}
