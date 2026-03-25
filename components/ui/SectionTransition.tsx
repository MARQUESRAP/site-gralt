import Link from 'next/link'

interface SectionTransitionProps {
  nextSectionName: string
  nextSectionSlug: string
  nextColor: string
}

export default function SectionTransition({
  nextSectionName,
  nextSectionSlug,
  nextColor,
}: SectionTransitionProps) {
  return (
    <div className="mt-20 flex justify-center">
      <Link
        href={`/agents/${nextSectionSlug}`}
        className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-medium transition-all duration-300"
        style={{
          color: nextColor,
          border: `1px solid ${nextColor}33`,
          boxShadow: `0 0 15px ${nextColor}1A`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${nextColor}66`
          e.currentTarget.style.boxShadow = `0 0 25px ${nextColor}33`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${nextColor}33`
          e.currentTarget.style.boxShadow = `0 0 15px ${nextColor}1A`
        }}
      >
        <span>Découvrir {nextSectionName}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </div>
  )
}
