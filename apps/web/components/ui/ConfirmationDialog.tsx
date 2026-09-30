"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import Button from "./Button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onCancel}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-2xl"
          >
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {variant === "danger" && (
              <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-error/10">
                <AlertTriangle size={24} className="text-error" />
              </div>
            )}

            <h3 className="text-lg font-semibold text-text-main mb-2">
              {title}
            </h3>
            <p className="text-sm text-text-muted mb-6">{message}</p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                disabled={isLoading}
              >
                {cancelLabel}
              </Button>
              <Button
                variant={variant === "danger" ? "danger" : "primary"}
                size="sm"
                onClick={onConfirm}
                isLoading={isLoading}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
