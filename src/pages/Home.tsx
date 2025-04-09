import { useEffect, useState } from 'react'
import { API_PRODUCTS } from '../constants/api'
import ProductCard from '../components/ProductCard'

interface Product {
  id: string
  title: string
  price: number
  discountedPrice: number
  image: {
    url: string
    alt: string
  }
  rating: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(API_PRODUCTS)
        const json = await res.json()
        setProducts(json.data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}


