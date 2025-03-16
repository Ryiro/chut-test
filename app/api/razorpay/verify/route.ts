import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { orderId, paymentId, signature } = await request.json();

    // Get the secret key from environment variable
    const secret = process.env.RAZORPAY_KEY_SECRET!;

    // Create the verification string
    const text = `${orderId}|${paymentId}`;
    
    // Generate the expected signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    // Verify the signature
    const isValid = expectedSignature === signature;

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Update your database to mark the order as paid
    // 2. Send confirmation emails
    // 3. Update inventory
    // 4. etc.

    return NextResponse.json({
      message: 'Payment verified successfully',
      paymentId,
      orderId
    });
  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}