"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function WhatsAppAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/whatsapp/authorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/whatsapp/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to verify OTP");
      }

      toast.success("Logged in successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!otpSent ? (
        <div className="flex gap-2">
          <Input
            type="tel"
            placeholder="WhatsApp number (with country code)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendOTP} 
            disabled={isLoading}
            style={{ backgroundColor: "#25D366" }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="mr-2">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.1497 4.76803 21.1572 5.81934 22.8728L4.65801 27.3419L9.12717 26.1806C10.8428 27.232 12.8503 27.8462 16 27.8462Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12.4239 9.71247C12.1033 9.01338 11.7576 9.00867 11.4413 9.00461C11.1761 9.00113 10.8748 9.00157 10.5735 9.00157C10.2722 9.00157 9.7861 9.11023 9.37577 9.56513C8.96544 10.02 7.94232 10.9722 7.94232 12.9089C7.94232 14.8456 9.40577 16.7213 9.60656 17.0242C9.80736 17.3272 12.3331 21.6394 16.5208 23.2202C19.9901 24.5443 20.7021 24.2202 21.4596 24.1595C22.2171 24.0989 23.8819 23.1874 24.2329 22.1935C24.5838 21.1997 24.5838 20.3473 24.4834 20.1862C24.383 20.0251 24.0817 19.9241 23.6297 19.722C23.1777 19.52 21.2576 18.5675 20.8473 18.4258C20.437 18.2842 20.1357 18.2134 19.8344 18.6683C19.5331 19.1232 18.7857 19.9947 18.5248 20.2977C18.2638 20.6006 18.0029 20.636 17.5509 20.4339C17.0989 20.2319 15.8387 19.8107 14.3398 18.4662C13.1814 17.4218 12.4137 16.1272 12.1528 15.6723C11.8918 15.2174 12.1224 14.9750 12.3429 14.7528C12.5403 14.5537 12.7829 14.2341 13.0034 13.9716C13.2238 13.709 13.2943 13.5266 13.4346 13.2236C13.575 12.9206 13.5246 12.6581 13.4141 12.4561C13.3036 12.2541 12.4239 9.71247 12.4239 9.71247Z" fill="white"/>
            </svg>
            Send OTP
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleVerifyOTP} 
            disabled={isLoading}
            style={{ backgroundColor: "#25D366" }}
          >
            Verify
          </Button>
        </div>
      )}
    </div>
  );
}