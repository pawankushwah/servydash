import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") as string;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature === signature) {
    const data = JSON.parse(body);
    // Grant Instant Access logic here (e.g., Update MongoDB)
    console.log("Payment Verified:", data.payload.payment.entity.id);
    return NextResponse.json({ status: "ok" });
  } else {
    return NextResponse.json({ status: "failed" }, { status: 400 });
  }
}