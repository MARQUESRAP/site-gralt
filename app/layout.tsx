import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingCounter from '@/components/ui/FloatingCounter'
import CursorFollower from '@/components/layout/CursorFollower'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Gralt — Agents IA pour entreprises en croissance',
    template: '%s — Gralt',
  },
  description:
    'Marketplace d\'agents IA personnalisés pour entreprises en croissance. Prospection, marketing, support, RH, admin, pilotage — 31 agents prêts à transformer votre entreprise.',
  metadataBase: new URL('https://gralt.fr'),
  openGraph: {
    title: 'Gralt — Agents IA pour entreprises en croissance',
    description:
      'Des agents IA sur mesure qui travaillent pour votre entreprise 24h/24.',
    siteName: 'Gralt',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://gralt.fr',
  },
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://gralt.fr/#organization',
      name: 'Gralt',
      url: 'https://gralt.fr',
      description: 'Agence d\'automatisation IA pour entreprises en croissance',
      foundingDate: '2025',
      founder: {
        '@type': 'Person',
        name: 'Raphaël Marques',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://gralt.fr/#localbusiness',
      name: 'Gralt',
      url: 'https://gralt.fr',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lille',
        addressRegion: 'Hauts-de-France',
        addressCountry: 'FR',
      },
      priceRange: '€€',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://gralt.fr/#website',
      url: 'https://gralt.fr',
      name: 'Gralt',
      publisher: { '@id': 'https://gralt.fr/#organization' },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-dark-bg text-text-primary antialiased">
        <Providers>
          <CursorFollower />
          <Header />
          <main className="pt-[72px]">{children}</main>
          <Footer />
          <FloatingCounter />
        </Providers>
      </body>
    </html>
  )
}
