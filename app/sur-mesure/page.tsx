import type { Metadata } from 'next'
import SurMesureClient from './SurMesureClient'

export const metadata: Metadata = {
  title: 'Sur-Mesure — Gralt',
  description:
    'Décrivez votre besoin à mon assistant IA. Il vous orientera vers les bons agents ou proposera une solution sur-mesure.',
}

export default function SurMesurePage() {
  return <SurMesureClient />
}
