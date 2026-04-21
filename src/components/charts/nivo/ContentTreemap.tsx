"use client";

import { ResponsiveTreeMap } from "@nivo/treemap";
import { contentTree } from "@/data/journey";
import { categoricalColors, nivoTheme } from "@/lib/theme";

export function ContentTreemap() {
  return (
    <ResponsiveTreeMap
      data={contentTree}
      identity="name"
      value="value"
      valueFormat=".02s"
      leavesOnly
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      labelSkipSize={12}
      labelTextColor="#0b0b12"
      parentLabelTextColor="#f5f5fb"
      borderColor="rgba(0,0,0,0.4)"
      borderWidth={1}
      colors={categoricalColors}
      nodeOpacity={0.92}
      theme={nivoTheme}
      animate
      motionConfig="gentle"
    />
  );
}
