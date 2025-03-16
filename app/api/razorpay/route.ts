import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Validate required environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('Missing required Razorpay environment variables');
  throw new Error('Missing required Razorpay environment variables');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    };

    console.log('Creating Razorpay order with options:', options);

    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    
    // More descriptive error message based on the error type
    const errorMessage = error instanceof Error ? error.message : 'Failed to create payment order';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}