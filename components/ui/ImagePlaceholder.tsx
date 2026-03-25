interface ImagePlaceholderProps {
  width: number | string
  height: number | string
  label: string
  color?: string
  className?: string
}

export default function ImagePlaceholder({
  width,
  height,
  label,
  color = '#00E5CC',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl overflow-hidden ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        background: 'rgba(19, 24, 41, 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: `2px dashed ${color}4D`,
      }}
    >
      {/* Image icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-text-secondary opacity-40"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span className="px-4 text-center text-xs text-text-secondary">
        {label}
      </span>
    </div>
  )
}
