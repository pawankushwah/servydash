import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const productId = session.metadata.productId;

    await connectToDatabase();
    
    // Logic for Instant Access:
    // 1. Find the product
    const product = await Product.findById(productId);
    
    // 2. Here you would trigger an email to the customer with the fileUrl 
    // or add the product to the user's "Library" in MongoDB
    console.log(`Payment successful for product: ${product?.title}`);
  }

  return new NextResponse("Success", { status: 200 });
}