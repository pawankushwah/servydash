import { IProduct } from "@/types";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
      <div className="aspect-video w-full bg-blue-50 rounded-xl mb-4 flex items-center justify-center text-4xl">
        {/* Placeholder icons based on type */}
        {product.type === 'file' && '📄'}
        {product.type === 'course' && '🎓'}
        {product.type === 'event' && '🗓️'}
        {product.type === 'service' && '💼'}
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {product.type}
        </span>
        <p className="text-xl font-bold text-gray-900">${product.price}</p>
      </div>

      <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
        {product.title}
      </h3>
      <p className="text-gray-500 text-sm line-clamp-2 mt-2">
        {product.description}
      </p>

      <Link href={`/products/${product._id}`}>
        <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer">
          View Details
        </button>
      </Link>
    </div>
  );
}