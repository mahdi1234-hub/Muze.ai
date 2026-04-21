"use client";

import { ResponsivePie } from "@nivo/pie";
import { categoricalColors, nivoTheme, palette } from "@/lib/theme";
import { channelMix } from "@/data/journey";

export function ChannelPie() {
  const data = channelMix.map((c, i) => ({
    id: c.channel,
    label: c.channel,
    value: c.share,
    color: categoricalColors[i % categoricalColors.length],
  }));

  return (
    <ResponsivePie
      data={data}
      colors={{ datum: "data.color" }}
      margin={{ top: 20, right: 140, bottom: 20, left: 20 }}
      innerRadius={0.62}
      padAngle={0.6}
      cornerRadius={4}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsTextColor={palette.muted}
      arcLinkLabelsColor={{ from: "color" }}
      arcLinkLabelsThickness={1}
      arcLinkLabelsSkipAngle={14}
      arcLabelsTextColor="#0b0b12"
      arcLabel={(d) => `${d.value}%`}
      arcLabelsSkipAngle={14}
      theme={nivoTheme}
      legends={[
        {
          anchor: "right",
          direction: "column",
          itemWidth: 120,
          itemHeight: 18,
          symbolSize: 10,
          symbolShape: "circle",
          itemTextColor: palette.fg,
          translateX: 120,
        },
      ]}
      animate
      motionConfig="gentle"
    />
  );
}
