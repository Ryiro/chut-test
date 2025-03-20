import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  name: string;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { items, shippingAddress, paymentId, paymentSignature } = await req.json();
    const orderItems = items.map((item: CartItem) => ({
      quantity: item.quantity,
      price: item.price,
      productId: item.id
    }));

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        totalAmount: items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0),
        status: "PENDING",
        paymentStatus: "PENDING",
        paymentId,
        paymentSignature,
        shippingAddressId: shippingAddress.id,
        billingAddressId: shippingAddress.id, // Assuming billingAddressId is the same as shippingAddressId
        items: {
          create: orderItems
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        shippingAddress: true,
        user: true
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = session.user.role === "ADMIN";
    const orders = await db.order.findMany({
      where: isAdmin ? undefined : { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        },
        shippingAddress: true,
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}