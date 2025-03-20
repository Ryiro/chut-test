import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { productId: string; imageId: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First, unset all main images for this product
    await db.productImage.updateMany({
      where: { productId: params.productId },
      data: { isMain: false }
    });

    // Set the selected image as main
    const updatedImage = await db.productImage.update({
      where: { id: params.imageId },
      data: { isMain: true }
    });

    // Update the product's main image field
    await db.product.update({
      where: { id: params.productId },
      data: { image: updatedImage.url }
    });

    return NextResponse.json(updatedImage);
  } catch (error) {
    console.error('Error setting main image:', error);
    return new NextResponse("Error setting main image", { status: 500 });
  }
}