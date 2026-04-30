interface AuditMailParams {
  recipientEmail: string
  companyName: string | null
  calLink?: string
}

const DEFAULT_CAL = 'https://cal.com/raphael-gralt/30min'

export function buildAuditMail({ companyName, calLink = DEFAULT_CAL }: AuditMailParams) {
  const company = companyName?.trim() || 'votre entreprise'
  const subject = `Votre audit IA — ${company}`

  const text = `Bonjour,

Voici l'audit IA de ${company}, en pièce jointe.

Ce qu'il contient :
- 3 frictions concrètes détectées dans votre activité
- Pour chaque friction, le temps gagné potentiel et un cas client comparable
- Des leviers IA actionnables, pas du conseil générique

C'est un diagnostic préalable, basé sur les données publiques. La précision se fait au téléphone.

Si l'analyse vous parle, on peut en discuter 30 minutes :
${calLink}

À vous lire,
Raphaël Marques
Fondateur, Gralt
raphael@gralt.fr
`

  const html = `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background:#0A0E1A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;color:#E8EAED;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0A0E1A;padding:48px 24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#0F1424;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:40px 36px;">
            <tr>
              <td style="font-size:14px;color:#00E5CC;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;padding-bottom:24px;">
                Gralt &middot; Audit IA
              </td>
            </tr>
            <tr>
              <td style="font-size:22px;line-height:1.4;color:#FFFFFF;font-weight:600;padding-bottom:20px;">
                Votre audit IA de ${escapeHtml(company)} est prêt.
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:#C5C9D3;padding-bottom:18px;">
                Il est en pièce jointe. Voici ce qu'il contient :
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.8;color:#C5C9D3;padding-bottom:24px;">
                &mdash; 3 frictions concrètes détectées dans votre activité<br/>
                &mdash; Pour chaque friction, le temps gagné potentiel et un cas client comparable<br/>
                &mdash; Des leviers IA actionnables, pas du conseil générique
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.7;color:#8E94A3;padding-bottom:32px;font-style:italic;">
                C'est un diagnostic préalable, basé sur les données publiques. La précision se fait au téléphone.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:32px;">
                <a href="${calLink}" style="display:inline-block;background:#00E5CC;color:#0A0E1A;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:15px;letter-spacing:0.01em;">
                  Réserver 30 min &rarr;
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;line-height:1.6;color:#8E94A3;border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
                Raphaël Marques &middot; Fondateur Gralt<br/>
                <a href="mailto:raphael@gralt.fr" style="color:#00E5CC;text-decoration:none;">raphael@gralt.fr</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject, text, html }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
