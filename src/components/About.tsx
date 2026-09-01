const FEATURES = [
  'Официальные представители «Фейерверк-Мастер» и «Премьер-Салют»',
  'Вся продукция сертифицирована и лицензирована',
  'Более 200 профессиональных салютов на городских праздниках',
  'Пиротехническая поддержка Эстафеты Олимпийского огня 2014',
  'Более 1000 фейерверков для частных лиц',
  'Гибкая накопительная система скидок до 20%',
  'Видеодемонстрация всей пиротехнической продукции',
  'Доставка в большинство российских регионов',
]

const LOCATIONS = [
  'г. Рязань, ул. Грибоедова, 8',
  'г. Рязань, Московское шоссе, 5а (парковка ТД «Барс»)',
  'г. Рязань, Борки, 12-ый район (парковка ТЦ «Солнечный»)',
]

export default function About() {
  return (
    <section id="about" className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-center">
            О компании <span className="gold-text">«Фейерверки на Грибоедова»</span>
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            Плодотворно работая с 2005 года, мы зарекомендовали себя как поставщики
            качественной пиротехники и опытные организаторы салютов любого уровня сложности
            по доступным ценам в Рязани, Москве и близлежащих регионах.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-start gap-3 text-sm">
                <span className="text-gold mt-0.5">✦</span>
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          <div id="services" className="border-t border-white/10 pt-8">
            <h3 className="font-semibold text-white mb-4 text-center">
              Только безопасная сделка
            </h3>
            <p className="text-sm text-slate-400 text-center mb-6">
              Безопасность и моральное удовлетворение заказчика — наш приоритет
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contacts() {
  return (
    <section id="contacts" className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">📞 Телефоны</h3>
            <a href="tel:+74912990078" className="block text-gold hover:underline mb-1">
              +7 (4912) 99-00-78
            </a>
            <a href="tel:+79209751632" className="block text-gold hover:underline">
              +7 (920) 975-16-32
            </a>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">📍 Адреса магазинов</h3>
            {LOCATIONS.map((loc) => (
              <p key={loc} className="text-sm text-slate-400 mb-2">{loc}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
