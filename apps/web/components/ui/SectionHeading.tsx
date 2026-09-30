"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";

  // Split the title and insert the highlight with accent color
  const renderTitle = () => {
    if (!highlight) {
      return <span>{title}</span>;
    }
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-accent">{highlight}</span>
        {parts[1] || ""}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignClass} ${className}`}
    >
      {eyebrow && (
        <span className="text-accent text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-main leading-[0.95] tracking-wide">
        {renderTitle()}
      </h2>
      {description && (
        <p className="mt-4 sm:mt-6 text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-6 w-12 h-0.5 bg-accent/40 rounded-full" />
    </motion.div>
  );
}
