"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    num: "01",
    title: "Emerging Voices",
    desc: "A curated platform dedicated exclusively to student filmmakers and independent auteurs.",
  },
  {
    num: "02",
    title: "Collaborative Spirit",
    desc: "Form crews, share resources, and build the next generation of cinematic partnerships.",
  },
  {
    num: "03",
    title: "Creative Freedom",
    desc: "No restrictive themes. We champion unfiltered, authentic storytelling across all genres.",
  },
  {
    num: "04",
    title: "Industry Recognition",
    desc: "Get your work reviewed by our jury and compete for the prestigious Golden Dune Honors.",
  },
];

export default function HighlightsSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/40 pb-8">
          <div>
            <span className="text-accent text-xs uppercase tracking-widest font-mono mb-4 block">
              The Experience
            </span>
            <h2 className="font-heading text-5xl md:text-7xl leading-none">
              FESTIVAL <span className="text-text-muted">HIGHLIGHTS</span>
            </h2>
          </div>
          <p className="text-text-muted max-w-sm text-sm font-light leading-relaxed">
            Discover what makes Thar Film Festival the premier destination for
            the next generation of cinema.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
        >
          {highlights.map((highlight) => (
            <motion.div
              key={highlight.num}
              variants={item}
              className="group relative"
            >
              <div className="flex gap-6 items-start">
                <span className="text-sm font-mono text-border font-light tracking-widest group-hover:text-accent transition-colors duration-500">
                  {highlight.num}
                </span>
                <div>
                  <h3 className="text-2xl font-heading mb-3 tracking-wide text-text-main group-hover:text-white transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  <p className="text-text-muted font-light leading-relaxed text-sm">
                    {highlight.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
