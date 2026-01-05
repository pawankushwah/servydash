import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/marketplace/ProductCard";
import { IProduct } from "@/types";
import Navbar from "@/components/Navbar";

export default async function Marketplace() {
  await connectToDatabase();
  
  // Fetch products and convert from Mongoose documents to plain JS objects
  const products: IProduct[] = await Product.find({}).sort({ createdAt: -1 }).lean();

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Discover <span className="text-blue-600">Digital Assets</span>
        </h1>
        <p className="text-gray-600 mt-2">Explore top-tier e-books, courses, and professional services.</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id?.toString()} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed">
            <p className="text-gray-400">No products found on ServyDash yet.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}