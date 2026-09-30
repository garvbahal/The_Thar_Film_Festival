"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-48 bg-bg-primary overflow-hidden border-t border-border/40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col items-center"
        >
          <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-mono mb-8 block">
            Final Call
          </span>

          <h2 className="font-heading text-6xl sm:text-8xl md:text-[8rem] leading-[0.85] tracking-tight mb-12">
            YOUR STORY <br />
            <span className="text-text-muted">STARTS HERE.</span>
          </h2>

          <Link
            href="/signup"
            className="relative group overflow-hidden rounded-full p-[1px]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="relative bg-bg-secondary border border-border group-hover:border-accent/50 px-10 py-5 rounded-full transition-colors duration-500 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-text-main group-hover:text-accent transition-colors duration-300">
                Register Now
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
