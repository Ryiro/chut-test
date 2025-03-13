import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Export runtime configuration for the route
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size should be less than 5MB' },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG and WebP images are allowed' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with extension
    const timestamp = Date.now();
    const originalName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const extension = path.extname(originalName);
    const basename = path.basename(originalName, extension);
    const uniqueFileName = `${timestamp}-${basename}${extension}`;
    
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'product-images');
      // Ensure upload directory exists
      await mkdir(uploadDir, { recursive: true });
      
      const imagePath = path.join(uploadDir, uniqueFileName);
      await writeFile(imagePath, buffer);
      
      // Return the public URL path
      return NextResponse.json({ path: `/product-images/${uniqueFileName}` });
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json(
        { error: 'Error saving file' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}