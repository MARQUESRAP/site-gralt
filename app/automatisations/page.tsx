import type { Metadata } from 'next'
import AutomatisationsClient from './AutomatisationsClient'

export const metadata: Metadata = {
  title: "Nos automatisations — Toutes les tâches qu'on automatise pour les PME",
  description:
    "Prospection, marketing, admin, RH, opérations : voici toutes les tâches répétitives que Gralt automatise pour les PME françaises. Sur mesure, sans jargon, mesurable.",
  alternates: { canonical: 'https://gralt.fr/automatisations' },
}

export default function AutomatisationsPage() {
  return <AutomatisationsClient />
}
