"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "No data to display at the moment.",
  icon,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="mb-4 text-text-muted/40">
        {icon || <Film size={48} />}
      </div>
      <h3 className="text-lg font-medium text-text-main mb-1">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm">{description}</p>
    </motion.div>
  );
}
