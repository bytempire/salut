import { TEAM, img } from '../data/site'

export default function Team() {
  return (
    <section id="team" className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Наша <span className="gold-text">команда</span>
          </h2>
          <p className="text-slate-400">Профессионалы с опытом более 10 лет</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <div className="aspect-[3/4] overflow-hidden bg-white/5">
                <img
                  src={img(member.photo)}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white text-sm mb-1">
                  {member.name}
                </h3>
                <p className="text-gold text-xs mb-2">{member.role}</p>
                <p className="text-xs text-slate-400 mb-3">{member.phone}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
