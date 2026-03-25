interface SectionBackgroundProps {
  color: string
  secondaryColor?: string
}

export default function SectionBackground({
  color,
  secondaryColor,
}: SectionBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Primary orb - top right */}
      <div
        className="absolute -top-[250px] -right-[250px] h-[800px] w-[800px] animate-float-slow will-change-transform"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      {/* Secondary orb - bottom left */}
      <div
        className="absolute -bottom-[200px] -left-[200px] h-[700px] w-[700px] animate-float-slower will-change-transform"
        style={{
          background: `radial-gradient(circle, ${secondaryColor || color}33, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      {/* Small accent orb - center */}
      <div
        className="absolute top-1/2 left-1/3 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 animate-float-slow will-change-transform"
        style={{
          background: `radial-gradient(circle, ${color}1A, transparent 70%)`,
          filter: 'blur(60px)',
          animationDelay: '-5s',
        }}
      />
    </div>
  )
}
