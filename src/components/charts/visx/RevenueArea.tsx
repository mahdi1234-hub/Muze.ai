"use client";

import { AreaClosed, LinePath, Bar } from "@visx/shape";
import { scaleLinear, scalePoint } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { curveMonotoneX } from "@visx/curve";
import { GlyphCircle } from "@visx/glyph";
import { useTooltip, defaultStyles, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { bisector } from "d3";
import { useCallback, useMemo } from "react";
import { revenueArea } from "@/data/journey";
import { palette } from "@/lib/theme";

type Datum = { month: string; revenue: number };

const tooltipStyles = {
  ...defaultStyles,
  background: "#0f0f18",
  color: palette.fg,
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "10px 12px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  fontSize: 12,
};

function Chart({ width, height }: { width: number; height: number }) {
  const margin = { top: 20, right: 24, bottom: 36, left: 52 };
  const xMax = Math.max(0, width - margin.left - margin.right);
  const yMax = Math.max(0, height - margin.top - margin.bottom);

  const x = useMemo(
    () =>
      scalePoint<string>({
        domain: revenueArea.map((d) => d.month),
        range: [0, xMax],
        padding: 0.1,
      }),
    [xMax]
  );

  const maxY = Math.max(...revenueArea.map((d) => d.revenue));
  const y = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, maxY * 1.12],
        range: [yMax, 0],
        nice: true,
      }),
    [yMax, maxY]
  );

  const bisect = useMemo(() => bisector<Datum, number>((d) => x(d.month) ?? 0).left, [x]);
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    showTooltip,
    hideTooltip,
  } = useTooltip<Datum>();

  const handleTooltip = useCallback(
    (event: React.PointerEvent<SVGRectElement>) => {
      const { x: mx } = localPoint(event) || { x: 0 };
      const adjusted = mx - margin.left;
      const index = bisect(revenueArea, adjusted, 1);
      const d0 = revenueArea[index - 1];
      const d1 = revenueArea[index] ?? d0;
      const d =
        !d1 || Math.abs((x(d0.month) ?? 0) - adjusted) < Math.abs((x(d1.month) ?? 0) - adjusted)
          ? d0
          : d1;
      showTooltip({
        tooltipData: d,
        tooltipLeft: (x(d.month) ?? 0) + margin.left,
        tooltipTop: y(d.revenue) + margin.top,
      });
    },
    [bisect, margin.left, margin.top, showTooltip, x, y]
  );

  if (width < 10) return null;

  return (
    <div style={{ position: "relative", width, height }}>
      <svg width={width} height={height}>
        <LinearGradient
          id="visx-area-violet"
          from={palette.violet}
          to={palette.cyan}
          fromOpacity={0.55}
          toOpacity={0.05}
          rotate={10}
        />
        <LinearGradient
          id="visx-line-violet"
          from="#c4b4ff"
          to="#22d3ee"
          vertical={false}
        />
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={y}
            width={xMax}
            stroke={palette.grid}
            strokeDasharray="2,4"
            numTicks={5}
          />
          <AreaClosed<Datum>
            data={revenueArea}
            x={(d) => x(d.month) ?? 0}
            y={(d) => y(d.revenue)}
            yScale={y}
            fill="url(#visx-area-violet)"
            curve={curveMonotoneX}
          />
          <LinePath<Datum>
            data={revenueArea}
            x={(d) => x(d.month) ?? 0}
            y={(d) => y(d.revenue)}
            stroke="url(#visx-line-violet)"
            strokeWidth={2.5}
            curve={curveMonotoneX}
          />
          {revenueArea.map((d) => (
            <GlyphCircle
              key={d.month}
              left={x(d.month) ?? 0}
              top={y(d.revenue)}
              size={42}
              fill={palette.bg}
              stroke={palette.violet}
              strokeWidth={2}
            />
          ))}
          <AxisBottom
            top={yMax}
            scale={x}
            stroke={palette.edge}
            tickStroke={palette.edge}
            tickLabelProps={{
              fill: palette.muted,
              fontSize: 10,
              textAnchor: "middle",
              fontFamily: "var(--font-geist-sans)",
            }}
          />
          <AxisLeft
            scale={y}
            stroke={palette.edge}
            tickStroke={palette.edge}
            numTicks={5}
            tickFormat={(v) => `$${Number(v).toFixed(0)}M`}
            tickLabelProps={{
              fill: palette.muted,
              fontSize: 10,
              textAnchor: "end",
              dx: -6,
              dy: 3,
              fontFamily: "var(--font-geist-sans)",
            }}
          />
          <Bar
            x={0}
            y={0}
            width={xMax}
            height={yMax}
            fill="transparent"
            onPointerMove={handleTooltip}
            onPointerLeave={hideTooltip}
          />
          {tooltipData && (
            <line
              x1={(x(tooltipData.month) ?? 0)}
              x2={(x(tooltipData.month) ?? 0)}
              y1={0}
              y2={yMax}
              stroke={palette.violet}
              strokeOpacity={0.4}
              strokeDasharray="3,3"
            />
          )}
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div className="text-[11px] opacity-70">{tooltipData.month} 2026</div>
          <div className="text-sm font-medium">${tooltipData.revenue.toFixed(1)}M</div>
          <div className="text-[10px] opacity-60">attributed revenue</div>
        </TooltipWithBounds>
      )}
    </div>
  );
}

export function RevenueArea() {
  return <ParentSize>{({ width, height }) => <Chart width={width} height={height} />}</ParentSize>;
}
