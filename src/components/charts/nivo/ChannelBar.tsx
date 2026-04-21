"use client";

import { ResponsiveBar } from "@nivo/bar";
import { categoricalColors, nivoTheme, palette } from "@/lib/theme";
import { channelMix } from "@/data/journey";

type ChannelBarProps = { highlight?: string };

export function ChannelBar({ highlight }: ChannelBarProps) {
  const data = [...channelMix]
    .sort((a, b) => b.share - a.share)
    .map((c) => ({
      channel: c.channel,
      share: c.share,
    }));

  return (
    <ResponsiveBar
      data={data}
      keys={["share"]}
      indexBy="channel"
      layout="horizontal"
      margin={{ top: 10, right: 40, bottom: 30, left: 160 }}
      padding={0.28}
      valueFormat={(v) => `${v}%`}
      colors={(bar) =>
        highlight && bar.data.channel === highlight
          ? palette.violet
          : categoricalColors[bar.index % categoricalColors.length]
      }
      borderRadius={4}
      theme={nivoTheme}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        format: (v) => `${v}%`,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 8,
      }}
      enableGridX
      enableGridY={false}
      gridXValues={[0, 5, 10, 15, 20, 25, 30]}
      label={(d) => `${d.value}%`}
      labelTextColor={palette.fg}
      labelSkipWidth={28}
      animate
      motionConfig="gentle"
      role="img"
      ariaLabel="Share of closed-won revenue by first-touch channel"
    />
  );
}
