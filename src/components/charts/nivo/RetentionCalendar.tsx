"use client";

import { ResponsiveCalendar } from "@nivo/calendar";
import { retentionCalendar } from "@/data/journey";
import { nivoTheme, palette } from "@/lib/theme";

export function RetentionCalendar() {
  return (
    <ResponsiveCalendar
      data={retentionCalendar}
      from="2025-10-01"
      to="2026-09-30"
      emptyColor={palette.surface}
      colors={["#1e1b4b", "#4338ca", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"]}
      margin={{ top: 30, right: 20, bottom: 30, left: 30 }}
      yearSpacing={40}
      monthBorderColor={palette.bg}
      dayBorderWidth={2}
      dayBorderColor={palette.bg}
      theme={nivoTheme}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 30,
          itemCount: 5,
          itemWidth: 40,
          itemHeight: 32,
          itemsSpacing: 12,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
}
