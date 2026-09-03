import { useState } from 'react'
import { IconFirework } from './Icons'

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="consultation" className="relative z-10 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold mb-3">
              Нужна <span className="gold-text">консультация</span>?
            </h2>
            <p className="text-slate-400">
              Не знаете, какой салют выбрать? Наши специалисты помогут бесплатно
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="mb-4 flex justify-center text-gold">
                <IconFirework size={48} />
              </div>
              <p className="text-xl font-semibold text-white">Спасибо за обращение!</p>
              <p className="text-slate-400 mt-2">Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <textarea
                placeholder="Опишите ваш праздник или задайте вопрос"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-night font-bold text-lg hover:shadow-xl hover:shadow-gold/25 transition-all"
              >
                Отправить
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
