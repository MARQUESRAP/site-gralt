'use client'

import Image from 'next/image'
import Link from 'next/link'

const GREEN = '#11241B'

/**
 * Home page rendered as the AI-generated mockup image (public/home-mockup.png)
 * with clickable hotspots overlaid on top of the interactive zones (CTAs,
 * nav links, etc).
 *
 * Coordinates are expressed in percent of the image bounding box so that
 * hotspots scale correctly whatever the rendered width.
 *
 * Image native dimensions: 772 × 2036 px.
 * Hotspots are positioned by visual inspection of the mockup and can be
 * adjusted easily by editing the HOTSPOTS array below.
 */

type Hotspot = {
  id: string
  // % of image width/height
  left: number
  top: number
  width: number
  height: number
  href: string
  label: string  // for accessibility / debug
  external?: boolean
}

const IMG_W = 772
const IMG_H = 2036

// Helper: convert pixel coords (relative to native 772x2036 image) to %.
function pct(xPx: number, yPx: number, wPx: number, hPx: number) {
  return {
    left: (xPx / IMG_W) * 100,
    top: (yPx / IMG_H) * 100,
    width: (wPx / IMG_W) * 100,
    height: (hPx / IMG_H) * 100,
  }
}

const HOTSPOTS: Hotspot[] = [
  // ─── Header ──────────────────────────────────────────────────────────────
  { id: 'header-logo', ...pct(15, 8, 80, 28), href: '/', label: 'GRÄLT logo' },
  { id: 'nav-solutions', ...pct(175, 12, 55, 22), href: '#solutions', label: 'Solutions' },
  { id: 'nav-methode',   ...pct(238, 12, 55, 22), href: '#methode', label: 'Méthode' },
  { id: 'nav-cas',       ...pct(298, 12, 75, 22), href: '/travaux', label: 'Cas clients' },
  { id: 'nav-ressources',...pct(380, 12, 70, 22), href: '/blog', label: 'Ressources' },
  { id: 'header-cta',    ...pct(625, 8, 130, 28), href: '/rendez-vous', label: 'Audit gratuit (header)' },

  // ─── Hero CTAs ───────────────────────────────────────────────────────────
  { id: 'hero-cta-primary',   ...pct(15, 222, 195, 38), href: '/rendez-vous', label: 'Réserver un audit gratuit (hero)' },
  { id: 'hero-cta-secondary', ...pct(217, 222, 135, 38), href: '/travaux', label: 'Voir un exemple' },

  // ─── Cas clients section : "Voir toutes les réalisations" ────────────────
  { id: 'cas-clients-cta', ...pct(280, 1430, 220, 38), href: '/travaux', label: 'Voir toutes les réalisations' },

  // ─── BFM interview : "Voir l'interview" ──────────────────────────────────
  { id: 'bfm-cta', ...pct(50, 1640, 170, 38), href: '/travaux', label: 'Voir l\'interview BFM' },

  // ─── Final CTA "Réserver un audit gratuit" ───────────────────────────────
  { id: 'final-cta', ...pct(220, 1810, 250, 42), href: '/rendez-vous', label: 'Réserver un audit gratuit (final)' },

  // ─── Footer columns (broad zones — refined later) ────────────────────────
  { id: 'footer-travaux', ...pct(170, 1940, 120, 16), href: '/travaux', label: 'Footer: Travaux' },
  { id: 'footer-audit',   ...pct(170, 1960, 120, 16), href: '/rendez-vous', label: 'Footer: Audit' },
  { id: 'footer-blog',    ...pct(170, 1980, 120, 16), href: '/blog', label: 'Footer: Blog' },
  { id: 'footer-apropos', ...pct(170, 2000, 120, 16), href: '/a-propos', label: 'Footer: À propos' },
]

function HotspotLink({ spot }: { spot: Hotspot }) {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${spot.left}%`,
    top: `${spot.top}%`,
    width: `${spot.width}%`,
    height: `${spot.height}%`,
    cursor: 'pointer',
    // Uncomment the next line to debug hotspot positions:
    // background: 'rgba(255, 0, 0, 0.25)',
  }

  const sharedProps = {
    'aria-label': spot.label,
    style,
    className: 'block rounded-md transition-colors hover:bg-white/5',
  }

  if (spot.external) {
    return (
      <a
        href={spot.href}
        target="_blank"
        rel="noopener noreferrer"
        {...sharedProps}
      />
    )
  }

  return <Link href={spot.href} {...sharedProps} />
}

export default function HomeClient() {
  return (
    <div
      className="-mt-[72px] min-h-screen w-full"
      style={{ background: GREEN }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: 1024 }}>
        <div className="relative">
          <Image
            src="/home-mockup.png"
            alt="Gralt — page d'accueil"
            width={IMG_W}
            height={IMG_H}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="block h-auto w-full select-none"
          />

          {HOTSPOTS.map((spot) => (
            <HotspotLink key={spot.id} spot={spot} />
          ))}
        </div>
      </div>
    </div>
  )
}
