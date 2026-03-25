'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const sections = [
  { name: 'Prospection & Vente', slug: 'prospection-vente', color: '#00E5CC' },
  { name: 'Marketing & Contenu', slug: 'marketing-contenu', color: '#B44AFF' },
  { name: 'Support & Relation Client', slug: 'support-relation-client', color: '#22C55E' },
  { name: 'RH', slug: 'rh-recrutement', color: '#FB923C' },
  { name: 'Admin & Finance', slug: 'admin-finance', color: '#818CF8' },
  { name: 'Analytics', slug: 'analyse-pilotage', color: '#F472B6' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [agentsDropdownOpen, setAgentsDropdownOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="fixed top-0 right-0 left-0 z-40"
      style={{
        background: 'rgba(10, 14, 26, 0.95)',
        borderBottom: '1px solid rgba(30, 36, 54, 0.6)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Gralt" width={240} height={72} className="h-14 w-auto -my-1" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Agents Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAgentsDropdownOpen(true)}
            onMouseLeave={() => setAgentsDropdownOpen(false)}
          >
            <button className="text-sm text-text-secondary transition-colors hover:text-text-primary">
              Agents
            </button>
            <AnimatePresence>
              {agentsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 rounded-xl p-2"
                  style={{
                    background: 'rgba(13, 17, 30, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 229, 204, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 229, 204, 0.08)',
                  }}
                >
                  {sections.map((section) => (
                    <Link
                      key={section.slug}
                      href={`/agents/${section.slug}`}
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-dark-border/30 hover:text-text-primary"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: section.color }}
                      />
                      {section.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/travaux"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Travaux Réalisés
          </Link>
          <Link
            href="/sur-mesure"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Sur-Mesure
          </Link>
          <Link
            href="/a-propos"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            À propos
          </Link>

          <Link
            href="/rendez-vous"
            className="rounded-xl bg-accent px-5 py-2 text-sm font-medium text-dark-bg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,204,0.4)]"
          >
            Réserver un audit
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <motion.span
            className="block h-0.5 w-6 bg-text-primary"
            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-text-primary"
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-text-primary"
            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-opaque overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">
                Agents
              </p>
              {sections.map((section) => (
                <Link
                  key={section.slug}
                  href={`/agents/${section.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: section.color }}
                  />
                  {section.name}
                </Link>
              ))}

              <div className="my-3 h-px bg-dark-border" />

              <Link
                href="/travaux"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary"
              >
                Travaux Réalisés
              </Link>
              <Link
                href="/sur-mesure"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary"
              >
                Sur-Mesure
              </Link>
              <Link
                href="/a-propos"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary"
              >
                À propos
              </Link>

              <div className="my-3 h-px bg-dark-border" />

              <Link
                href="/rendez-vous"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-accent px-5 py-2.5 text-center text-sm font-medium text-dark-bg"
              >
                Réserver un audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
