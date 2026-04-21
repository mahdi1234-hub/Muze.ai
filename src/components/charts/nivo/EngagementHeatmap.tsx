"use client";

import { ResponsiveHeatMap } from "@nivo/heatmap";
import { engagementHeatmap } from "@/data/journey";
import { nivoTheme, palette } from "@/lib/theme";

export function EngagementHeatmap() {
  return (
    <ResponsiveHeatMap
      data={engagementHeatmap}
      margin={{ top: 30, right: 20, bottom: 50, left: 140 }}
      valueFormat=">-.2s"
      axisTop={{
        tickSize: 0,
        tickPadding: 8,
        legend: "Hour of day (customer local time)",
        legendOffset: -36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
      }}
      axisRight={null}
      axisBottom={null}
      borderRadius={3}
      borderWidth={1}
      borderColor={palette.bg}
      colors={{
        type: "diverging",
        scheme: "purples",
        divergeAt: 0.3,
        minValue: 0,
        maxValue: 140,
      }}
      emptyColor={palette.surface}
      labelTextColor={palette.fg}
      theme={nivoTheme}
      hoverTarget="cell"
      inactiveOpacity={0.35}
      animate
      motionConfig="gentle"
    />
  );
}
