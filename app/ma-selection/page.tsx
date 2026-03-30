import type { Metadata } from 'next'
import SelectionPageClient from './SelectionPageClient'

export const metadata: Metadata = {
  title: 'Ma sélection',
  description: 'Récapitulatif de vos agents IA sélectionnés avec comparatif ROI.',
  alternates: { canonical: 'https://gralt.fr/ma-selection' },
}

export default function SelectionPage() {
  return <SelectionPageClient />
}
