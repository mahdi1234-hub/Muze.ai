"use client";

import { ResponsiveSankey } from "@nivo/sankey";
import { journeySankey } from "@/data/journey";
import { categoricalColors, nivoTheme, palette } from "@/lib/theme";

export function JourneySankey() {
  return (
    <ResponsiveSankey
      data={journeySankey}
      margin={{ top: 10, right: 140, bottom: 10, left: 10 }}
      align="justify"
      colors={categoricalColors}
      nodeOpacity={1}
      nodeThickness={14}
      nodeInnerPadding={3}
      nodeSpacing={18}
      nodeBorderWidth={0}
      nodeBorderRadius={3}
      linkOpacity={0.35}
      linkHoverOpacity={0.75}
      linkContract={3}
      enableLinkGradient
      labelPosition="outside"
      labelOrientation="horizontal"
      labelPadding={10}
      labelTextColor={palette.fg}
      theme={nivoTheme}
      animate
      motionConfig="gentle"
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 130,
          itemWidth: 110,
          itemHeight: 14,
          itemTextColor: palette.fg,
          symbolSize: 10,
          symbolShape: "circle",
        },
      ]}
    />
  );
}
