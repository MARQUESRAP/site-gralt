import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://gralt.fr'),
  title: {
    default: 'Gralt — 31 agents IA au service de votre entreprise',
    template: '%s | Gralt',
  },
  description:
    'Découvrez 31 agents IA spécialisés en prospection, marketing, support client, recrutement, admin et pilotage. Des agents sur mesure qui travaillent pour votre entreprise 24h/24.',
  openGraph: {
    title: 'Gralt — 31 agents IA au service de votre entreprise',
    description:
      'Découvrez 31 agents IA spécialisés en prospection, marketing, support client, recrutement, admin et pilotage.',
    url: 'https://gralt.fr',
    siteName: 'Gralt',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gralt — Agents IA au service de votre entreprise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gralt — 31 agents IA au service de votre entreprise',
    description:
      'Découvrez 31 agents IA spécialisés en prospection, marketing, support client, recrutement, admin et pilotage.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon-512.png',
  },
  alternates: {
    canonical: 'https://gralt.fr',
  },
}

// JSON-LD structured data (global)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://gralt.fr/#organization',
      name: 'Gralt',
      url: 'https://gralt.fr',
      logo: 'https://gralt.fr/logo.png',
      description: 'Agents IA sur mesure pour les entreprises en croissance',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lille',
        addressRegion: 'Hauts-de-France',
        addressCountry: 'FR',
      },
      sameAs: ['https://www.linkedin.com/company/gralt'],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://gralt.fr/#localbusiness',
      name: 'Gralt',
      url: 'https://gralt.fr',
      description: 'Agents IA sur mesure pour les entreprises en croissance',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lille',
        addressRegion: 'Hauts-de-France',
        addressCountry: 'FR',
      },
      areaServed: 'France',
      priceRange: '€€',
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
        <Script src="/gralt-tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
