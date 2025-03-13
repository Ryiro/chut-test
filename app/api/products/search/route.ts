import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ComponentCategory, Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      // If no query, return all products (limited to 20)
      const products = await prisma.product.findMany({
        take: 20,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          cpuSpec: true,
          gpuSpec: true,
          ramSpec: true,
          storageSpec: true,
          motherboardSpec: true,
          psuSpec: true,
          caseSpec: true,
          coolerSpec: true,
        },
      });
      return NextResponse.json(products);
    }

    const searchQuery = query.trim();
    let categorySearch: ComponentCategory | undefined;
    
    try {
      // Try to parse the query as a category
      categorySearch = searchQuery.toUpperCase() as ComponentCategory;
      if (!Object.values(ComponentCategory).includes(categorySearch)) {
        categorySearch = undefined;
      }
    } catch {
      categorySearch = undefined;
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
            },
          },
          ...(categorySearch ? [{
            category: categorySearch
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
              efficiency: { contains: searchQuery }
            }
          },
          {
            caseSpec: {
              formFactor: { contains: searchQuery }
            }
          },
          {
            coolerSpec: {
              OR: [
                { type: { contains: searchQuery } },
                { socket: { contains: searchQuery } }
              ]
            }
          }
        ].filter(Boolean) as Prisma.ProductWhereInput['OR'],
      },
      include: {
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

    if (products.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: 'Database query error' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}