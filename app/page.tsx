import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Gralt — Récupérez 5 à 30 heures par semaine grâce à l\'automatisation',
  description:
    "Nous automatisons les tâches répétitives des PME pour que les dirigeants se concentrent sur la croissance. Audit gratuit de 30 minutes pour identifier ce que vous pouvez automatiser.",
  alternates: { canonical: 'https://gralt.fr' },
}

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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeClient />
    </>
  )
}
