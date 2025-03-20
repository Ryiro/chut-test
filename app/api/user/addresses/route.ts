import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const addresses = await db.address.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch addresses" }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const { type, name, line1, line2, city, state, postalCode, country, phone } = data;

    // If this is the first address, make it default
    const addressCount = await db.address.count({
      where: { userId: session.user.id }
    });

    const address = await db.address.create({
      data: {
        userId: session.user.id,
        type,
        name,
        line1,
        line2,
        city,
        state,
        postalCode,
        country,
        phone,
        isDefault: addressCount === 0
      }
    });

    return NextResponse.json(address);
  } catch (error) {
    console.error("Error creating address:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create address" }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const { id, ...updateData } = data;

    // First, verify the address belongs to the user
    const existingAddress = await db.address.findFirst({
      where: { id, userId: session.user.id }
    });

    if (!existingAddress) {
      return new NextResponse("Address not found", { status: 404 });
    }

    // If setting as default, unset other default addresses
    if (updateData.isDefault) {
      await db.address.updateMany({
        where: { 
          userId: session.user.id,
          isDefault: true 
        },
        data: { isDefault: false }
      });
    }

    const address = await db.address.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(address);
  } catch (error) {
    console.error("Error updating address:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update address" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing address ID", { status: 400 });
    }

    // First, verify the address belongs to the user
    const existingAddress = await db.address.findFirst({
      where: { id, userId: session.user.id }
    });

    if (!existingAddress) {
      return new NextResponse("Address not found", { status: 404 });
    }

    // If deleting default address, make another address default if exists
    if (existingAddress.isDefault) {
      const nextAddress = await db.address.findFirst({
        where: { 
          userId: session.user.id,
          id: { not: id }
        }
      });

      if (nextAddress) {
        await db.address.update({
          where: { id: nextAddress.id },
          data: { isDefault: true }
        });
      }
    }

    await db.address.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete address" }),
      { status: 500 }
    );
  }
}