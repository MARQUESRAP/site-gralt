import type { Metadata } from 'next'
import SelectionPageClient from './SelectionPageClient'

export const metadata: Metadata = {
  title: 'Ma sélection — Gralt',
  description: 'Récapitulatif de vos agents IA sélectionnés avec comparatif ROI.',
}

export default function SelectionPage() {
  return <SelectionPageClient />
}
