'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface FieldErrors {
  website_url?: string
  linkedin_url?: string
  email?: string
  general?: string
}

const URL_REGEX = /^(https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}([/?#].*)?$/i
const LINKEDIN_REGEX = /^(https?:\/\/)?([a-z0-9-]+\.)?linkedin\.com\/company\/[^/?#\s]+/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name: keyof FieldErrors, value: string, hasOtherUrl = false): string | undefined {
  if (name === 'email') {
    if (!value.trim()) return 'Email requis.'
    if (!EMAIL_REGEX.test(value.trim())) return 'Format attendu : nom@entreprise.com'
    return undefined
  }
  if (name === 'website_url') {
    if (!value.trim()) return hasOtherUrl ? undefined : 'Site ou LinkedIn requis.'
    if (!URL_REGEX.test(value.trim())) return 'Format attendu : https://votreentreprise.com'
    return undefined
  }
  if (name === 'linkedin_url') {
    if (!value.trim()) return hasOtherUrl ? undefined : 'Site ou LinkedIn requis.'
    if (!LINKEDIN_REGEX.test(value.trim()))
      return 'Format attendu : linkedin.com/company/votre-entreprise'
    return undefined
  }
  return undefined
}

export default function AuditForm() {
  const router = useRouter()
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)

  function handleBlur(name: keyof FieldErrors) {
    const otherUrlPresent =
      (name === 'website_url' && linkedinUrl.trim().length > 0) ||
      (name === 'linkedin_url' && websiteUrl.trim().length > 0)
    const value = name === 'website_url' ? websiteUrl : name === 'linkedin_url' ? linkedinUrl : email
    const error = validateField(name, value, otherUrlPresent)
    setErrors((prev) => ({ ...prev, [name]: error, general: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    const websiteError = validateField('website_url', websiteUrl, linkedinUrl.trim().length > 0)
    const linkedinError = validateField('linkedin_url', linkedinUrl, websiteUrl.trim().length > 0)
    const emailError = validateField('email', email)
    const nextErrors: FieldErrors = {
      website_url: websiteError,
      linkedin_url: linkedinError,
      email: emailError,
    }
    setErrors(nextErrors)
    if (websiteError || linkedinError || emailError) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website_url: websiteUrl.trim() || null,
          linkedin_url: linkedinUrl.trim() || null,
          email: email.trim(),
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        const params = new URLSearchParams({ email: email.trim() })
        router.push(`/audit/confirmation?${params.toString()}`)
        return
      }

      if (response.status === 409) {
        setErrors({
          general:
            data?.message ??
            'Cette entreprise a deja fait son audit. Pour en relancer un, ecrivez a raphael@gralt.fr.',
        })
      } else if (response.status === 400) {
        const fieldKey = (data?.error as string | undefined)?.replace('invalid_', '').replace('missing_', '')
        if (fieldKey === 'email') {
          setErrors({ email: data.message })
        } else if (fieldKey === 'website_url') {
          setErrors({ website_url: data.message })
        } else if (fieldKey === 'linkedin_url') {
          setErrors({ linkedin_url: data.message })
        } else {
          setErrors({
            general:
              data?.message ?? 'Au moins une URL valide est requise (site ou LinkedIn).',
          })
        }
      } else {
        setErrors({
          general:
            data?.message ??
            'Notre agent est indisponible quelques instants. Reessayez dans 2-3 minutes ou ecrivez a raphael@gralt.fr.',
        })
      }
    } catch {
      setErrors({
        general:
          'Probleme de connexion. Verifiez votre reseau, puis reessayez. Si le souci persiste, ecrivez a raphael@gralt.fr.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {errors.general && (
        <div
          role="alert"
          className="rounded-xl border border-[#FB923C]/40 bg-[#FB923C]/10 px-4 py-3 text-sm text-[#FB923C]"
        >
          {errors.general}
        </div>
      )}

      <Field
        id="website_url"
        label="URL de votre site"
        helper="Laissez vide si vous n'en avez pas."
        type="url"
        placeholder="https://votreentreprise.com"
        value={websiteUrl}
        onChange={setWebsiteUrl}
        onBlur={() => handleBlur('website_url')}
        error={errors.website_url}
        autoComplete="url"
      />

      <Field
        id="linkedin_url"
        label="URL LinkedIn entreprise"
        helper="L'adresse de votre page d'entreprise, pas votre profil personnel."
        type="url"
        placeholder="linkedin.com/company/votre-entreprise"
        value={linkedinUrl}
        onChange={setLinkedinUrl}
        onBlur={() => handleBlur('linkedin_url')}
        error={errors.linkedin_url}
        autoComplete="off"
      />

      <Field
        id="email"
        label="Email"
        helper="C'est sur cet email que vous recevez le PDF dans 10 minutes."
        type="email"
        placeholder="vous@votreentreprise.com"
        value={email}
        onChange={setEmail}
        onBlur={() => handleBlur('email')}
        error={errors.email}
        autoComplete="email"
        required
      />

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={!submitting ? { scale: 1.02 } : undefined}
        whileTap={!submitting ? { scale: 0.98 } : undefined}
        animate={
          !submitting
            ? {
                boxShadow: [
                  '0 0 20px rgba(0, 229, 204, 0.30), 0 0 40px rgba(0, 229, 204, 0.10)',
                  '0 0 28px rgba(0, 229, 204, 0.38), 0 0 52px rgba(0, 229, 204, 0.16)',
                  '0 0 20px rgba(0, 229, 204, 0.30), 0 0 40px rgba(0, 229, 204, 0.10)',
                ],
              }
            : { boxShadow: '0 0 0 rgba(0, 229, 204, 0)' }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-semibold text-dark-bg transition-[opacity,filter] duration-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:saturate-50"
      >
        {submitting ? (
          <>
            <Spinner />
            <span>Génération en cours, ne fermez pas la page</span>
          </>
        ) : (
          <>
            <span>Lancer mon audit gratuit</span>
            <span aria-hidden className="text-lg leading-none">→</span>
          </>
        )}
      </motion.button>

      <p className="text-center text-xs uppercase tracking-[0.16em] text-text-secondary">
        Audit en 10 minutes · Aucun engagement · Vos données restent privées
      </p>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  helper: string
  type: string
  placeholder: string
  value: string
  onChange: (next: string) => void
  onBlur: () => void
  error?: string
  autoComplete?: string
  required?: boolean
}

function Field({
  id,
  label,
  helper,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  required,
}: FieldProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
        {label}
        {required && <span aria-hidden className="ml-1 text-accent">*</span>}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={type === 'email' ? 'email' : 'url'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : `${id}-helper`}
        className={`rounded-xl border bg-dark-card px-[18px] py-[14px] text-base text-text-primary placeholder:text-text-secondary/70 transition-[border-color,box-shadow] duration-200 focus:outline-none ${
          error
            ? 'border-[#FB923C]/70 focus:border-[#FB923C] focus:shadow-[0_0_0_3px_rgba(251,146,60,0.18)]'
            : 'border-dark-border focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,229,204,0.18)]'
        }`}
      />
      {error ? (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-xs leading-snug text-[#FB923C]"
        >
          {error}
        </span>
      ) : (
        <span id={`${id}-helper`} className="text-xs leading-snug text-text-secondary">
          {helper}
        </span>
      )}
    </label>
  )
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden
      className="animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M8 1.5a6.5 6.5 0 1 1-6.5 6.5" />
    </svg>
  )
}
