"use client";

import { motion } from "motion/react";
import { studyMeta } from "@/data/journey";

const stack = [
  { layer: "Scrollytelling", lib: "react-scrollama", purpose: "IntersectionObserver-driven step changes" },
  { layer: "Charts", lib: "Nivo", purpose: "Bar, Pie, Treemap, Heatmap, Sankey, Bump, Stream, Calendar, Radar, Chord, Funnel" },
  { layer: "Custom viz", lib: "Visx (Airbnb)", purpose: "Gradient area, animated funnel, attribution network, cohort flow" },
  { layer: "Animation", lib: "Motion (framer)", purpose: "Chart transitions, layout animations, page reveals" },
  { layer: "Physics", lib: "@react-spring/web", purpose: "Counter animation, organic funnel bloom" },
  { layer: "Low-level", lib: "d3", purpose: "Scales, bisectors, color interpolation" },
];

export function Methodology() {
  return (
    <section id="methodology" className="relative py-24 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] font-mono">
              Methodology
            </div>
            <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
              How this case study was built.
            </h2>
            <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
              We aggregated anonymized event streams from {studyMeta.companies} B2B SaaS
              companies between {studyMeta.windowStart} and {studyMeta.windowEnd}. All
              numbers are medians weighted by pipeline volume. No individual
              customer data leaves its environment; Muze.ai only receives
              cohort-level aggregates computed at the source.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              {[
                ["Sample size", `${(studyMeta.sampleSize / 1e6).toFixed(2)}M journeys`],
                ["Window", `${studyMeta.windowStart} – ${studyMeta.windowEnd}`],
                ["Verticals", `${studyMeta.verticals}`],
                ["Regions", `${studyMeta.regions}`],
                ["Median touchpoints", studyMeta.touchpointsPerJourney.toFixed(1)],
                ["Median time to convert", studyMeta.medianTimeToConvert],
              ].map(([k, v]) => (
                <div key={k} className="glass rounded-lg px-4 py-3">
                  <div className="text-[11px] text-[color:var(--muted)]">{k}</div>
                  <div className="text-sm mt-1 font-medium">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
                    Technical stack
                  </div>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">
                    The data storytelling pipeline
                  </h3>
                </div>
                <span className="kbd">Next.js 16 · React 19</span>
              </div>
              <div className="divide-y divide-white/5">
                {stack.map((row, i) => (
                  <motion.div
                    key={row.layer}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="grid grid-cols-12 gap-4 py-4 items-center"
                  >
                    <div className="col-span-3 text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
                      {row.layer}
                    </div>
                    <div className="col-span-4 font-mono text-sm">{row.lib}</div>
                    <div className="col-span-5 text-[13px] text-[color:var(--muted)]">
                      {row.purpose}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
