import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description, price, stock, category, specs } = body;

    // Start building the update data
    const updateData: any = {
      name,
      description,
      price,
      stock,
      category
    };

    // Update the specific spec based on category
    const categorySpecMap = {
      CPU: {
        spec: 'cpuSpec',
        fields: ['brand', 'cores', 'threads', 'baseSpeed', 'boostSpeed', 'socket', 'tdp']
      },
      GPU: {
        spec: 'gpuSpec',
        fields: ['brand', 'memory', 'memoryType', 'coreClock', 'boostClock', 'tdp']
      },
      RAM: {
        spec: 'ramSpec',
        fields: ['capacity', 'speed', 'type', 'timing']
      },
      STORAGE: {
        spec: 'storageSpec',
        fields: ['type', 'capacity', 'interface', 'readSpeed', 'writeSpeed']
      },
      MOTHERBOARD: {
        spec: 'motherboardSpec',
        fields: ['socket', 'chipset', 'formFactor', 'memoryMax', 'memorySlots']
      },
      PSU: {
        spec: 'psuSpec',
        fields: ['wattage', 'efficiency', 'modular']
      },
      CASE: {
        spec: 'caseSpec',
        fields: ['formFactor', 'maxGpuLength', 'maxCpuHeight']
      },
      COOLER: {
        spec: 'coolerSpec',
        fields: ['type', 'height', 'radiatorSize', 'fanSize', 'fanCount', 'tdp', 'socket']
      },
      MONITOR: {
        spec: 'monitorSpec',
        fields: ['size', 'resolution', 'refreshRate', 'panelType', 'responseTime', 'aspectRatio', 'hdrSupport', 'ports', 'speakers', 'adjustable']
      },
      KEYBOARD: {
        spec: 'keyboardSpec',
        fields: ['type', 'layout', 'switchType', 'backlighting', 'wireless', 'numpad', 'multimedia']
      },
      MOUSE: {
        spec: 'mouseSpec',
        fields: ['dpi', 'buttons', 'wireless', 'sensor', 'rgb', 'weight', 'adjustable']
      },
      SPEAKERS: {
        spec: 'speakerSpec',
        fields: ['type', 'totalWattage', 'wireless', 'bluetooth', 'subwoofer', 'remote']
      },
      HEADPHONES: {
        spec: 'headphoneSpec',
        fields: ['type', 'driver', 'wireless', 'bluetooth', 'noiseCancelling', 'microphone', 'impedance', 'frequency']
      },
      EXTERNAL_STORAGE: {
        spec: 'externalStorageSpec',
        fields: ['capacity', 'type', 'interface', 'portable', 'encrypted', 'readSpeed', 'writeSpeed']
      }
    };

    const specConfig = categorySpecMap[category as keyof typeof categorySpecMap];
    if (specConfig) {
      const specData: any = {};
      for (const field of specConfig.fields) {
        if (specs[field] !== undefined) {
          // Convert string values to appropriate types
          if (['cores', 'threads', 'memory', 'capacity', 'memoryMax', 'memorySlots', 'wattage', 'height', 'radiatorSize', 'fanSize', 'fanCount', 'tdp', 'refreshRate', 'dpi', 'buttons', 'totalWattage', 'impedance'].includes(field)) {
            specData[field] = parseInt(specs[field]);
          } else if (['baseSpeed', 'boostSpeed', 'coreClock', 'boostClock', 'speed', 'size', 'responseTime'].includes(field)) {
            specData[field] = parseFloat(specs[field]);
          } else if (['wireless', 'modular', 'hdrSupport', 'speakers', 'adjustable', 'backlighting', 'numpad', 'multimedia', 'rgb', 'bluetooth', 'subwoofer', 'remote', 'noiseCancelling', 'microphone', 'portable', 'encrypted'].includes(field)) {
            specData[field] = Boolean(specs[field]);
          } else {
            specData[field] = specs[field];
          }
        }
      }

      // Update the specific spec
      const product = await db.product.update({
        where: { id: params.productId },
        data: {
          ...updateData,
          [specConfig.spec]: {
            update: specData
          }
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
          monitorSpec: true,
          keyboardSpec: true,
          mouseSpec: true,
          speakerSpec: true,
          headphoneSpec: true,
          externalStorageSpec: true
        }
      });

      return NextResponse.json(product);
    }

    // If no spec update needed, just update the main product
    const product = await db.product.update({
      where: { id: params.productId },
      data: updateData
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.productId },
      include: {
        cpuSpec: true,
        gpuSpec: true,
        ramSpec: true,
        storageSpec: true,
        motherboardSpec: true,
        psuSpec: true,
        caseSpec: true,
        coolerSpec: true,
        monitorSpec: true,
        keyboardSpec: true,
        mouseSpec: true,
        speakerSpec: true,
        headphoneSpec: true,
        externalStorageSpec: true
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await db.product.delete({
      where: { id: params.productId }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}