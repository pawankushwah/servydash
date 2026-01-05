"use client";

import Script from "next/script";
import { createRazorpayOrder } from "@/app/actions/razorpayActions";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  price: number;
  title: string;
}

export default function RazorpayCheckout({ productId, price, title }: Props) {
    const router = useRouter();
  const handlePayment = async () => {
    // 1. Create order on server
    const res = await createRazorpayOrder(price, productId);
    if (!res.success) return alert("Payment Failed to initialize");

    // 2. Open Razorpay Modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: res.amount,
      currency: "INR",
      name: "ServyDash",
      description: `Purchase: ${title}`,
      order_id: res.orderId,
      handler: function (response: any) {
        // Pass the payment_id to the success page URL
        router.push(`/success?payment_id=${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Customer Name", // Can be fetched from Auth
        email: "customer@example.com",
      },
      theme: { color: "#001F3F" }, // ServyDash Deep Blue
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button onClick={handlePayment} className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">
        Buy with Razorpay (UPI/Card)
      </button>
    </>
  );
}