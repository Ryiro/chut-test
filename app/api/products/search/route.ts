import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ComponentCategory, Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const searchQuery = query.trim();
    const upperQuery = searchQuery.toUpperCase();

    // Check if the search query matches any valid category
    const isValidCategory = Object.values(ComponentCategory).includes(upperQuery as ComponentCategory);

    try {
      const products = await db.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: searchQuery,
              },
            },
            {
              description: {
                contains: searchQuery,
              },
            },
            // Only include category search if it's a valid category
            ...(isValidCategory ? [{
              category: upperQuery as ComponentCategory,
            }] : []),
            {
              cpuSpec: {
                OR: [
                  { brand: { contains: searchQuery } },
                  { socket: { contains: searchQuery } }
                ]
              }
            },
            {
              gpuSpec: {
                brand: { contains: searchQuery }
              }
            },
            {
              ramSpec: {
                type: { contains: searchQuery }
              }
            },
            {
              storageSpec: {
                type: { contains: searchQuery }
              }
            },
            {
              motherboardSpec: {
                OR: [
                  { chipset: { contains: searchQuery } },
                  { socket: { contains: searchQuery } },
                  { formFactor: { contains: searchQuery } }
                ]
              }
            },
            {
              psuSpec: {
                OR: [
                  { efficiency: { contains: searchQuery } }
                ]
              }
            },
            {
              coolerSpec: {
                OR: [
                  { type: { contains: searchQuery } },
                  { socket: { contains: searchQuery } }
                ]
              }
            },
          ],
        },
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          category: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          cpuSpec: true,
          gpuSpec: true,
          ramSpec: true,
          storageSpec: true,
          motherboardSpec: true,
          psuSpec: true,
          caseSpec: true,
          coolerSpec: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
      });

      return NextResponse.json(products);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        return NextResponse.json(
          { error: `Database error: ${error.message}`, code: error.code },
          { status: 400 }
        );
      }
      throw error; // Re-throw other errors to be caught by outer try-catch
    }
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}