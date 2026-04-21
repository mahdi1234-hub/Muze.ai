"use client";

import { Graph } from "@visx/network";
import { ParentSize } from "@visx/responsive";
import { LinearGradient } from "@visx/gradient";
import { motion } from "motion/react";
import { attributionNetwork } from "@/data/journey";
import { palette } from "@/lib/theme";

type NodeShape = (typeof attributionNetwork.nodes)[number];
type LinkShape = {
  source: NodeShape;
  target: NodeShape;
  weight: number;
};

const kindColor: Record<string, string> = {
  entry: palette.amber,
  content: palette.violet,
  product: palette.cyan,
  commercial: palette.pink,
  outcome: palette.emerald,
};

function Chart({ width, height }: { width: number; height: number }) {
  if (width < 10) return null;

  const naturalW = 1040;
  const naturalH = 500;
  const scale = Math.min(width / naturalW, height / naturalH);
  const dx = (width - naturalW * scale) / 2;
  const dy = (height - naturalH * scale) / 2;

  // Project nodes into our container
  const nodes = attributionNetwork.nodes.map((n) => ({
    ...n,
    x: n.x * scale + dx,
    y: n.y * scale + dy,
  }));
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const links: LinkShape[] = attributionNetwork.links.map((l) => ({
    source: byId[l.source],
    target: byId[l.target],
    weight: l.weight,
  }));

  return (
    <svg width={width} height={height}>
      <LinearGradient id="edge-grad" from={palette.violet} to={palette.cyan} />
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <Graph<LinkShape, NodeShape & { x: number; y: number }>
        graph={{ nodes, links }}
        linkComponent={({ link }) => (
          <g>
            <motion.line
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              stroke="url(#edge-grad)"
              strokeOpacity={0.25 + link.weight * 0.7}
              strokeWidth={1 + link.weight * 4}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 + link.weight * 0.4 }}
              style={{ filter: "url(#glow)" }}
            />
          </g>
        )}
        nodeComponent={({ node }) => {
          const color = kindColor[node.kind] ?? palette.violet;
          const r = node.kind === "outcome" ? 22 : node.kind === "entry" ? 18 : 14;
          return (
            <g>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r + 8}
                fill={color}
                fillOpacity={0.12}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 14 }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={palette.bg}
                stroke={color}
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.05 }}
              />
              <text
                x={node.x}
                y={node.y + r + 16}
                textAnchor="middle"
                fill={palette.fg}
                fontSize={11}
                fontFamily="var(--font-geist-sans)"
              >
                {node.label}
              </text>
            </g>
          );
        }}
      />
    </svg>
  );
}

export function AttributionNetwork() {
  return <ParentSize>{({ width, height }) => <Chart width={width} height={height} />}</ParentSize>;
}
