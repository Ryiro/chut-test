"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Script from "next/script"
import { toast } from "sonner"

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      const totalAmount = subtotal * 1.1; // Including tax
      console.log('Creating order with amount:', totalAmount);

      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      const data = await response.json();
      console.log('Razorpay API response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      if (!data.orderId) {
        throw new Error('No order ID received from Razorpay');
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: 'ComputerHut',
        description: 'Payment for your order',
        order_id: data.orderId,
        handler: async function (response) {
          console.log('Payment success response:', response);
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: data.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json();
              throw new Error(errorData.error || 'Payment verification failed');
            }

            // Payment successful and verified
            toast.success("Payment successful! Order confirmed.");
            clearCart();
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#1a365d',
        }
      };

      console.log('Initializing Razorpay with options:', { ...options, key: '***' });
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error(error instanceof Error ? error.message : "Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12 min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to your cart to proceed with checkout</p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map(item => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  {item.image ? (
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Category: {item.category}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{(subtotal * 0.1).toLocaleString()}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(subtotal * 1.1).toLocaleString()}</span>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}