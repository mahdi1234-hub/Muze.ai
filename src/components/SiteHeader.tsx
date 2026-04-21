"use client";

import { motion } from "motion/react";
import Link from "next/link";

const nav = [
  { href: "#awareness", label: "Awareness" },
  { href: "#acquisition", label: "Acquisition" },
  { href: "#activation", label: "Activation" },
  { href: "#conversion", label: "Conversion" },
  { href: "#retention", label: "Retention" },
  { href: "#advocacy", label: "Advocacy" },
  { href: "#insights", label: "Insights" },
];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 glass-strong"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="brand-dot" />
          <span className="font-semibold tracking-tight">
            muze<span className="text-[color:var(--accent)]">.ai</span>
          </span>
          <span className="hidden sm:inline text-xs text-[color:var(--muted)] ml-2">
            Customer Journey Report · 2026
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-[13px]">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3 py-1.5 rounded-md text-[color:var(--muted)] hover:text-white hover:bg-white/5 transition"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[11px] text-[color:var(--muted)]">
            Press <span className="kbd">S</span> to scroll
          </span>
          <a
            href="#cta"
            className="text-[13px] px-3 py-1.5 rounded-md bg-white text-black font-medium hover:bg-white/90 transition"
          >
            Book a walkthrough
          </a>
        </div>
      </div>
    </motion.header>
  );
}
