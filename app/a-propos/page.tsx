import type { Metadata } from 'next'
import AProposClient from './AProposClient'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Gralt, cabinet IA et automatisation basé à Lille. Des agents IA pour les entreprises en croissance.',
  alternates: { canonical: 'https://gralt.fr/a-propos' },
}

export default function AProposPage() {
  return <AProposClient />
}
