'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import PageTransition from '@/components/layout/PageTransition'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return <PageTransition>{children}</PageTransition>
}
