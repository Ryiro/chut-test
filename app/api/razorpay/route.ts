import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@/lib/auth";

// Validate required environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('Missing required Razorpay environment variables');
  throw new Error('Missing required Razorpay environment variables');
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { amount, orderId } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const payment = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paisa
      currency: "INR",
      receipt: orderId,
    });

    return NextResponse.json({
      orderId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create payment" }),
      { status: 500 }
    );
  }
}