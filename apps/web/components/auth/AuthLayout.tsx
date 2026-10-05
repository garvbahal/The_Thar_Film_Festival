"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-bg-primary">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col relative bg-bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary/50 to-bg-secondary/50" />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col h-full p-12 justify-between"
        >
          <Link
            href={"/"}
            className="font-heading text-accent text-4xl tracking-wider"
          >
            THAR
          </Link>
          <div className="max-w-md mt-auto mb-auto">
            <h1 className="font-heading text-4xl md:text-5xl text-text-main/80 leading-tight uppercase">
              Stories begin with a single frame.
            </h1>
            <div className="w-16 h-1 bg-accent mt-6" />
          </div>
          <div /> {/* Spacer for flex layout */}
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-6 bg-bg-primary">
        <div className="w-full max-w-md mx-auto">{children}</div>
      </div>
    </div>
  );
}
