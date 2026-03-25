import type { Metadata } from 'next'
import AProposClient from './AProposClient'

export const metadata: Metadata = {
  title: 'À propos — Gralt',
  description:
    'Raphaël, fondateur de Gralt : parcours, convictions et équipe de 31 agents IA pour entreprises en croissance. L\'IA libère, elle ne remplace pas.',
}

export default function AProposPage() {
  return <AProposClient />
}
