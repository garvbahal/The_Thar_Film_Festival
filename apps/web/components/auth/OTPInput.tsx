"use client";
import React, { useRef, useState, useEffect } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

export default function OTPInput({
  value,
  onChange,
  error = false,
  disabled = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const chars = value.split("");
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = chars[i] || "";
    }
    setOtp(newOtp);
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pasteData.some((char) => isNaN(Number(char)))) return;

    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    onChange(newOtp.join(""));

    const focusIndex = Math.min(pasteData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-between items-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={data}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-12 h-14 text-center text-xl font-medium bg-bg-card border rounded-lg focus:outline-none transition-colors
            ${error ? "border-error text-error" : "border-border text-text-main focus:border-accent"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />
      ))}
    </div>
  );
}
