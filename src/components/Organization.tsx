import { img } from '../data/site'
import { SHOW_TYPES, FACTS, WORKS } from '../data/organization'
import OrganizationScheme from './OrganizationScheme'

export default function Organization() {
  return (
    <section id="services" className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Intro */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Организация <span className="gold-text">пиро-шоу</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Закажите организацию салютов и получите расчёт сметы{' '}
            <span className="text-gold font-semibold">бесплатно</span>
          </p>
        </div>

        {/* Show types */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-bold text-center mb-2">
            Составляющие <span className="gold-text">вашего шоу</span>
          </h3>
          <p className="text-slate-500 text-sm text-center mb-10">Выберите элементы для незабываемого праздника</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SHOW_TYPES.map((show, i) => (
              <div
                key={show.title}
                className="group glass rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-500"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  <img
                    src={img(show.image)}
                    alt={show.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 text-center">
                  <h4 className="font-semibold text-white text-sm">{show.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated scheme */}
        <div className="mb-20">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">
            Схема организации <span className="gold-text">вашего салюта</span>
          </h3>
          <OrganizationScheme />
        </div>

        {/* Facts */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-bold text-center mb-10">
            Только <span className="gold-text">факты</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACTS.map((fact, i) => (
              <div
                key={fact.text}
                className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-gold/20 border border-transparent transition-colors"
              >
                <div className="w-14 h-14 shrink-0 rounded-xl bg-white/5 p-2 overflow-hidden">
                  <img
                    src={img(fact.image)}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-gold text-xs font-bold">0{i + 1}</span>
                  <p className="text-sm text-slate-300 leading-relaxed mt-1">{fact.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Works / videos */}
        <div>
          <h3 className="font-display text-2xl font-bold text-center mb-10">
            Наши <span className="gold-text">работы</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {WORKS.map((work) => (
              <div key={work.id} className="glass rounded-2xl overflow-hidden group">
                <div className="aspect-video relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${work.id}`}
                    title={work.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white text-sm mb-1">{work.title}</h4>
                  <p className="text-xs text-slate-400">{work.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#consultation"
              className="inline-flex px-8 py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-dark text-night font-bold hover:shadow-xl hover:shadow-gold/25 transition-all"
            >
              Заказать организацию салюта
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
