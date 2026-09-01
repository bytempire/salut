import PromoCarousel from './PromoCarousel'

interface HeroProps {
  onSelectCategory?: (path: string) => void
}

export default function Hero({ onSelectCategory }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4">
      <div className="relative z-10 max-w-5xl mx-auto w-full animate-fade-up">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-sm text-slate-300">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Работаем с 2005 года · Рязань и область
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-center">
          <span className="gold-text">Салюты</span> и фейерверки
          <br />
          <span className="text-white">для вашего праздника</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-center">
          Продажа и организация праздничных салютов любой сложности.
          Лицензированная пиротехника от ведущих производителей России.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href="#catalog"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-dark text-night font-bold text-lg hover:shadow-xl hover:shadow-gold/25 transition-all hover:scale-105 text-center"
          >
            Смотреть каталог
          </a>
          <a
            href="#consultation"
            className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all text-center"
          >
            Бесплатная консультация
          </a>
        </div>

        <PromoCarousel onSelectCategory={onSelectCategory} />
      </div>
    </section>
  )
}
