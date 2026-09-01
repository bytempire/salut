import { useEffect, useMemo, useState } from 'react'
import { products, formatPrice } from '../data/products'
import { img } from '../data/site'
import type { Product } from '../types/product'

interface ProductGridProps {
  activeCategory: string | null
}

const PAGE_SIZE = 12

export default function ProductGrid({ activeCategory }: ProductGridProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    setPage(0)
  }, [activeCategory])

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory) {
      list = list.filter((p) => p.categoryPath === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }
    return list
  }, [activeCategory, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(0)
  }

  return (
    <section id="products" className="relative z-10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Каталог <span className="gold-text">товаров</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {filtered.length} {pluralize(filtered.length, 'товар', 'товара', 'товаров')}
              {activeCategory && ' в выбранной категории'}
            </p>
          </div>
          <input
            type="search"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/50 transition-colors text-sm"
          />
        </div>

        {visible.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-slate-400">
            Товары не найдены. Попробуйте другой запрос.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visible.map((product) => (
              <ProductCard key={`${product.url}-${product.name}`} product={product} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-xl glass text-sm disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              ← Назад
            </button>
            <span className="px-4 py-2 text-sm text-slate-400">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-xl glass text-sm disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              Далее →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const productUrl = product.url.replace(/&amp;/g, '&')

  return (
    <a
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
    >
      <div className="aspect-square bg-white/5 p-3 overflow-hidden">
        <img
          src={img(product.image)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-gold font-bold">{formatPrice(product.price)}</span>
          {product.shots && (
            <span className="text-[10px] text-slate-500">{product.shots} выстр.</span>
          )}
        </div>
        {product.duration && (
          <p className="text-[10px] text-slate-500 mt-1">{product.duration} сек.</p>
        )}
      </div>
    </a>
  )
}

function pluralize(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 19) return many
  if (mod10 === 1) return one
  if (mod10 >= 2 && mod10 <= 4) return few
  return many
}
