"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner({
  size = "md",
  className = "",
  fullPage = false,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullPage?: boolean;
}) {
  const sizeClasses = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };

  if (fullPage) {
    return <FullPageLoader />;
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-border border-t-accent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <h1 className="font-heading text-3xl text-accent tracking-wider">
          THAR
        </h1>
        <LoadingSpinner size="lg" />
      </motion.div>
    </div>
  );
}
