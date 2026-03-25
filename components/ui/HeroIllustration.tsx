import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export default function HeroIllustration() {
  return (
    <div className="animate-float-slow w-full max-w-[350px] lg:max-w-[500px]">
      <ImagePlaceholder
        width="100%"
        height="100%"
        label="Illustration Hero — Bureau futuriste avec agents"
        color="#00E5CC"
        className="aspect-[5/6]"
      />
    </div>
  )
}
