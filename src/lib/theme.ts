// Shared design tokens + Nivo dark theme used across all charts.

export const palette = {
  bg: "#06060a",
  surface: "#0b0b12",
  surfaceRaised: "#12121c",
  edge: "#1f1f2e",
  fg: "#f5f5fb",
  muted: "#8b8ba1",
  grid: "rgba(255,255,255,0.06)",
  gridStrong: "rgba(255,255,255,0.12)",

  // Brand spectrum — used for categorical coloring across Nivo + Visx
  violet: "#7c5cff",
  violetSoft: "#a78bfa",
  indigo: "#4f46e5",
  cyan: "#22d3ee",
  sky: "#38bdf8",
  pink: "#f472b6",
  rose: "#fb7185",
  amber: "#fbbf24",
  orange: "#fb923c",
  emerald: "#34d399",
  lime: "#a3e635",
};

// Ordered categorical scheme (dark-friendly, color-blind tested)
export const categoricalColors = [
  palette.violet,
  palette.cyan,
  palette.pink,
  palette.emerald,
  palette.amber,
  palette.sky,
  palette.rose,
  palette.lime,
  palette.violetSoft,
  palette.orange,
];

// Sequential (cool) used for heatmaps / treemaps
export const sequentialCool = [
  "#1e1b4b",
  "#312e81",
  "#4338ca",
  "#6366f1",
  "#818cf8",
  "#a5b4fc",
  "#c7d2fe",
];

// Diverging (purple <-> cyan)
export const divergingPurpleCyan = [
  "#4c1d95",
  "#7c3aed",
  "#a78bfa",
  "#e0e7ff",
  "#67e8f9",
  "#22d3ee",
  "#0e7490",
];

// Centralized Nivo theme so every chart shares typography + chrome.
export const nivoTheme = {
  background: "transparent",
  text: {
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontSize: 11,
    fill: palette.muted,
    outlineWidth: 0,
    outlineColor: "transparent",
  },
  axis: {
    domain: { line: { stroke: palette.edge, strokeWidth: 1 } },
    legend: {
      text: {
        fontSize: 11,
        fill: palette.muted,
        fontFamily: "var(--font-geist-sans)",
      },
    },
    ticks: {
      line: { stroke: palette.edge, strokeWidth: 1 },
      text: { fontSize: 10, fill: palette.muted },
    },
  },
  grid: { line: { stroke: palette.grid, strokeWidth: 1 } },
  legends: {
    title: { text: { fontSize: 11, fill: palette.muted } },
    text: { fontSize: 11, fill: palette.fg },
    ticks: { line: {}, text: { fontSize: 10, fill: palette.muted } },
  },
  labels: {
    text: {
      fontSize: 11,
      fill: palette.fg,
      fontWeight: 500,
    },
  },
  tooltip: {
    container: {
      background: "#0f0f18",
      color: palette.fg,
      fontSize: 12,
      borderRadius: 10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
      border: "1px solid rgba(255,255,255,0.08)",
      padding: "10px 12px",
    },
  },
  crosshair: { line: { stroke: palette.violet, strokeWidth: 1, strokeOpacity: 0.6 } },
  annotations: {
    text: { fontSize: 12, fill: palette.fg, outlineWidth: 2, outlineColor: palette.bg },
    link: { stroke: palette.violet, strokeWidth: 1 },
    outline: { stroke: palette.violet, strokeWidth: 2 },
    symbol: { fill: palette.violet, outlineWidth: 2, outlineColor: palette.bg },
  },
} as const;
