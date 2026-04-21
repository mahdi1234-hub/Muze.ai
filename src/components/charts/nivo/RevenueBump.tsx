"use client";

import { ResponsiveBump } from "@nivo/bump";
import { revenueBump } from "@/data/journey";
import { categoricalColors, nivoTheme, palette } from "@/lib/theme";

export function RevenueBump() {
  return (
    <ResponsiveBump
      data={revenueBump}
      colors={categoricalColors}
      lineWidth={3}
      activeLineWidth={5}
      inactiveLineWidth={2}
      inactiveOpacity={0.15}
      pointSize={9}
      activePointSize={14}
      inactivePointSize={0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: "serie.color" }}
      axisTop={{
        tickSize: 0,
        tickPadding: 8,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -36,
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
      }}
      axisLeft={null}
      axisRight={null}
      margin={{ top: 40, right: 120, bottom: 40, left: 30 }}
      startLabel={(serie) => serie.id}
      startLabelPadding={12}
      startLabelTextColor={palette.fg}
      endLabel={false}
      theme={nivoTheme}
    />
  );
}
