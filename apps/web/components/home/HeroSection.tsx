"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const lineVariants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.8 },
    },
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
      {/* Absolute minimal background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center w-full"
        >
          {/* Eyebrow */}
          <motion.div className="overflow-hidden mb-8">
            <motion.p
              variants={lineVariants}
              className="text-accent text-[10px] sm:text-xs tracking-[0.4em] uppercase font-mono font-medium"
            >
              The Art of Storytelling
            </motion.p>
          </motion.div>

          {/* Main Headline */}
          <div className="flex flex-col items-center gap-1 sm:gap-2 mb-10 w-full">
            <div className="overflow-hidden">
              <motion.h1
                variants={lineVariants}
                className="font-heading text-[5.5rem] sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tight text-text-main"
              >
                EVERY FRAME
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineVariants}
                className="font-heading text-[5.5rem] sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tight"
              >
                TELLS A <span className="text-accent">STORY.</span>
              </motion.h1>
            </div>
          </div>

          {/* Subheading & CTA container */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col items-center w-full max-w-xl mx-auto gap-12 mt-4"
          >
            <p className="text-text-muted text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Where stories come alive, visions collide, and cinema finds its
              voice. An independent platform for visionary filmmakers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-text-main text-bg-primary font-mono font-medium text-[11px] uppercase tracking-[0.2em] hover:bg-accent hover:text-bg-primary transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Submit Your Film
                <ArrowRight size={14} />
              </Link>

              <Link
                href="#about"
                className="w-full sm:w-auto px-10 py-4 rounded-full border border-border text-text-muted font-mono text-[11px] uppercase tracking-[0.2em] hover:text-text-main hover:border-text-main transition-all duration-300 flex items-center justify-center"
              >
                Explore Festival
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical subtle line decoration */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          delay: 1.2,
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="absolute bottom-0 left-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-border origin-bottom"
      />
    </section>
  );
}
