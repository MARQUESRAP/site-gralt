import type { Metadata } from 'next'
import RendezVousClient from './RendezVousClient'

export const metadata: Metadata = {
  title: 'Réserver un audit gratuit',
  description:
    'Réservez un audit gratuit de 30 minutes pour identifier les agents IA adaptés à votre entreprise.',
  alternates: { canonical: 'https://gralt.fr/rendez-vous' },
}

export default function RendezVousPage() {
  return <RendezVousClient />
}
