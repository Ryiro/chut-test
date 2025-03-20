import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile } from 'fs/promises';
import path from 'path';

async function saveImage(bytes: ArrayBuffer, originalName: string): Promise<{ url: string }> {
  const timestamp = Date.now();
  const filename = `${timestamp}-${originalName}`;
  const publicDir = path.join(process.cwd(), 'public', 'product-images');
  const filePath = path.join(publicDir, filename);
  
  await writeFile(filePath, Buffer.from(bytes));
  return { url: `/product-images/${filename}` };
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);
    const imageId = url.searchParams.get('imageId');

    if (!imageId) {
      return new NextResponse("Image ID is required", { status: 400 });
    }

    // Verify that the image belongs to the specified product
    const image = await db.productImage.findFirst({
      where: {
        id: imageId,
        productId: params.productId
      }
    });

    if (!image) {
      return new NextResponse("Image not found for this product", { status: 404 });
    }

    await db.productImage.delete({
      where: { id: imageId }
    });

    return new NextResponse("Image deleted", { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return new NextResponse("Error deleting image", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string;

    if (!file) {
      return new NextResponse("File is required", { status: 400 });
    }

    // Process file upload
    const bytes = await file.arrayBuffer();
    const uploadResponse = await saveImage(bytes, file.name);

    const image = await db.productImage.create({
      data: {
        url: uploadResponse.url,
        productId: productId,
        isMain: false
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error uploading image:', error);
    return new NextResponse("Error uploading image", { status: 500 });
  }
}