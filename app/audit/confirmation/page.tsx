import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Audit en préparation',
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: Promise<{ email?: string }>
}

export default async function ConfirmationPage({ searchParams }: PageProps) {
  const params = await searchParams
  const rawEmail = params?.email
  const email = typeof rawEmail === 'string' && rawEmail.includes('@') ? rawEmail : null

  return (
    <main className="relative min-h-screen overflow-hidden bg-dark-bg pb-24 pt-12 sm:pt-20">
      <BackgroundGlow />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-12 px-6 sm:px-8">
        <Header />

        <section className="flex flex-col gap-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Dossier en préparation
          </p>

          <h1 className="font-sans text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
            Votre audit arrive dans{' '}
            <span className="text-accent">10 minutes</span>
            {email ? (
              <>
                {' '}sur{' '}
                <span className="break-all text-text-primary">{email}</span>.
              </>
            ) : (
              <> par email.</>
            )}
          </h1>

          <p className="max-w-[58ch] text-base leading-[1.65] text-text-primary/85 sm:text-[17px]">
            Notre agent analyse votre site et votre page LinkedIn, croise les signaux avec une base
            de 314 cas d'automatisation similaires, et vous livre un PDF brandé à vos couleurs avec
            3 process automatisables prioritaires, chiffrés en heures gagnées par semaine.
          </p>

          <p className="max-w-[58ch] text-sm leading-relaxed text-text-secondary">
            Pendant ce temps, ouvrez votre boîte mail. Si vous ne voyez rien arriver, vérifiez le
            dossier spam ou écrivez directement à{' '}
            <a
              href="mailto:raphael@gralt.fr"
              className="text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              raphael@gralt.fr
            </a>
            .
          </p>
        </section>

        <section
          aria-label="Pendant l'attente"
          className="rounded-2xl border border-dark-border bg-dark-card/60 p-6 backdrop-blur-[12px] sm:p-7"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Pendant que ça tourne
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-text-primary">
            Suivez Raphaël sur LinkedIn pour la suite.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Cas clients, retours d'expérience automatisation IA, et coulisses de l'agence.
          </p>
          <a
            href="https://www.linkedin.com/in/raphaelmarques/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-accent/40 px-5 py-3 text-sm font-semibold text-text-primary transition-[border-color,box-shadow,transform] duration-200 hover:scale-[1.02] hover:border-accent hover:shadow-[0_0_25px_rgba(0,229,204,0.20),0_0_50px_rgba(0,229,204,0.10)]"
          >
            <span>Suivre Raphaël</span>
            <span aria-hidden className="text-base leading-none">→</span>
          </a>
        </section>
      </div>
    </main>
  )
}

function Header() {
  return (
    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-text-secondary">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-primary transition-colors hover:text-accent"
        aria-label="Retour à la page d'accueil Gralt"
      >
        <span aria-hidden className="text-base leading-none">←</span>
        <span className="font-semibold tracking-[0.04em] normal-case">Gralt</span>
      </Link>
      <span>Audit IA</span>
    </div>
  )
}

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(0, 229, 204, 0.55), rgba(0, 229, 204, 0))',
        }}
      />
    </div>
  )
}
