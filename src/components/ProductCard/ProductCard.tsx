import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
}

export default function ProductCard({
  id,
  title,
  price,
  discountedPrice,
  image,
  rating,
}: ProductCardProps) {
  const hasDiscount = discountedPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;
  const discountAmount = hasDiscount
    ? (price - discountedPrice).toFixed(2)
    : '';

  return (
    <Link
      to={`/product/${id}`}
      className="block bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-lg hover:ring-2 hover:ring-indigo-500 transform hover:-translate-y-1 transition duration-300 h-full"
    >
      {hasDiscount && (
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs font-bold rounded">
          -{discountPercent}%
        </div>
      )}

      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-32 object-cover rounded mb-2"
      />

      <h2 className="text-base font-semibold mb-1 text-center text-black">
        {title}
      </h2>

      <p className="text-sm text-center">
        {hasDiscount && (
          <span className="line-through text-red-500 mr-2">{price} kr</span>
        )}
        <span className={hasDiscount ? 'text-green-600' : 'text-black'}>
          {discountedPrice} kr
        </span>
      </p>

      {hasDiscount && (
        <p className="bg-green-600 text-white text-sm font-semibold rounded px-2 py-1 mt-2 mx-auto w-fit">
          Save {discountAmount} kr!
        </p>
      )}

      <p className="text-yellow-600 text-sm text-center mt-2">⭐ {rating}</p>
    </Link>
  );
}
