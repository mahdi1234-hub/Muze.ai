"use client";

import { ResponsiveRadar } from "@nivo/radar";
import { segmentRadar } from "@/data/journey";
import { categoricalColors, nivoTheme, palette } from "@/lib/theme";

export function SegmentRadar() {
  return (
    <ResponsiveRadar
      data={segmentRadar}
      keys={["Enterprise", "Mid-market", "Growth SMB", "Startup"]}
      indexBy="trait"
      maxValue={100}
      margin={{ top: 40, right: 90, bottom: 40, left: 90 }}
      borderColor={{ from: "color" }}
      gridLabelOffset={24}
      dotSize={8}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={categoricalColors}
      fillOpacity={0.22}
      blendMode="lighten"
      motionConfig="gentle"
      theme={nivoTheme}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -60,
          translateY: -30,
          itemWidth: 90,
          itemHeight: 16,
          itemTextColor: palette.fg,
          symbolSize: 10,
          symbolShape: "circle",
        },
      ]}
    />
  );
}
