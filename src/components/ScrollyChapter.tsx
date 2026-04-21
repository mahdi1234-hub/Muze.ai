"use client";

import { ReactNode, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import { motion, AnimatePresence } from "motion/react";

export type ScrollyStep = {
  id: string;
  eyebrow?: string;
  title: string;
  body: ReactNode;
  stat?: { value: string; label: string };
};

export function ScrollyChapter({
  id,
  eyebrow,
  title,
  lede,
  steps,
  render,
  offset = 0.55,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  steps: ScrollyStep[];
  render: (index: number) => ReactNode;
  offset?: number;
}) {
  const [active, setActive] = useState(0);

  return (
    <section id={id} className="relative scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-6">
        <div className="flex items-start justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] font-mono">
              {eyebrow}
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight max-w-3xl">
              {title}
            </h2>
            <p className="mt-4 text-[color:var(--muted)] max-w-2xl leading-relaxed">
              {lede}
            </p>
          </div>
          <div className="glass rounded-full px-3 py-1.5 text-xs text-[color:var(--muted)] flex items-center gap-2">
            <span className="brand-dot" />
            Chapter · scrollytelling
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          {/* Sticky stage */}
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <div className="sticky top-20">
              <div className="relative glass-strong rounded-2xl overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
                <div className="relative p-5 sm:p-8 h-[72vh] min-h-[520px] flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
                      Step {active + 1} of {steps.length}
                    </div>
                    <div className="flex items-center gap-1">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className={
                            "h-[3px] rounded-full transition-all " +
                            (i === active
                              ? "bg-[color:var(--accent)] w-8"
                              : i < active
                              ? "bg-white/40 w-4"
                              : "bg-white/10 w-4")
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="absolute inset-0"
                      >
                        {render(active)}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling steps */}
          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
            <Scrollama
              offset={offset}
              onStepEnter={({ data }: { data: number }) => setActive(data)}
            >
              {steps.map((s, i) => (
                <Step data={i} key={s.id}>
                  <div className="min-h-[70vh] flex items-center">
                    <motion.div
                      initial={{ opacity: 0.5, y: 10 }}
                      animate={{
                        opacity: i === active ? 1 : 0.4,
                        y: i === active ? 0 : 6,
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-full"
                    >
                      <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)] font-mono mb-3">
                        {s.eyebrow ?? `Beat ${String(i + 1).padStart(2, "0")}`}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        {s.title}
                      </h3>
                      <div className="mt-4 text-[color:var(--muted)] leading-relaxed text-[15px]">
                        {s.body}
                      </div>
                      {s.stat && (
                        <div className="mt-5 glass rounded-xl p-4 inline-block">
                          <div className="text-3xl font-semibold tracking-tight">
                            {s.stat.value}
                          </div>
                          <div className="text-xs text-[color:var(--muted)] mt-1">
                            {s.stat.label}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </Step>
              ))}
            </Scrollama>
          </div>
        </div>
      </div>
    </section>
  );
}
