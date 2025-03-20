import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as jose from 'jose';

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone number and OTP are required" }, { status: 400 });
    }

    // Format phone number
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

    // Verify OTP
    const storedOTP = await db.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: formattedPhone,
          token: otp
        }
      }
    });

    if (!storedOTP) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Check if OTP is expired
    if (new Date() > storedOTP.expires) {
      await db.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: formattedPhone,
            token: otp
          }
        }
      });
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Delete used OTP
    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: formattedPhone,
          token: otp
        }
      }
    });

    // Find or create user
    let user = await db.user.findFirst({
      where: { phone: formattedPhone }
    });

    if (!user) {
      user = await db.user.create({
        data: {
          phone: formattedPhone,
          role: "USER",
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Authentication successful",
      user
    });
  } catch (error) {
    console.error("[WHATSAPP_TOKEN_ERROR]", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const token = req.url.split('token=')[1];
  if (!token) {
    return new NextResponse('Token not found', { status: 400 });
  }

  try {
    const payload = await jose.jwtVerify(token, new TextEncoder().encode(process.env.NEXTAUTH_SECRET!));
    
    // Use the payload to find the user
    const user = await db.user.findUnique({
      where: { id: payload.payload.sub as string }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error verifying token:', error);
    return new NextResponse('Invalid token', { status: 400 });
  }
}