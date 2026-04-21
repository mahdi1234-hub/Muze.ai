"use client";

import { ResponsiveStream } from "@nivo/stream";
import { revenueStream } from "@/data/journey";
import { categoricalColors, nivoTheme, palette } from "@/lib/theme";

export function RevenueStream() {
  const keys = ["Enterprise", "Mid-market", "Growth SMB", "Startup", "Public sector"];
  return (
    <ResponsiveStream
      data={revenueStream as unknown as Record<string, number>[]}
      keys={keys}
      margin={{ top: 20, right: 140, bottom: 50, left: 50 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        tickValues: revenueStream.map((r) => r.month),
        format: (i: number | string) => String(i),
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 8,
        legend: "",
      }}
      curve="basis"
      offsetType="wiggle"
      colors={categoricalColors}
      fillOpacity={0.85}
      borderColor={{ theme: "background" }}
      order="ascending"
      motionConfig="gentle"
      theme={nivoTheme}
      enableGridX
      enableGridY={false}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 120,
          itemWidth: 110,
          itemHeight: 18,
          itemTextColor: palette.fg,
          symbolSize: 10,
          symbolShape: "circle",
        },
      ]}
    />
  );
}
