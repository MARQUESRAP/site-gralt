import ShimmerEffect from './ShimmerEffect'

interface AgentPlaceholderProps {
  name: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  isGolden?: boolean
}

const sizeConfig = {
  sm: { circle: 'h-16 w-16', text: 'text-xs', icon: 'text-lg' },
  md: { circle: 'h-24 w-24', text: 'text-sm', icon: 'text-2xl' },
  lg: { circle: 'h-36 w-36', text: 'text-base', icon: 'text-4xl' },
}

export default function AgentPlaceholder({
  name,
  color,
  size = 'md',
  isGolden = false,
}: AgentPlaceholderProps) {
  const displayColor = isGolden ? '#F5C842' : color
  const config = sizeConfig[size]

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative ${config.circle} rounded-full flex items-center justify-center overflow-hidden`}
        style={{
          background: `${displayColor}1A`,
          border: `2px solid ${displayColor}`,
          boxShadow: `0 0 20px ${displayColor}4D, 0 0 40px ${displayColor}1A`,
        }}
      >
        {/* Silhouette icon */}
        <span className={`${config.icon} opacity-40`}>👤</span>
        {isGolden && <ShimmerEffect />}
      </div>
      <span
        className={`${config.text} font-medium`}
        style={{
          color: displayColor,
          textShadow: `0 0 8px ${displayColor}4D`,
        }}
      >
        {name}
      </span>
    </div>
  )
}
