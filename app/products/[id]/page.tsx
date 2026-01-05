// src/app/products/[id]/page.tsx
"use client";
import { createCheckoutSession } from "@/app/actions/stripeActions";
import RazorpayCheckout from "@/components/marketplace/RazorpayCheckout";
import { useParams } from "next/navigation";

export default async function ProductDetails() {
  const { id } = useParams();
  if (Array.isArray(id)) {
    throw new Error("Invalid product ID");
  }

  return <ProductDetailsMain id={id as string} />;
}

export async function ProductDetailsMain({ id }: { id: string }) {
  const product = { id: id ?? "1", title: "Master Python", price: 49, description: "An in-depth course on Python programming." };

  const handleBuy = createCheckoutSession.bind(
    null,
    product.id,
    product.price,
    product.title
  );

  return (
    <div className="min-h-screen w-full p-10 text-center bg-white text-black rounded-lg shadow-lg mx-auto">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-sm text-gray-400 max-w-xs px-5 mx-auto mt-4">{product.description}</p>
      <p className="text-2xl mt-4">${product.price}</p>

      <div className="flex flex-col items-center mt-6 gap-2">
        <button
          onClick={handleBuy}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold"
        >
          Buy Now with Stripe
        </button>
        <RazorpayCheckout
          productId={product.id}
          price={product.price * 100} // in paise
          title={product.title}
        />
      </div>
    </div>
  );
}
