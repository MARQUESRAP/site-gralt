import Link from 'next/link'
import Image from 'next/image'

const sections = [
  { name: 'Prospection & Vente', slug: 'prospection-vente' },
  { name: 'Marketing & Contenu', slug: 'marketing-contenu' },
  { name: 'Support & Relation Client', slug: 'support-relation-client' },
  { name: 'RH', slug: 'rh-recrutement' },
  { name: 'Admin & Finance', slug: 'admin-finance' },
  { name: 'Analytics', slug: 'analyse-pilotage' },
]

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image src="/logo.webp" alt="Gralt" width={120} height={40} className="h-9 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-text-secondary">
              Agents IA sur mesure pour les entreprises en croissance.
            </p>
            <a
              href="mailto:raphael@gralt.fr"
              className="mt-2 inline-block text-sm text-text-secondary transition-colors hover:text-accent"
            >
              raphael@gralt.fr
            </a>
          </div>

          {/* Agents */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-text-primary">Agents</h3>
            <ul className="flex flex-col gap-2">
              {sections.map((section) => (
                <li key={section.slug}>
                  <Link
                    href={`/agents/${section.slug}`}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-text-primary">Découvrir</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/travaux"
                  className="text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  Travaux Réalisés
                </Link>
              </li>
              <li>
                <Link
                  href="/sur-mesure"
                  className="text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  Sur-Mesure
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/rendez-vous"
                  className="text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  Réserver un audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-text-primary">Légal</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-dark-border pt-8 text-center text-sm text-text-secondary">
          © {new Date().getFullYear()} Gralt. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
