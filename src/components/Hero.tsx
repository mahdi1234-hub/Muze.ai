"use client";

import { motion } from "motion/react";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useMemo } from "react";
import { studyMeta } from "@/data/journey";

function Counter({ to, format }: { to: number; format: (n: number) => string }) {
  const [styles, api] = useSpring(() => ({ n: 0, config: { tension: 80, friction: 22 } }));
  useEffect(() => {
    api.start({ n: to });
  }, [api, to]);
  return (
    <animated.span>{styles.n.to((v) => format(v))}</animated.span>
  );
}

export function Hero() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: (i * 83) % 100,
        top: (i * 47) % 100,
        size: 140 + (i % 5) * 40,
        delay: (i % 7) * 0.4,
      })),
    []
  );

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        {orbs.map((o, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              left: `${o.left}%`,
              top: `${o.top}%`,
              width: o.size,
              height: o.size,
              background:
                i % 3 === 0
                  ? "radial-gradient(circle, rgba(124,92,255,0.45), transparent 60%)"
                  : i % 3 === 1
                  ? "radial-gradient(circle, rgba(34,211,238,0.3), transparent 60%)"
                  : "radial-gradient(circle, rgba(244,114,182,0.25), transparent 60%)",
            }}
            animate={{ y: [0, -20, 0], x: [0, 14, 0] }}
            transition={{ duration: 14 + i, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 pt-20 pb-28 sm:pt-28 sm:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-[color:var(--muted)]">
            <span className="brand-dot" />
            <span>Muze.ai · Annual Report · {studyMeta.windowStart}–{studyMeta.windowEnd}</span>
          </div>
          <h1 className="mt-6 text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.02]">
            The Customer Journey,
            <br />
            <span className="text-gradient">rewritten in data.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[color:var(--muted)] max-w-2xl leading-relaxed">
            An interactive case study of{" "}
            <span className="text-white font-medium">8.24M anonymized journeys</span>{" "}
            across{" "}
            <span className="text-white font-medium">{studyMeta.companies} B2B SaaS companies</span>.
            Scroll to watch the data reveal what modern customers actually do
            between first impression and signed contract.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {[
              { k: "Journeys", v: 8_243_117, fmt: (n: number) => `${(n / 1e6).toFixed(2)}M` },
              { k: "Companies", v: 340, fmt: (n: number) => `${Math.round(n)}` },
              { k: "Verticals", v: 9, fmt: (n: number) => `${Math.round(n)}` },
              { k: "Touchpoints / journey", v: 27.4, fmt: (n: number) => n.toFixed(1) },
            ].map((s) => (
              <div key={s.k} className="glass rounded-xl p-4">
                <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  <Counter to={s.v} format={s.fmt} />
                </div>
                <div className="text-xs text-[color:var(--muted)] mt-1">{s.k}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-[color:var(--muted)]">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" className="animate-bounce">
                <path d="M7 1v10M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Scroll to begin
            </div>
            <span className="opacity-40">·</span>
            <span>Reading time ~7 min</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
