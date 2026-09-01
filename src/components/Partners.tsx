import { PARTNERS, img } from '../data/site'

export default function Partners() {
  return (
    <section className="relative z-10 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center mb-10">
          Наши <span className="gold-text">партнёры</span>
        </h2>

        <div className="relative">
          <div className="flex gap-6 animate-marquee items-center">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 glass rounded-xl px-6 py-4 flex items-center gap-3"
              >
                <img
                  src={img(partner.logo)}
                  alt={partner.name}
                  loading="lazy"
                  className="h-10 w-auto object-contain brightness-90"
                />
                <span className="text-sm text-slate-300 whitespace-nowrap hidden sm:inline">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  )
}
