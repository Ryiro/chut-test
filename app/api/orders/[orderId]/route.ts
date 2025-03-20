import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const order = await db.order.findFirst({
      where: {
        id: params.orderId,
        ...(session.user.role !== 'ADMIN' ? { userId: session.user.id } : {})
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        shippingAddress: true,
        billingAddress: true
      }
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch order" }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only admins can update order status
    if (session.user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await req.json();
    const { status, trackingNumber } = data;

    const order = await db.order.update({
      where: { id: params.orderId },
      data: {
        status,
        ...(trackingNumber && { trackingNumber })
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        shippingAddress: true,
        billingAddress: true
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update order" }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const order = await db.order.findUnique({
      where: {
        id: params.orderId,
        userId: session.user.id
      },
      include: {
        items: true
      }
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Only allow cancellation of pending orders
    if (order.status !== "PENDING") {
      return new NextResponse("Cannot cancel non-pending order", { status: 400 });
    }

    // Return items to stock
    await Promise.all(
      order.items.map(async (item) => {
        await db.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity
            }
          }
        });
      })
    );

    // Update order status
    await db.order.update({
      where: { id: params.orderId },
      data: {
        status: "CANCELLED",
        paymentStatus: "CANCELLED"
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}