"use client";

import { ResponsiveFunnel } from "@nivo/funnel";
import { acquisitionFunnel } from "@/data/journey";
import { categoricalColors, nivoTheme, palette } from "@/lib/theme";

export function NivoConversionFunnel() {
  return (
    <ResponsiveFunnel
      data={acquisitionFunnel}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      direction="horizontal"
      valueFormat=">-.3s"
      colors={categoricalColors}
      borderWidth={0}
      borderOpacity={0.4}
      labelColor={palette.fg}
      beforeSeparatorLength={70}
      beforeSeparatorOffset={18}
      afterSeparatorLength={70}
      afterSeparatorOffset={18}
      currentPartSizeExtension={6}
      currentBorderWidth={28}
      motionConfig="gentle"
      theme={nivoTheme}
    />
  );
}
