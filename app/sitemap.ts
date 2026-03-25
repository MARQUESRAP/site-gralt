import type { MetadataRoute } from 'next'
import { getSections, getAgentsBySection, getDetailedCaseStudies } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gralt.fr'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/sur-mesure`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/travaux`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/rendez-vous`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/ma-selection`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/politique-de-confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/cgv`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Section pages
  const sectionPages: MetadataRoute.Sitemap = getSections().map((s) => ({
    url: `${baseUrl}/agents/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Agent pages
  const agentPages: MetadataRoute.Sitemap = getSections().flatMap((s) =>
    getAgentsBySection(s.slug).map((a) => ({
      url: `${baseUrl}/agents/${s.slug}/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  // Case study pages
  const caseStudyPages: MetadataRoute.Sitemap = getDetailedCaseStudies().map((cs) => ({
    url: `${baseUrl}/travaux/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...sectionPages, ...agentPages, ...caseStudyPages]
}
