"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ErrorState({
  title = "Something went wrong",
  description = "An error occurred. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="mb-4 text-error/60">
        <AlertTriangle size={48} />
      </div>
      <h3 className="text-lg font-medium text-text-main mb-1">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm mb-4">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
