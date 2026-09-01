import { CATEGORIES, img } from '../data/site'

interface CategoriesProps {
  activeCategory: string | null
  onSelectCategory: (path: string | null) => void
}

export default function Categories({ activeCategory, onSelectCategory }: CategoriesProps) {
  const handleClick = (path: string) => {
    if (activeCategory === path) {
      onSelectCategory(null)
    } else {
      onSelectCategory(path)
    }
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="catalog" className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Мы <span className="gold-text">предлагаем</span>
          </h2>
          <p className="text-slate-400">Более 110 видов пиротехнической продукции</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.path
            return (
              <button
                key={cat.path}
                type="button"
                onClick={() => handleClick(cat.path)}
                className={`group glass rounded-2xl overflow-hidden text-left bg-gradient-to-br ${cat.color} hover:scale-[1.03] transition-all duration-300 ${
                  isActive ? 'ring-2 ring-gold scale-[1.03]' : ''
                }`}
              >
                <div className="aspect-[4/3] bg-white/5 p-3 overflow-hidden">
                  <img
                    src={img(cat.image)}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm mb-1">{cat.name}</h3>
                  <span className="text-xs text-slate-400">{cat.count} товаров</span>
                </div>
              </button>
            )
          })}
        </div>

        {activeCategory && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => onSelectCategory(null)}
              className="text-sm text-slate-400 hover:text-gold transition-colors underline"
            >
              Показать все товары
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
