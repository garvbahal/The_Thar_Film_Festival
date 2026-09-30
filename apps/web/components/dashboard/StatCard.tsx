"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent?: boolean;
}

export default function StatCard({
  label,
  value,
  icon,
  accent = false,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "bg-bg-card border rounded-xl p-5 relative overflow-hidden transition-all duration-200",
        accent
          ? "border-accent/20"
          : "border-border hover:border-text-muted/30",
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm text-text-muted font-medium">{label}</h3>
        <div className="text-text-muted/40">{icon}</div>
      </div>

      <div
        className={cn(
          "text-2xl font-semibold",
          accent ? "text-accent" : "text-text-main",
        )}
      >
        {value}
      </div>

      {accent && (
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent/5 rounded-full blur-xl" />
      )}
    </motion.div>
  );
}
