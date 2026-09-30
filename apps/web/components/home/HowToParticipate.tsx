"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "ASSEMBLE YOUR CREW",
    desc: "Register individually or create a team of up to 6 members. Assign roles and start pre-production.",
  },
  {
    title: "SHOOT & EDIT",
    desc: "Bring your vision to life. No thematic restrictions. Just pure, unadulterated storytelling.",
  },
  {
    title: "SUBMIT YOUR FILM",
    desc: "Upload your final cut to YouTube or Drive and submit the link through your dashboard before the deadline.",
  },
];

export default function HowToParticipate() {
  return (
    <section
      id="process"
      className="py-32 bg-bg-primary relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <span className="text-accent text-xs uppercase tracking-widest font-mono mb-4 block">
            The Process
          </span>
          <h2 className="font-heading text-5xl md:text-7xl leading-none">
            HOW TO <span className="text-text-muted">PARTICIPATE</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-[1px] bg-border"
          />

          <div className="space-y-24 relative">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""} group`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 top-1 w-2 h-2 rounded-full bg-bg-primary border border-accent z-10 group-hover:bg-accent transition-colors duration-300" />

                  {/* Content Container */}
                  <div
                    className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <span className="text-border font-mono text-sm tracking-widest block mb-2">{`PHASE 0${idx + 1}`}</span>
                      <h3 className="font-heading text-3xl md:text-4xl tracking-wide mb-4">
                        {step.title}
                      </h3>
                      <p className="text-text-muted font-light text-sm leading-relaxed max-w-sm ml-0 md:ml-auto">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
