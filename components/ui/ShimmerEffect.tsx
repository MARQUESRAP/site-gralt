export default function ShimmerEffect() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(245,200,66,0.15) 40%, rgba(245,200,66,0.3) 50%, rgba(245,200,66,0.15) 60%, transparent 100%)',
        }}
      />
    </div>
  )
}
