"use client";

import { ParentSize } from "@visx/responsive";
import { LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { useSprings, animated } from "@react-spring/web";
import { useEffect, useMemo } from "react";
import { acquisitionFunnel } from "@/data/journey";
import { palette } from "@/lib/theme";

const AnimatedPath = animated("path");
const AnimatedText = animated("text");

function Chart({ width, height }: { width: number; height: number }) {
  const margin = { top: 16, right: 140, bottom: 16, left: 140 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  const maxValue = acquisitionFunnel[0].value;
  const widthScale = useMemo(
    () => scaleLinear<number>({ domain: [0, maxValue], range: [0, innerW] }),
    [innerW, maxValue]
  );

  const stepH = innerH / acquisitionFunnel.length;
  const gap = 4;

  // Springs animate each step's width + opacity on mount.
  const [springs, api] = useSprings(acquisitionFunnel.length, () => ({
    widthFactor: 0,
    opacity: 0,
    config: { tension: 140, friction: 22 },
  }));

  useEffect(() => {
    api.start((i: number) => ({
      widthFactor: 1,
      opacity: 1,
      delay: i * 120,
    }));
  }, [api]);

  if (width < 10) return null;

  return (
    <svg width={width} height={height} role="img" aria-label="Acquisition funnel">
      <LinearGradient id="visx-funnel-grad" from="#7c5cff" to="#22d3ee" />
      <LinearGradient id="visx-funnel-grad-fade" from="#7c5cff" to="#f472b6" fromOpacity={0.9} toOpacity={0.6} />

      <Group top={margin.top} left={margin.left}>
        {acquisitionFunnel.map((d, i) => {
          const topY = i * stepH + gap / 2;
          const botY = topY + stepH - gap;
          const next = acquisitionFunnel[i + 1];
          const wThis = widthScale(d.value);
          const wNext = next ? widthScale(next.value) : wThis * 0.65;

          const path = (factor: number) => {
            const w0 = wThis * factor;
            const w1 = wNext * factor;
            const x0 = (innerW - w0) / 2;
            const x0r = x0 + w0;
            const x1 = (innerW - w1) / 2;
            const x1r = x1 + w1;
            return `M ${x0} ${topY} L ${x0r} ${topY} L ${x1r} ${botY} L ${x1} ${botY} Z`;
          };

          const spring = springs[i];
          const isLast = i === acquisitionFunnel.length - 1;
          return (
            <g key={d.id}>
              <AnimatedPath
                d={spring.widthFactor.to((v: number) => path(v))}
                fill={isLast ? "url(#visx-funnel-grad-fade)" : "url(#visx-funnel-grad)"}
                opacity={spring.opacity}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              />
              {/* Left label */}
              <AnimatedText
                x={-16}
                y={topY + stepH / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fill={palette.fg}
                fontSize={12}
                fontFamily="var(--font-geist-sans)"
                opacity={spring.opacity}
              >
                {d.label}
              </AnimatedText>
              {/* Right value */}
              <AnimatedText
                x={innerW + 16}
                y={topY + stepH / 2 - 6}
                textAnchor="start"
                dominantBaseline="middle"
                fill={palette.fg}
                fontSize={13}
                fontWeight={600}
                fontFamily="var(--font-geist-sans)"
                opacity={spring.opacity}
              >
                {d.value >= 1_000_000
                  ? `${(d.value / 1_000_000).toFixed(2)}M`
                  : d.value >= 1_000
                  ? `${(d.value / 1_000).toFixed(0)}K`
                  : `${d.value}`}
              </AnimatedText>
              <AnimatedText
                x={innerW + 16}
                y={topY + stepH / 2 + 10}
                textAnchor="start"
                dominantBaseline="middle"
                fill={palette.muted}
                fontSize={10}
                fontFamily="var(--font-geist-sans)"
                opacity={spring.opacity}
              >
                {((d.value / maxValue) * 100).toFixed(1)}% of TOFU
              </AnimatedText>
            </g>
          );
        })}
      </Group>
    </svg>
  );
}

export function GradientFunnel() {
  return <ParentSize>{({ width, height }) => <Chart width={width} height={height} />}</ParentSize>;
}
