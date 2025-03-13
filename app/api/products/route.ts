import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, stock, category, specs, image } = body;

    // Create the specific spec based on category
    let specId = null;
    switch (category) {
      case 'CPU':
        const cpuSpec = await prisma.cpuSpec.create({
          data: {
            brand: specs.brand,
            cores: parseInt(specs.cores),
            threads: parseInt(specs.threads),
            baseSpeed: parseFloat(specs.baseSpeed),
            boostSpeed: specs.boostSpeed ? parseFloat(specs.boostSpeed) : null,
            socket: specs.socket,
            tdp: parseInt(specs.tdp),
          },
        });
        specId = { cpuSpecId: cpuSpec.id };
        break;
      case 'GPU':
        const gpuSpec = await prisma.gpuSpec.create({
          data: {
            brand: specs.brand,
            memory: parseInt(specs.memory),
            memoryType: specs.memoryType,
            coreClock: parseFloat(specs.coreClock),
            boostClock: specs.boostClock ? parseFloat(specs.boostClock) : null,
            tdp: parseInt(specs.tdp),
          },
        });
        specId = { gpuSpecId: gpuSpec.id };
        break;
      case 'RAM':
        const ramSpec = await prisma.ramSpec.create({
          data: {
            capacity: parseInt(specs.capacity),
            speed: parseInt(specs.speed),
            type: specs.type,
            timing: specs.timing,
          },
        });
        specId = { ramSpecId: ramSpec.id };
        break;
      case 'STORAGE':
        const storageSpec = await prisma.storageSpec.create({
          data: {
            type: specs.type,
            capacity: parseInt(specs.capacity),
            interface: specs.interface,
            readSpeed: specs.readSpeed ? parseInt(specs.readSpeed) : null,
            writeSpeed: specs.writeSpeed ? parseInt(specs.writeSpeed) : null,
          },
        });
        specId = { storageSpecId: storageSpec.id };
        break;
      case 'MOTHERBOARD':
        const motherboardSpec = await prisma.motherboardSpec.create({
          data: {
            socket: specs.socket,
            chipset: specs.chipset,
            formFactor: specs.formFactor,
            memoryMax: parseInt(specs.memoryMax),
            memorySlots: parseInt(specs.memorySlots),
          },
        });
        specId = { motherboardSpecId: motherboardSpec.id };
        break;
      case 'PSU':
        const psuSpec = await prisma.psuSpec.create({
          data: {
            wattage: parseInt(specs.wattage),
            efficiency: specs.efficiency,
            modular: Boolean(specs.modular),
          },
        });
        specId = { psuSpecId: psuSpec.id };
        break;
      case 'CASE':
        const caseSpec = await prisma.caseSpec.create({
          data: {
            formFactor: specs.formFactor,
            maxGpuLength: parseInt(specs.maxGpuLength),
            maxCpuHeight: parseInt(specs.maxCpuHeight),
          },
        });
        specId = { caseSpecId: caseSpec.id };
        break;
      case 'COOLER':
        const coolerSpec = await prisma.coolerSpec.create({
          data: {
            type: specs.type,
            height: parseInt(specs.height),
            radiatorSize: specs.radiatorSize ? parseInt(specs.radiatorSize) : null,
            fanSize: parseInt(specs.fanSize),
            fanCount: parseInt(specs.fanCount),
            tdp: parseInt(specs.tdp),
            socket: specs.socket,
          },
        });
        specId = { coolerSpecId: coolerSpec.id };
        break;
      default:
        throw new Error('Invalid category');
    }

    // Create the product with the associated spec
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        image, // Now just store the image path that was uploaded separately
        ...specId,
      },
      include: {
        cpuSpec: category === 'CPU',
        gpuSpec: category === 'GPU',
        ramSpec: category === 'RAM',
        storageSpec: category === 'STORAGE',
        motherboardSpec: category === 'MOTHERBOARD',
        psuSpec: category === 'PSU',
        caseSpec: category === 'CASE',
        coolerSpec: category === 'COOLER',
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