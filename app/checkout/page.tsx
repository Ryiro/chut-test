'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Image from 'next/image';
import Script from 'next/script';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Address {
  id: string;
  type: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

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
  const { data: session } = useSession();
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedBillingId, setSelectedBillingId] = useState<string>('');
  const [selectedShippingId, setSelectedShippingId] = useState<string>('');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'BOTH',
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('/api/user/addresses');
        if (!response.ok) throw new Error('Failed to fetch addresses');
        const data = await response.json();
        setAddresses(data);
        
        // Set default addresses
        const defaultAddress = data.find((addr: Address) => addr.isDefault);
        if (defaultAddress) {
          setSelectedShippingId(defaultAddress.id);
          setSelectedBillingId(defaultAddress.id);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
        toast.error('Failed to load addresses');
      }
    };

    if (session?.user) {
      fetchAddresses();
    }
  }, [session?.user]);

  if (!session) {
    redirect('/login?callbackUrl=/checkout');
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress),
      });

      if (!response.ok) throw new Error('Failed to add address');

      const addedAddress = await response.json();
      setAddresses(prev => [...prev, addedAddress]);
      setSelectedShippingId(addedAddress.id);
      if (sameAsShipping) setSelectedBillingId(addedAddress.id);
      setShowNewAddressForm(false);
      setNewAddress({
        type: 'BOTH',
        name: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: '',
      });
      toast.success('Address added successfully');
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address');
    }
  };

  const handleCheckout = async () => {
    if (!selectedShippingId || (!sameAsShipping && !selectedBillingId)) {
      toast.error('Please select shipping and billing addresses');
      return;
    }

    setIsProcessing(true);
    try {
      // First create the order in our database
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          shippingAddressId: selectedShippingId,
          billingAddressId: sameAsShipping ? selectedShippingId : selectedBillingId,
          subtotal,
          tax: subtotal * 0.1,
          total: subtotal * 1.1
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.error || 'Failed to create order');

      // Then create Razorpay order
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: subtotal * 1.1,
          orderId: orderData.id
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create payment');

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: 'ComputerHut',
        description: 'Payment for your order',
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderData.id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json();
              throw new Error(errorData.error || 'Payment verification failed');
            }

            toast.success('Order placed successfully!');
            clearCart();
            // Redirect to order confirmation page
            window.location.href = `/orders/${orderData.id}`;
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
          contact: session?.user?.phone || ''
        },
        theme: { color: '#1a365d' }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process checkout');
    } finally {
      setIsProcessing(false);
    }
  };

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
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Address Selection */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              {addresses.length > 0 ? (
                <div className="space-y-4">
                  <Select value={selectedShippingId} onValueChange={setSelectedShippingId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping address" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map(address => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.name} - {address.line1}, {address.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onChange={e => setSameAsShipping(e.target.checked)}
                      className="checkbox"
                    />
                    <label htmlFor="sameAsShipping">Billing address same as shipping</label>
                  </div>

                  {!sameAsShipping && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
                      <Select value={selectedBillingId} onValueChange={setSelectedBillingId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing address" />
                        </SelectTrigger>
                        <SelectContent>
                          {addresses.map(address => (
                            <SelectItem key={address.id} value={address.id}>
                              {address.name} - {address.line1}, {address.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              ) : null}

              <Button
                variant="outline"
                onClick={() => setShowNewAddressForm(true)}
                className="mt-4"
              >
                Add New Address
              </Button>
            </Card>

            {/* New Address Form */}
            {showNewAddressForm && (
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={newAddress.name}
                      onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Address Line 1</Label>
                    <Input
                      value={newAddress.line1}
                      onChange={e => setNewAddress({ ...newAddress, line1: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Address Line 2 (Optional)</Label>
                    <Input
                      value={newAddress.line2}
                      onChange={e => setNewAddress({ ...newAddress, line2: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input
                        value={newAddress.city}
                        onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        value={newAddress.state}
                        onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Postal Code</Label>
                      <Input
                        value={newAddress.postalCode}
                        onChange={e => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input
                        value={newAddress.country}
                        onChange={e => setNewAddress({ ...newAddress, country: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      value={newAddress.phone}
                      onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Add Address</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewAddressForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Cart Items */}
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

          {/* Order Summary - Right Column */}
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
                  <span>Tax (10%)</span>
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
                  disabled={isProcessing || !selectedShippingId || (!sameAsShipping && !selectedBillingId)}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}