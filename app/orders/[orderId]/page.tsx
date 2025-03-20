'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import Image from 'next/image';

interface OrderDetail {
  id: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
  trackingNumber?: string;
  user: {
    name: string;
    email: string;
  };
  items: Array<{
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      image: string;
    };
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export default function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const isAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchOrder();
    }
  }, [session?.user, params.orderId]);

  const updateOrderStatus = async (newStatus: string) => {
    try {
      setUpdating(true);
      const response = await fetch(`/api/orders/${params.orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      setOrder(updatedOrder);
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const cancelOrder = async () => {
    try {
      setUpdating(true);
      const response = await fetch(`/api/orders/${params.orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      toast.success('Order cancelled successfully');
      router.push('/orders');
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    } finally {
      setUpdating(false);
    }
  };

  if (!session) {
    router.push('/login?callbackUrl=/orders');
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Card className="p-6 text-center">
            <p className="text-gray-500">Order not found</p>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'text-green-600';
      case 'CANCELLED':
        return 'text-red-600';
      case 'PROCESSING':
        return 'text-blue-600';
      case 'SHIPPED':
        return 'text-purple-600';
      default:
        return 'text-yellow-600';
    }
  };

  const formatAddress = (address: OrderDetail['shippingAddress']) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`;
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <div className="flex gap-4">
              {isAdmin && (
                <Select
                  value={order.status}
                  onValueChange={updateOrderStatus}
                  disabled={updating || order.status === 'CANCELLED'}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </Select>
              )}
              {order.status === 'PENDING' && !isAdmin && (
                <Button
                  variant="destructive"
                  onClick={cancelOrder}
                  disabled={updating}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Order Information</h2>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-500">Date: </span>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="text-gray-500">Status: </span>
                  <span className={getStatusColor(order.status)}>
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Payment Status: </span>
                  <span
                    className={
                      order.paymentStatus === 'PAID'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </p>
                {order.trackingNumber && (
                  <p>
                    <span className="text-gray-500">Tracking Number: </span>
                    {order.trackingNumber}
                  </p>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold mb-4">Customer Information</h2>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-500">Name: </span>
                  {order.user.name}
                </p>
                <p>
                  <span className="text-gray-500">Email: </span>
                  {order.user.email}
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold mb-4">Shipping Address</h2>
              <p>{formatAddress(order.shippingAddress)}</p>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold mb-4">Billing Address</h2>
              <p>{formatAddress(order.billingAddress)}</p>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <h2 className="font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    {item.product.image && (
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">₹{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">
                Total: ₹{order.totalAmount.toLocaleString()}
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}