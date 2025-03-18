import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_API_VERSION = 'v18.0'; // Current stable version

// Rate limiting map: phone -> { timestamp, attempts }
const rateLimitMap = new Map<string, { timestamp: number; attempts: number }>();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Format phone number
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    // Basic phone number validation
    if (!/^\+[1-9]\d{6,14}$/.test(formattedPhone)) {
      return NextResponse.json({ 
        error: "Invalid phone number format. Please include country code (e.g., +1234567890)" 
      }, { status: 400 });
    }

    // Check rate limiting
    const now = Date.now();
    const rateLimit = rateLimitMap.get(formattedPhone);
    
    if (rateLimit) {
      // Reset attempts if last attempt was more than 30 minutes ago
      if (now - rateLimit.timestamp > 30 * 60 * 1000) {
        rateLimitMap.set(formattedPhone, { timestamp: now, attempts: 1 });
      } else if (rateLimit.attempts >= 3) {
        const timeLeft = Math.ceil((30 * 60 * 1000 - (now - rateLimit.timestamp)) / 60000);
        return NextResponse.json({ 
          error: `Too many attempts. Please try again in ${timeLeft} minutes.` 
        }, { status: 429 });
      } else {
        rateLimitMap.set(formattedPhone, { 
          timestamp: rateLimit.timestamp, 
          attempts: rateLimit.attempts + 1 
        });
      }
    } else {
      rateLimitMap.set(formattedPhone, { timestamp: now, attempts: 1 });
    }

    // Check for existing unexpired OTP
    const existingOTP = await db.verificationToken.findFirst({
      where: {
        identifier: formattedPhone,
        expires: { gt: new Date() }
      }
    });

    if (existingOTP) {
      const timeLeft = Math.ceil((existingOTP.expires.getTime() - Date.now()) / 60000);
      return NextResponse.json({ 
        error: `Please wait ${timeLeft} minutes before requesting a new OTP` 
      }, { status: 400 });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing expired OTPs for this phone
    await db.verificationToken.deleteMany({
      where: {
        identifier: formattedPhone,
        expires: { lte: new Date() }
      }
    });

    // Store OTP in database with expiry
    await db.verificationToken.create({
      data: {
        identifier: formattedPhone,
        token: otp,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
      },
    });

    try {
      // Send OTP via WhatsApp Cloud API
      const response = await fetch(
        `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: formattedPhone,
            type: "template",
            template: {
              name: "otp_login",
              language: {
                code: "en"
              },
              components: [
                {
                  type: "body",
                  parameters: [
                    {
                      type: "text",
                      text: otp
                    }
                  ]
                }
              ]
            }
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to send WhatsApp message');
      }

      return NextResponse.json({ 
        success: true, 
        message: "OTP sent successfully"
      });
    } catch (error) {
      console.error("[WHATSAPP_API_ERROR]", error);
      // Delete the stored OTP if message sending fails
      await db.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: formattedPhone,
            token: otp
          }
        }
      });
      throw error;
    }
  } catch (error) {
    console.error("[WHATSAPP_AUTH_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}