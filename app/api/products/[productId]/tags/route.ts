import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { productId: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { tag } = await req.json();

    // Find or create the tag
    const existingTag = await db.tag.upsert({
      where: { name: tag },
      update: {},
      create: { name: tag }
    });

    // Add tag to product if not already added
    const existingRelation = await db.tagsOnProducts.findUnique({
      where: {
        productId_tagId: {
          productId: params.productId,
          tagId: existingTag.id
        }
      }
    });

    if (!existingRelation) {
      await db.tagsOnProducts.create({
        data: {
          productId: params.productId,
          tagId: existingTag.id
        }
      });
    }

    return NextResponse.json(existingTag);
  } catch (error) {
    console.error('Error adding tag:', error);
    return new NextResponse("Error adding tag", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; tagId: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.tagsOnProducts.delete({
      where: {
        productId_tagId: {
          productId: params.productId,
          tagId: params.tagId
        }
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error removing tag:', error);
    return new NextResponse("Error removing tag", { status: 500 });
  }
}