import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signIn } from "@/lib/auth";

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

    try {
      // Sign in with credentials
      const signInResult = await signIn("credentials", {
        redirect: false,
        id: user.id,
        phone: formattedPhone,
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }

      return NextResponse.json({ 
        success: true, 
        message: "Authentication successful" 
      });
    } catch (error) {
      console.error("[WHATSAPP_SIGNIN_ERROR]", error);
      throw error;
    }
  } catch (error) {
    console.error("[WHATSAPP_TOKEN_ERROR]", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}