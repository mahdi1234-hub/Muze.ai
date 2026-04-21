"use client";

import { ResponsiveChord } from "@nivo/chord";
import { chordChannels, chordMatrix } from "@/data/journey";
import { categoricalColors, nivoTheme, palette } from "@/lib/theme";

export function JourneyChord() {
  return (
    <ResponsiveChord
      data={chordMatrix}
      keys={chordChannels}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      valueFormat=".2f"
      padAngle={0.02}
      innerRadiusRatio={0.94}
      innerRadiusOffset={0.02}
      arcOpacity={1}
      arcBorderWidth={0}
      arcBorderColor={palette.bg}
      ribbonOpacity={0.5}
      ribbonBorderWidth={0}
      ribbonBorderColor={palette.bg}
      labelOffset={12}
      labelRotation={-90}
      labelTextColor={palette.fg}
      colors={categoricalColors}
      motionConfig="gentle"
      theme={nivoTheme}
    />
  );
}
