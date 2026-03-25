interface NeonTextProps {
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  children: React.ReactNode
  className?: string
}

const sizeClasses = {
  sm: 'text-lg font-medium',
  md: 'text-2xl font-bold',
  lg: 'text-4xl font-bold',
  xl: 'text-5xl md:text-6xl font-bold',
}

export default function NeonText({
  color = '#00E5CC',
  size = 'md',
  as: Tag = 'h2',
  children,
  className = '',
}: NeonTextProps) {
  return (
    <Tag
      className={`${sizeClasses[size]} ${className}`}
      style={{
        color,
        textShadow: `0 0 10px ${color}80, 0 0 30px ${color}33`,
      }}
    >
      {children}
    </Tag>
  )
}
