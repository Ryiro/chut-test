import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { orderId, paymentId, signature } = await req.json();

    // Verify the payment signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid payment signature" }),
        { status: 400 }
      );
    }

    // Update order status
    const order = await db.order.update({
      where: { id: orderId },
      data: {
        status: "PROCESSING",
        paymentStatus: "PAID",
        paymentId,
        paymentSignature: signature
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to verify payment" }),
      { status: 500 }
    );
  }
}