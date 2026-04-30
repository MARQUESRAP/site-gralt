import { createHmac, randomUUID, timingSafeEqual } from 'crypto'

export function normalizeWebsiteDomain(input: string | undefined | null): string | null {
  if (!input) return null
  try {
    const trimmed = input.trim()
    if (!trimmed) return null
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    const url = new URL(withProtocol)
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    if (!host.includes('.')) return null
    return host
  } catch {
    return null
  }
}

export function normalizeLinkedinSlug(input: string | undefined | null): string | null {
  if (!input) return null
  try {
    const trimmed = input.trim()
    if (!trimmed) return null
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    const url = new URL(withProtocol)
    if (!/linkedin\.com$/i.test(url.hostname.replace(/^www\./, ''))) return null
    const match = url.pathname.match(/^\/company\/([^/?#]+)/i)
    if (!match) return null
    return match[1].toLowerCase()
  } catch {
    return null
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(input: string | undefined | null): boolean {
  if (!input) return false
  return EMAIL_REGEX.test(input.trim())
}

export function signHermesPayload(payload: object, secret: string): string {
  const body = JSON.stringify(payload)
  return createHmac('sha256', secret).update(body).digest('hex')
}

export function generateRequestId(): string {
  return randomUUID()
}

export function verifyHermesSignature(
  rawBody: string,
  headerValue: string | null,
  secret: string
): boolean {
  if (!headerValue) return false
  const provided = headerValue.startsWith('sha256=') ? headerValue.slice(7) : headerValue
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex')
  if (provided.length !== expected.length) return false
  try {
    return timingSafeEqual(Buffer.from(provided, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}
