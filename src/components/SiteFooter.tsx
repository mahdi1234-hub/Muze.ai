"use client";

import { motion } from "motion/react";

export function SiteFooter() {
  return (
    <footer id="cta" className="relative py-24 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          className="relative glass-strong rounded-3xl overflow-hidden p-10 sm:p-16 text-center"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-30 blur-3xl"
               style={{ background: "radial-gradient(circle, rgba(124,92,255,0.5), transparent 60%)" }} />
          <div className="relative">
            <span className="brand-dot mx-auto inline-block" />
            <h2 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight">
              See <span className="text-gradient">your</span> customer journey
              <br />
              through the same lens.
            </h2>
            <p className="mt-5 text-[color:var(--muted)] max-w-xl mx-auto">
              Muze.ai instruments every touchpoint, stitches identity across
              channels, and turns your pipeline into a story your board will
              actually remember.
            </p>
            <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
              <a
                href="#"
                className="px-5 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
              >
                Book a 30-min walkthrough
              </a>
              <a
                href="#"
                className="px-5 py-3 rounded-xl glass hover:bg-white/10 transition"
              >
                Download the report (PDF)
              </a>
            </div>
            <div className="mt-10 text-[11px] text-[color:var(--muted)]">
              © {new Date().getFullYear()} Muze.ai · Customer Journey Report · Data as of Sep 2026 · 
              <a href="https://github.com/mahdi1234-hub/Muze.ai" className="underline hover:text-white ml-1">
                Source on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
