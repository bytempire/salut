import { useEffect, useState } from 'react'
import { PROMO_SLIDES, img } from '../data/site'

interface PromoCarouselProps {
  onSelectCategory?: (path: string) => void
}

export default function PromoCarousel({ onSelectCategory }: PromoCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % PROMO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = PROMO_SLIDES[current]

  return (
    <div className="relative rounded-3xl overflow-hidden h-64 sm:h-80 mb-8 group">
      {PROMO_SLIDES.map((s, i) => (
        <div
          key={s.title}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={img(s.image)}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/60 to-transparent" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          {slide.title}
        </h3>
        <p className="text-slate-300 text-sm sm:text-base max-w-md mb-4">
          {slide.subtitle}
        </p>
        {slide.link && (
          <button
            type="button"
            onClick={() => onSelectCategory?.(slide.link!)}
            className="self-start px-5 py-2 rounded-xl bg-gold text-night text-sm font-semibold hover:bg-gold-dark transition-colors"
          >
            Перейти в каталог
          </button>
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {PROMO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-gold w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
