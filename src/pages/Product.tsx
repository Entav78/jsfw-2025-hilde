import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_PRODUCTS } from '../constants/api'
import { useCart } from '../context/CartContext'

interface ProductData {
  id: string
  title: string
  description: string
  price: number
  discountedPrice: number
  image: {
    url: string
    alt: string
  }
  rating: number
  tags: string[]
  reviews: {
    id: string
    username: string
    rating: number
    description: string
  }[]
}

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductData | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_PRODUCTS}/${id}`)
        const json = await res.json()
        setProduct(json.data)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      }
    }

    if (id) fetchProduct()
  }, [id])

  if (!product) return <p>Loading product...</p>

  const hasDiscount = product.discountedPrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white text-black rounded shadow">
      <img
        src={product.image.url}
        alt={product.image.alt}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold">
        {hasDiscount && (
          <span className="line-through text-red-500 mr-2">{product.price} kr</span>
        )}
        <span>{product.discountedPrice} kr</span>
        {hasDiscount && (
          <span className="ml-2 text-sm text-red-700 font-bold">
            -{discountPercent}%
          </span>
        )}
      </p>
      <p className="text-yellow-600 mt-2">⭐ {product.rating}</p>

      <div className="mt-4">
      <button
        onClick={() =>
          addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            discountedPrice: product.discountedPrice,
            image: product.image,
          })
        }
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
      </div>

      {product.tags.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold">Tags:</h3>
          <ul className="flex flex-wrap gap-2 mt-1">
            {product.tags.map((tag) => (
              <li key={tag} className="bg-gray-200 px-2 py-1 text-sm rounded">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.reviews.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Reviews:</h3>
          <ul className="space-y-2">
            {product.reviews.map((review) => (
              <li key={review.id} className="border-t pt-2">
                <p className="text-sm font-semibold">{review.username}</p>
                <p className="text-yellow-600 text-sm">⭐ {review.rating}</p>
                <p className="text-sm">{review.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
  )
}