import { Link } from 'react-router-dom'

interface ProductProps {
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

export default function ProductCard({
  id,
  title,
  price,
  discountedPrice,
  image,
  rating,
}: ProductProps) {
  const hasDiscount = discountedPrice < price
  const discountPercent = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0

  return (
    <div className="bg-white text-black rounded p-4 shadow relative">
      {hasDiscount && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
          -{discountPercent}%
        </div>
      )}
      <img
        src={image.url}
        alt={image.alt}
        className="mb-2 w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm">
        {hasDiscount && (
          <span className="line-through text-red-500 mr-2">{price} kr</span>
        )}
        <span>{discountedPrice} kr</span>
      </p>
      <p className="text-yellow-600 text-sm mb-2">⭐ {rating}</p>

      <Link
        to={`/product/${id}`}
        className="inline-block bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
      >
        View Product
      </Link>
    </div>
  )
}
