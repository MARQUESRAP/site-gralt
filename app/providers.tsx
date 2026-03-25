'use client'

import { SectionProvider } from '@/lib/SectionContext'
import { SelectionProvider } from '@/lib/SelectionContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SectionProvider>
      <SelectionProvider>{children}</SelectionProvider>
    </SectionProvider>
  )
}
