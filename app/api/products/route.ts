import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ComponentCategory } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Create the specific spec based on category
    let specId = null;
    switch (body.category) {
      case 'CPU':
        const cpuSpec = await db.cpuSpec.create({
          data: {
            brand: body.specs.brand,
            cores: parseInt(body.specs.cores),
            threads: parseInt(body.specs.threads),
            baseSpeed: parseFloat(body.specs.baseSpeed),
            boostSpeed: body.specs.boostSpeed ? parseFloat(body.specs.boostSpeed) : null,
            socket: body.specs.socket,
            tdp: parseInt(body.specs.tdp),
          },
        });
        specId = { cpuSpecId: cpuSpec.id };
        break;
      case 'GPU':
        const gpuSpec = await db.gpuSpec.create({
          data: {
            brand: body.specs.brand,
            memory: parseInt(body.specs.memory),
            memoryType: body.specs.memoryType,
            coreClock: parseFloat(body.specs.coreClock),
            boostClock: body.specs.boostClock ? parseFloat(body.specs.boostClock) : null,
            tdp: parseInt(body.specs.tdp),
          },
        });
        specId = { gpuSpecId: gpuSpec.id };
        break;
      case 'RAM':
        const ramSpec = await db.ramSpec.create({
          data: {
            capacity: parseInt(body.specs.capacity),
            speed: parseInt(body.specs.speed),
            type: body.specs.type,
            timing: body.specs.timing,
          },
        });
        specId = { ramSpecId: ramSpec.id };
        break;
      case 'STORAGE':
        const storageSpec = await db.storageSpec.create({
          data: {
            type: body.specs.type,
            capacity: parseInt(body.specs.capacity),
            interface: body.specs.interface,
            readSpeed: body.specs.readSpeed ? parseInt(body.specs.readSpeed) : null,
            writeSpeed: body.specs.writeSpeed ? parseInt(body.specs.writeSpeed) : null,
          },
        });
        specId = { storageSpecId: storageSpec.id };
        break;
      case 'MOTHERBOARD':
        const motherboardSpec = await db.motherboardSpec.create({
          data: {
            socket: body.specs.socket,
            chipset: body.specs.chipset,
            formFactor: body.specs.formFactor,
            memoryMax: parseInt(body.specs.memoryMax),
            memorySlots: parseInt(body.specs.memorySlots),
          },
        });
        specId = { motherboardSpecId: motherboardSpec.id };
        break;
      case 'PSU':
        const psuSpec = await db.psuSpec.create({
          data: {
            wattage: parseInt(body.specs.wattage),
            efficiency: body.specs.efficiency,
            modular: Boolean(body.specs.modular),
          },
        });
        specId = { psuSpecId: psuSpec.id };
        break;
      case 'CASE':
        const caseSpec = await db.caseSpec.create({
          data: {
            formFactor: body.specs.formFactor,
            maxGpuLength: parseInt(body.specs.maxGpuLength),
            maxCpuHeight: parseInt(body.specs.maxCpuHeight),
          },
        });
        specId = { caseSpecId: caseSpec.id };
        break;
      case 'COOLER':
        const coolerSpec = await db.coolerSpec.create({
          data: {
            type: body.specs.type,
            height: parseInt(body.specs.height),
            radiatorSize: body.specs.radiatorSize ? parseInt(body.specs.radiatorSize) : null,
            fanSize: parseInt(body.specs.fanSize),
            fanCount: parseInt(body.specs.fanCount),
            tdp: parseInt(body.specs.tdp),
            socket: body.specs.socket,
          },
        });
        specId = { coolerSpecId: coolerSpec.id };
        break;
      default:
        throw new Error('Invalid category');
    }

    // Create the product with the associated spec
    const product = await db.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        stock: parseInt(body.stock),
        category: body.category,
        image: body.image,
        ...specId
      },
      include: {
        cpuSpec: body.category === 'CPU',
        gpuSpec: body.category === 'GPU',
        ramSpec: body.category === 'RAM',
        storageSpec: body.category === 'STORAGE',
        motherboardSpec: body.category === 'MOTHERBOARD',
        psuSpec: body.category === 'PSU',
        caseSpec: body.category === 'CASE',
        coolerSpec: body.category === 'COOLER',
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error creating product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const products = await db.product.findMany({
      where: category ? {
        category: category as ComponentCategory
      } : undefined,
      include: {
        cpuSpec: true,
        gpuSpec: true,
        ramSpec: true,
        storageSpec: true,
        motherboardSpec: true,
        psuSpec: true,
        caseSpec: true,
        coolerSpec: true,
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}