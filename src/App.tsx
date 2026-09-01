import { useState } from 'react'
import FireworksCanvas from './components/FireworksCanvas'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import ProductGrid from './components/ProductGrid'
import Discounts from './components/Discounts'
import ConsultationForm from './components/ConsultationForm'
import Partners from './components/Partners'
import Team from './components/Team'
import About, { Contacts } from './components/About'
import Footer from './components/Footer'

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleSelectCategory = (path: string | null) => {
    setActiveCategory(path)
  }

  return (
    <>
      <FireworksCanvas />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero onSelectCategory={(path) => {
            setActiveCategory(path)
            setTimeout(() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }} />
          <Categories
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />
          <ProductGrid activeCategory={activeCategory} />
          <Discounts />
          <ConsultationForm />
          <Partners />
          <Team />
          <About />
          <Contacts />
        </main>
        <Footer />
      </div>
    </>
  )
}
