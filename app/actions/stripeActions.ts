'use server';

import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSession(productId: string, price: number, title: string) {
  // Ensure the base URL exists and has a scheme
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: title },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      },
    ],
    metadata: { productId },
    mode: 'payment',
    // We concatenate carefully here
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/marketplace`,
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe session URL");
  }

  redirect(session.url);
}