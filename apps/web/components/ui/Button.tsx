"use client";

import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: ReactNode;
}

const variants = {
  primary:
    "bg-accent text-bg-primary hover:bg-accent-secondary font-semibold glow-yellow",
  secondary:
    "bg-transparent border border-border text-text-main hover:border-accent hover:text-accent",
  ghost:
    "bg-transparent text-text-muted hover:text-text-main hover:bg-bg-elevated",
  danger: "bg-error/10 text-error border border-error/20 hover:bg-error/20",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg
        font-body tracking-wide transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={disabled || isLoading}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : icon ? (
        icon
      ) : null}
      {children}
    </motion.button>
  );
}
