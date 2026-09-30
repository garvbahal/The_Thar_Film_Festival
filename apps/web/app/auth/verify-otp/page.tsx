"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OTPInput from "../../../components/auth/OTPInput";
import Button from "../../../components/ui/Button";
import { useVerifyOtp } from "../../../hooks/auth.hooks";
import toast from "react-hot-toast";
import axios from "axios";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail) {
      router.replace("/signup");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const { mutate, isPending } = useVerifyOtp();

  const onSubmit = () => {
    mutate(
      {
        email,
        otp,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          router.replace("/");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message || "Something went wrong");
          } else {
            toast.error("Something went wrong");
          }
        },
      },
    );
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6">
      <div className="bg-bg-card border border-border rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="font-heading text-accent text-2xl tracking-widest mb-6">
            THAR
          </div>
          <h1 className="font-heading text-2xl text-text-main mb-2 tracking-wider">
            VERIFY YOUR EMAIL
          </h1>
          <p className="text-text-muted text-sm px-4">
            We sent a verification code to{" "}
            <span className="text-text-main font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-center">
            <OTPInput value={otp} onChange={setOtp} disabled={isPending} />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isPending}
            disabled={otp.length !== 6}
          >
            VERIFY
          </Button>
        </form>
      </div>
    </div>
  );
}
