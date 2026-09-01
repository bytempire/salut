export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎆</span>
            <div>
              <div className="font-display font-bold text-sm gold-text">
                Фейерверки на Грибоедова
              </div>
              <div className="text-[10px] text-slate-500">Работаем с 2005 года</div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-gold transition-colors">Главная</a>
            <a href="#catalog" className="hover:text-gold transition-colors">Каталог</a>
            <a href="#services" className="hover:text-gold transition-colors">Организация салютов</a>
            <a href="#contacts" className="hover:text-gold transition-colors">Контакты</a>
          </nav>
        </div>

        <div className="text-center text-xs text-slate-600 leading-relaxed">
          <p>Интернет-магазин «Фейерверки на Грибоедова» © Copyright 2024–2026</p>
          <p className="mt-1">
            Информация на сайте является предметом авторского права
          </p>
        </div>
      </div>
    </footer>
  )
}
