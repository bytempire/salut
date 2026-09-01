const TIERS = [
  { amount: '2 000', discount: '−2%' },
  { amount: '5 000', discount: '−5%' },
  { amount: '15 000', discount: '−10%' },
  { amount: '25 000', discount: '−15%' },
  { amount: '50 000+', discount: '−20%' },
]

export default function Discounts() {
  return (
    <section id="discounts" className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Обратите внимание на <span className="gold-text">скидки</span>
          </h2>
          <p className="text-slate-400 mb-8">Накопительная система для постоянных клиентов</p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
            {TIERS.map((tier) => (
              <div
                key={tier.amount}
                className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-gold/30 transition-colors"
              >
                <div className="text-2xl font-bold gold-text mb-1">{tier.discount}</div>
                <div className="text-xs text-slate-400">от {tier.amount} ₽</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-400">
            Постоянным клиентам выдаются дисконтные накопительные карты
          </p>
        </div>
      </div>
    </section>
  )
}
