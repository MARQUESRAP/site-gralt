import { getSections, getDetailedCaseStudies } from '@/lib/data'
import HeroSection from '@/components/sections/home/HeroSection'
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
      <HeroSection />
      <SectionsGrid sections={sectionCards} />
      <SocialProof />
      <CaseStudiesPreview caseStudies={caseStudies} />
      <HowItWorks />
      <FinalCTA />
    </>
  )
}
