import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { ComponentCategory, Prisma } from "@prisma/client";

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
      case 'MONITOR':
        const monitorSpec = await db.monitorSpec.create({
          data: {
            size: parseFloat(body.specs.size),
            resolution: body.specs.resolution,
            refreshRate: parseInt(body.specs.refreshRate),
            panelType: body.specs.panelType,
            responseTime: parseFloat(body.specs.responseTime),
            aspectRatio: body.specs.aspectRatio,
            hdrSupport: Boolean(body.specs.hdrSupport),
            ports: body.specs.ports,
            speakers: Boolean(body.specs.speakers),
            adjustable: Boolean(body.specs.adjustable),
          },
        });
        specId = { monitorSpecId: monitorSpec.id };
        break;
      case 'KEYBOARD':
        const keyboardSpec = await db.keyboardSpec.create({
          data: {
            type: body.specs.type,
            layout: body.specs.layout,
            switchType: body.specs.switchType || null,
            backlighting: Boolean(body.specs.backlighting),
            wireless: Boolean(body.specs.wireless),
            numpad: Boolean(body.specs.numpad),
            multimedia: Boolean(body.specs.multimedia),
          },
        });
        specId = { keyboardSpecId: keyboardSpec.id };
        break;
      case 'MOUSE':
        const mouseSpec = await db.mouseSpec.create({
          data: {
            dpi: parseInt(body.specs.dpi),
            buttons: parseInt(body.specs.buttons),
            wireless: Boolean(body.specs.wireless),
            sensor: body.specs.sensor,
            rgb: Boolean(body.specs.rgb),
            weight: body.specs.weight ? parseInt(body.specs.weight) : null,
            adjustable: Boolean(body.specs.adjustable),
          },
        });
        specId = { mouseSpecId: mouseSpec.id };
        break;
      case 'SPEAKERS':
        const speakerSpec = await db.speakerSpec.create({
          data: {
            type: body.specs.type,
            totalWattage: parseInt(body.specs.totalWattage),
            wireless: Boolean(body.specs.wireless),
            bluetooth: Boolean(body.specs.bluetooth),
            subwoofer: Boolean(body.specs.subwoofer),
            remote: Boolean(body.specs.remote),
          },
        });
        specId = { speakerSpecId: speakerSpec.id };
        break;
      case 'HEADPHONES':
        const headphoneSpec = await db.headphoneSpec.create({
          data: {
            type: body.specs.type,
            driver: body.specs.driver,
            wireless: Boolean(body.specs.wireless),
            bluetooth: Boolean(body.specs.bluetooth),
            noiseCancelling: Boolean(body.specs.noiseCancelling),
            microphone: Boolean(body.specs.microphone),
            impedance: body.specs.impedance ? parseInt(body.specs.impedance) : null,
            frequency: body.specs.frequency,
          },
        });
        specId = { headphoneSpecId: headphoneSpec.id };
        break;
      case 'EXTERNAL_STORAGE':
        const externalStorageSpec = await db.externalStorageSpec.create({
          data: {
            capacity: parseInt(body.specs.capacity),
            type: body.specs.type,
            interface: body.specs.interface,
            portable: Boolean(body.specs.portable),
            encrypted: Boolean(body.specs.encrypted),
            readSpeed: body.specs.readSpeed ? parseInt(body.specs.readSpeed) : null,
            writeSpeed: body.specs.writeSpeed ? parseInt(body.specs.writeSpeed) : null,
          },
        });
        specId = { externalStorageSpecId: externalStorageSpec.id };
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
        monitorSpec: body.category === 'MONITOR',
        keyboardSpec: body.category === 'KEYBOARD',
        mouseSpec: body.category === 'MOUSE',
        speakerSpec: body.category === 'SPEAKERS',
        headphoneSpec: body.category === 'HEADPHONES',
        externalStorageSpec: body.category === 'EXTERNAL_STORAGE',
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
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const stockStatus = searchParams.get("stockStatus");
    const sortBy = searchParams.get("sortBy");

    // Build the where clause
    const where: Prisma.ProductWhereInput = {};

    // Category filter
    if (category && Object.values(ComponentCategory).includes(category as ComponentCategory)) {
      where.category = category as ComponentCategory;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Stock status filter
    if (stockStatus) {
      where.stock = stockStatus === "in-stock" ? { gt: 0 } : { equals: 0 };
    }

    // Category-specific filters
    const panelType = searchParams.get("panelType");
    const resolution = searchParams.get("resolution");
    const refreshRate = searchParams.get("refreshRate");
    const keyboardType = searchParams.get("keyboardType");
    const keyboardLayout = searchParams.get("keyboardLayout");
    const dpiRange = searchParams.get("dpiRange");
    const speakerType = searchParams.get("speakerType");
    const headphoneType = searchParams.get("headphoneType");
    const storageType = searchParams.get("storageType");
    const storageCapacity = searchParams.get("storageCapacity");
    const connectionType = searchParams.get("connectionType");

    // Add category-specific filters to where clause
    if (category === "MONITOR") {
      where.monitorSpec = {
        AND: [
          panelType ? { panelType } : {},
          resolution ? { resolution } : {},
          refreshRate ? { refreshRate: { gte: parseInt(refreshRate) } } : {},
        ].filter(condition => Object.keys(condition).length > 0),
      };
    }

    if (category === "KEYBOARD") {
      where.keyboardSpec = {
        AND: [
          keyboardType ? { type: keyboardType } : {},
          keyboardLayout ? { layout: keyboardLayout } : {},
        ].filter(condition => Object.keys(condition).length > 0),
      };
    }

    if (category === "MOUSE" && dpiRange) {
      where.mouseSpec = {
        dpi: { gte: parseInt(dpiRange) },
      };
    }

    if (category === "SPEAKERS" && speakerType) {
      where.speakerSpec = {
        type: speakerType,
      };
    }

    if (category === "HEADPHONES" && headphoneType) {
      where.headphoneSpec = {
        type: headphoneType,
      };
    }

    if (category === "EXTERNAL_STORAGE") {
      where.externalStorageSpec = {
        AND: [
          storageType ? { type: storageType } : {},
          storageCapacity ? { capacity: { gte: parseInt(storageCapacity) } } : {},
          connectionType ? { interface: connectionType } : {},
        ].filter(condition => Object.keys(condition).length > 0),
      };
    }

    // Build the orderBy clause
    const orderBy: Prisma.ProductOrderByWithRelationInput = { price: "asc" };
    if (sortBy) {
      switch (sortBy) {
        case "price-desc":
          orderBy.price = "desc";
          break;
        case "name-asc":
          orderBy.name = "asc";
          break;
        case "name-desc":
          orderBy.name = "desc";
          break;
      }
    }

    const products = await db.product.findMany({
      where,
      orderBy,
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
        externalStorageSpec: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}