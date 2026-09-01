import { useState } from 'react'

const NAV_LINKS = [
  { href: '#catalog', label: 'Каталог' },
  { href: '#discounts', label: 'Скидки' },
  { href: '#services', label: 'Организация салютов' },
  { href: '#team', label: 'Команда' },
  { href: '#about', label: 'О компании' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass mx-4 mt-4 rounded-2xl px-6 py-3 flex items-center justify-between max-w-7xl lg:mx-auto">
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl">🎆</span>
          <div>
            <div className="font-display font-bold text-sm leading-tight gold-text">
              Фейерверки на Грибоедова
            </div>
            <div className="text-[10px] text-slate-400 tracking-wider uppercase">
              с 2005 года
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+74912990078"
            className="text-sm font-medium text-gold hover:text-gold-dark transition-colors"
          >
            +7 (4912) 99-00-78
          </a>
          <a
            href="#consultation"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-night text-sm font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all"
          >
            Заказать салют
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-slate-300"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass mx-4 mt-2 rounded-2xl p-4 animate-fade-up">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-slate-300 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+74912990078"
            className="block py-2 text-gold font-medium"
          >
            +7 (4912) 99-00-78
          </a>
        </div>
      )}
    </header>
  )
}
