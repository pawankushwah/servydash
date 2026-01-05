'use server';

import Razorpay from 'razorpay';
import { connectToDatabase } from '@/lib/db';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayOrder(amount: number, productId: string) {
  try {
    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${productId}`,
      notes: {
        productId: productId,
      }
    };

    const order = await razorpay.orders.create(options);
    return { success: true, orderId: order.id, amount: order.amount };
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return { success: false, error: "Order creation failed" };
  }
}