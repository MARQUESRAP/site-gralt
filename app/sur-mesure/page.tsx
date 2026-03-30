import type { Metadata } from 'next'
import SurMesureClient from './SurMesureClient'

export const metadata: Metadata = {
  title: 'Sur-Mesure',
  description:
    'Un besoin spécifique ? Notre concierge IA vous aide à trouver la solution adaptée.',
  alternates: { canonical: 'https://gralt.fr/sur-mesure' },
}

export default function SurMesurePage() {
  return <SurMesureClient />
}
