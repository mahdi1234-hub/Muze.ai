"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleLinear, scaleBand } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { motion } from "motion/react";
import { cohortFlow } from "@/data/journey";
import { palette } from "@/lib/theme";

function Chart({ width, height }: { width: number; height: number }) {
  if (width < 10) return null;
  const margin = { top: 24, right: 20, bottom: 36, left: 80 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  const months = Array.from({ length: cohortFlow[0].months.length }, (_, i) => i);

  const x = scaleBand<number>({ domain: months, range: [0, innerW], padding: 0.22 });
  const y = scaleBand<string>({
    domain: cohortFlow.map((c) => c.cohort),
    range: [0, innerH],
    padding: 0.2,
  });
  const maxVal = Math.max(...cohortFlow.flatMap((c) => c.months.map((m) => m.active)));
  const fillScale = scaleLinear<string>({
    domain: [0, maxVal / 2, maxVal],
    range: ["#1e1b4b", "#6366f1", "#c4b4ff"],
  });

  const cellH = y.bandwidth();
  const cellW = x.bandwidth();

  return (
    <svg width={width} height={height}>
      <LinearGradient id="cohort-sheen" from="rgba(255,255,255,0.25)" to="rgba(255,255,255,0)" vertical />
      <Group left={margin.left} top={margin.top}>
        {cohortFlow.map((row, ri) =>
          row.months.map((m) => {
            const xv = x(m.month) ?? 0;
            const yv = y(row.cohort) ?? 0;
            const pct = m.active / row.months[0].active;
            return (
              <g key={`${row.cohort}-${m.month}`}>
                <motion.rect
                  x={xv}
                  y={yv}
                  width={cellW}
                  height={cellH}
                  rx={6}
                  fill={fillScale(m.active)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (ri + m.month) * 0.04 }}
                />
                <rect
                  x={xv}
                  y={yv}
                  width={cellW}
                  height={cellH / 3}
                  rx={6}
                  fill="url(#cohort-sheen)"
                  pointerEvents="none"
                />
                <text
                  x={xv + cellW / 2}
                  y={yv + cellH / 2 - 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={palette.fg}
                  fontSize={11}
                  fontWeight={600}
                  fontFamily="var(--font-geist-sans)"
                >
                  {m.active}
                </text>
                <text
                  x={xv + cellW / 2}
                  y={yv + cellH / 2 + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={palette.muted}
                  fontSize={9}
                  fontFamily="var(--font-geist-sans)"
                >
                  {(pct * 100).toFixed(0)}%
                </text>
              </g>
            );
          })
        )}
        <AxisLeft
          scale={y}
          stroke={palette.edge}
          tickStroke={palette.edge}
          tickLabelProps={{
            fill: palette.muted,
            fontSize: 11,
            textAnchor: "end",
            dx: -6,
            dy: 3,
            fontFamily: "var(--font-geist-sans)",
          }}
        />
        <AxisBottom
          top={innerH}
          scale={x}
          stroke={palette.edge}
          tickStroke={palette.edge}
          tickFormat={(v: number) => `M${v}`}
          tickLabelProps={{
            fill: palette.muted,
            fontSize: 10,
            textAnchor: "middle",
            fontFamily: "var(--font-geist-sans)",
          }}
        />
      </Group>
    </svg>
  );
}

export function CohortFlow() {
  return <ParentSize>{({ width, height }) => <Chart width={width} height={height} />}</ParentSize>;
}
