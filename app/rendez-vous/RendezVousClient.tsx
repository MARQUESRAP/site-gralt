'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import NeonText from '@/components/ui/NeonText'
import SectionBackground from '@/components/ui/SectionBackground'
import CTAButton from '@/components/ui/CTAButton'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useSelection } from '@/lib/SelectionContext'

const employeeOptions = ['Moins de 20 employés', '20-50 employés', '50-200 employés', '200-500 employés', '500+ employés']

const sectorOptions = [
  'BTP / Artisanat',
  'Services B2B',
  'Commerce / Retail',
  'Immobilier',
  'Transport / Logistique',
  'Santé / Médical',
  'Industrie',
  'Cabinet comptable / juridique',
  'Restauration / Hôtellerie',
  'Formation / Éducation',
  'Autre',
]

const agentSectionOptions = [
  'Prospection & Vente',
  'Marketing & Contenu',
  'Support & Relation Client',
  'RH',
  'Admin & Finance',
  'Analytics',
  'Je ne sais pas encore',
]

function RendezVousForm() {
  const searchParams = useSearchParams()
  const prefilledSections = searchParams.get('sections')?.split(',') || []
  const { selectedAgents } = useSelection()

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: '',
    company: '',
    website: '',
    employees: '',
    sector: '',
    agentsInterested: prefilledSections,
    need: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSectionToggle = (section: string) => {
    setForm((prev) => {
      const next = prev.agentsInterested.includes(section)
        ? prev.agentsInterested.filter((s) => s !== section)
        : [...prev.agentsInterested, section]
      return { ...prev, agentsInterested: next }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/form-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          website: form.website,
          employees: form.employees,
          sector: form.sector,
          agentsInterested: form.agentsInterested,
          selectedAgents: selectedAgents.map((a) => a.name),
          need: form.need,
        }),
      })

      if (!response.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      alert('Une erreur est survenue. Veuillez réessayer ou me contacter directement à raphael@gralt.fr')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="relative min-h-screen">
        <SectionBackground color="#00E5CC" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <div className="mb-4 text-5xl">✓</div>
              <NeonText as="h1" size="lg" className="mb-4">
                Merci {form.name.split(' ')[0]} !
              </NeonText>
              <p className="mx-auto max-w-md text-text-secondary">
                Vos informations ont bien été enregistrées. Choisissez maintenant
                un créneau pour votre audit gratuit de 30 minutes.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard color="#00E5CC" className="overflow-hidden p-0" hoverable={false}>
              <iframe
                src="https://cal.com/raphael-gralt/30min?embed=true&theme=dark"
                className="w-full border-0"
                style={{ height: '680px', colorScheme: 'dark' }}
                title="Réserver un audit gratuit"
              />
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl bg-[rgba(19,24,41,0.6)] backdrop-blur-[16px] border border-dark-border px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 transition-all duration-300 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(0,229,204,0.15)]'

  return (
    <div className="relative min-h-screen">
      <SectionBackground color="#00E5CC" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <NeonText as="h1" size="lg" className="mb-4">
              Avant de réserver, aidez-moi à préparer votre audit.
            </NeonText>
            <p className="text-text-secondary">
              Ces quelques questions me permettent d&apos;arriver à notre rendez-vous en
              ayant déjà compris votre contexte. L&apos;audit est 100% gratuit, en visio,
              et dure environ 30 minutes.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GlassCard color="#00E5CC" className="p-8" hoverable={false}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* 1. Prénom et nom */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Prénom et nom <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Jean Dupont"
                />
              </div>

              {/* 2. Nom de l'entreprise */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Nom de l&apos;entreprise <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Mon Entreprise SAS"
                />
              </div>

              {/* 3. Site web */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Site web
                </label>
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://monsite.fr"
                />
              </div>

              {/* 4. Nombre d'employés */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Nombre d&apos;employés <span className="text-accent">*</span>
                </label>
                <select
                  name="employees"
                  required
                  value={form.employees}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Sélectionner...</option>
                  {employeeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Secteur d'activité */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Secteur d&apos;activité <span className="text-accent">*</span>
                </label>
                <select
                  name="sector"
                  required
                  value={form.sector}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Sélectionner...</option>
                  {sectorOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 6. Agents qui vous intéressent */}
              <div>
                <label className="mb-3 block text-sm font-medium text-text-primary">
                  Agents qui vous intéressent
                </label>
                <div className="flex flex-wrap gap-2">
                  {agentSectionOptions.map((section) => {
                    const isActive = form.agentsInterested.includes(section)
                    return (
                      <button
                        key={section}
                        type="button"
                        onClick={() => handleSectionToggle(section)}
                        className={`rounded-lg border px-3 py-1.5 text-xs transition-all duration-200 ${
                          isActive
                            ? 'border-accent/50 bg-accent/10 text-accent'
                            : 'border-dark-border bg-transparent text-text-secondary hover:border-accent/30'
                        }`}
                      >
                        {section}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 7. Besoin principal */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Besoin principal en une phrase
                </label>
                <textarea
                  name="need"
                  rows={3}
                  value={form.need}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Ex : Je perds trop de temps à relancer mes devis manuellement"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <CTAButton pulse onClick={() => {}}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2"
                  >
                    {submitting ? 'Envoi en cours...' : 'Envoyer et réserver'}
                  </button>
                </CTAButton>
              </div>
            </form>
          </GlassCard>
        </ScrollReveal>

      </div>
    </div>
  )
}

// Wrap with Suspense for useSearchParams
export default function RendezVousClient() {
  return (
    <Suspense fallback={null}>
      <RendezVousForm />
    </Suspense>
  )
}
