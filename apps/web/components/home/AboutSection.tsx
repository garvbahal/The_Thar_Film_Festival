"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="about"
      className="py-32 md:py-48 bg-bg-primary relative border-t border-border/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start"
        >
          {/* Left: Oversized Typography */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-xs uppercase tracking-widest font-mono text-text-muted">
                The Philosophy
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight"
            >
              MORE THAN A <br />
              <span className="text-text-muted">FILM FESTIVAL.</span>
            </motion.h2>
          </div>

          {/* Right: Copy & Quote */}
          <div className="lg:col-span-5 lg:pt-16">
            <motion.div variants={fadeUp} className="space-y-8">
              <p className="text-text-main/80 font-light leading-relaxed text-lg sm:text-xl">
                We believe in the raw, unpolished power of independent cinema.
                Thar Film Festival is a sanctuary for student filmmakers and
                visionaries who dare to disrupt the narrative.
              </p>
              <p className="text-text-muted font-light leading-relaxed text-sm sm:text-base">
                From the initial spark of an idea to the final cut in the
                editing room, we celebrate the arduous, beautiful process of
                visual storytelling. Bring your perspective. We provide the
                screen.
              </p>

              {/* Minimalist Quote */}
              <div className="pt-8 border-t border-border/50 mt-12">
                <blockquote className="text-xl sm:text-2xl font-light italic text-text-main leading-tight mb-4">
                  "Cinema is a matter of what's in the frame and what's out."
                </blockquote>
                <cite className="text-xs uppercase tracking-widest text-accent font-mono not-italic block">
                  — Martin Scorsese
                </cite>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
