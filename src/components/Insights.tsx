"use client";

import { motion } from "motion/react";
import { keyInsights, recommendations } from "@/data/journey";

export function Insights() {
  return (
    <section id="insights" className="relative py-24 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] font-mono">
              07 · So what
            </div>
            <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
              Four shifts that show up in every winning go-to-market motion.
            </h2>
            <p className="mt-4 text-[color:var(--muted)] leading-relaxed max-w-md">
              Across hundreds of enterprise teams, the same patterns separate the
              top decile from the rest. None are surprising in isolation. Stacked,
              they rewrite the operating model.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {keyInsights.map((ins, i) => (
              <motion.div
                key={ins.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[color:var(--accent)] opacity-[0.06] blur-3xl" />
                <div className="text-[11px] font-mono text-[color:var(--muted)] uppercase tracking-widest">
                  Finding {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{ins.title}</h3>
                <p className="mt-3 text-[13px] text-[color:var(--muted)] leading-relaxed">
                  {ins.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="divider-gradient mt-20 mb-12" />

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] font-mono">
              Recommendations
            </div>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">
              Where to place the next four bets.
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
                    <th className="px-5 py-3 font-normal">Phase</th>
                    <th className="px-5 py-3 font-normal">Tactic</th>
                    <th className="px-5 py-3 font-normal">Why it works</th>
                    <th className="px-5 py-3 font-normal">Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((r, i) => (
                    <tr
                      key={r.tactic}
                      className={
                        "border-t border-white/5 " +
                        (i % 2 === 0 ? "bg-white/0" : "bg-white/[0.015]")
                      }
                    >
                      <td className="px-5 py-4 align-top">
                        <span className="text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
                          {r.phase}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium">{r.tactic}</td>
                      <td className="px-5 py-4 text-[color:var(--muted)]">{r.why}</td>
                      <td className="px-5 py-4 text-[color:var(--muted)]">{r.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
