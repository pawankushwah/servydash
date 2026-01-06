
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { IProduct } from "@/types";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardProductPage() {
  await connectToDatabase();
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();
  // if (!user || !user.id) {
  //   return <div className="p-8 text-center text-gray-500">You must be logged in to view your products.</div>;
  // }
  // Fetch products for this user
  const productsRaw: IProduct[] = await Product.find({}).sort({ createdAt: -1 }).lean();
  const products = productsRaw.map((product) => ({
    ...product,
    _id: product._id?.toString?.() || "",
    createdAt: product.createdAt ? new Date(product.createdAt).toLocaleString() : "",
    updatedAt: product.updatedAt ? new Date(product.updatedAt).toLocaleString() : "",
  }));

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">All Services</h1>
      {products.length === 0 ? (
        <div className="text-gray-400 text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed">
          <p>No products found on ServyDash yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
              <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>Type: {product.type}</span>
                <span>Price: ₹{product.price}</span>
              </div>
              <div className="text-xs text-gray-400">Created: {product.createdAt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
