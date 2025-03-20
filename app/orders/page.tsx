'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
  items: Array<{
    product: {
      name: string;
    };
    quantity: number;
  }>;
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchOrders();
    }
  }, [session?.user]);

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

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">
            {isAdmin ? 'All Orders' : 'My Orders'}
          </h1>

          {orders.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No orders found.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-medium">Order #{order.id}</h2>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      {isAdmin && order.user && (
                        <div className="mt-2 text-sm">
                          <p>Customer: {order.user.name}</p>
                          <p>Email: {order.user.email}</p>
                        </div>
                      )}
                      <div className="mt-2">
                        <p className="text-sm">
                          Items:{' '}
                          {order.items
                            .map((item) => `${item.quantity}x ${item.product.name}`)
                            .join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                      <p className={`text-sm ${getStatusColor(order.status)}`}>
                        {order.status}
                      </p>
                      <p
                        className={`text-sm ${
                          order.paymentStatus === 'PAID'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {order.paymentStatus}
                      </p>
                      <Button
                        className="mt-2"
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/orders/${order.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}