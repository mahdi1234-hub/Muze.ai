"use client";

import { motion } from "motion/react";
import { kpis } from "@/data/journey";

export function KPIBand() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="divider-gradient mb-8" />
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
              Executive summary
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight max-w-2xl">
              Six numbers every go-to-market leader should internalize before
              planning the next fiscal year.
            </p>
          </div>
          <div className="text-xs text-[color:var(--muted)] max-w-xs">
            Aggregates are medians across 340 participating companies, weighted
            by pipeline volume. Methodology at the end of the report.
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-xl p-5 relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[color:var(--accent)] opacity-[0.07] blur-2xl" />
              <div className="text-xs text-[color:var(--muted)]">{k.label}</div>
              <div className="text-2xl sm:text-3xl font-semibold mt-2 tracking-tight">
                {k.value}
              </div>
              <div
                className={
                  "text-xs mt-2 " +
                  (k.tone === "up"
                    ? "text-[color:var(--success)]"
                    : k.tone === "neutral"
                    ? "text-[color:var(--muted)]"
                    : "text-[color:var(--danger)]")
                }
              >
                {k.delta}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="divider-gradient mt-10" />
      </div>
    </section>
  );
}
