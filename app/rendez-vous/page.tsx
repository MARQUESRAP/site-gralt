import type { Metadata } from 'next'
import RendezVousClient from './RendezVousClient'

export const metadata: Metadata = {
  title: 'Réserver un audit gratuit — Gralt',
  description:
    'Réservez un audit gratuit de 30 minutes en visio pour discuter de vos besoins en agents IA.',
}

export default function RendezVousPage() {
  return <RendezVousClient />
}
