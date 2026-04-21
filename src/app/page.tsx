"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { KPIBand } from "@/components/KPIBand";
import { ScrollyChapter } from "@/components/ScrollyChapter";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { Insights } from "@/components/Insights";
import { Methodology } from "@/components/Methodology";
import { SiteFooter } from "@/components/SiteFooter";

// All chart primitives render lots of SVG + IntersectionObservers — client-only.
const ChannelBar = dynamic(
  () => import("@/components/charts/nivo/ChannelBar").then((m) => m.ChannelBar),
  { ssr: false }
);
const ChannelPie = dynamic(
  () => import("@/components/charts/nivo/ChannelPie").then((m) => m.ChannelPie),
  { ssr: false }
);
const ContentTreemap = dynamic(
  () => import("@/components/charts/nivo/ContentTreemap").then((m) => m.ContentTreemap),
  { ssr: false }
);
const EngagementHeatmap = dynamic(
  () => import("@/components/charts/nivo/EngagementHeatmap").then((m) => m.EngagementHeatmap),
  { ssr: false }
);
const JourneySankey = dynamic(
  () => import("@/components/charts/nivo/JourneySankey").then((m) => m.JourneySankey),
  { ssr: false }
);
const NivoConversionFunnel = dynamic(
  () => import("@/components/charts/nivo/NivoConversionFunnel").then((m) => m.NivoConversionFunnel),
  { ssr: false }
);
const RevenueBump = dynamic(
  () => import("@/components/charts/nivo/RevenueBump").then((m) => m.RevenueBump),
  { ssr: false }
);
const RevenueStream = dynamic(
  () => import("@/components/charts/nivo/RevenueStream").then((m) => m.RevenueStream),
  { ssr: false }
);
const RetentionCalendar = dynamic(
  () => import("@/components/charts/nivo/RetentionCalendar").then((m) => m.RetentionCalendar),
  { ssr: false }
);
const SegmentRadar = dynamic(
  () => import("@/components/charts/nivo/SegmentRadar").then((m) => m.SegmentRadar),
  { ssr: false }
);
const JourneyChord = dynamic(
  () => import("@/components/charts/nivo/JourneyChord").then((m) => m.JourneyChord),
  { ssr: false }
);

const RevenueArea = dynamic(
  () => import("@/components/charts/visx/RevenueArea").then((m) => m.RevenueArea),
  { ssr: false }
);
const GradientFunnel = dynamic(
  () => import("@/components/charts/visx/GradientFunnel").then((m) => m.GradientFunnel),
  { ssr: false }
);
const AttributionNetwork = dynamic(
  () => import("@/components/charts/visx/AttributionNetwork").then((m) => m.AttributionNetwork),
  { ssr: false }
);
const CohortFlow = dynamic(
  () => import("@/components/charts/visx/CohortFlow").then((m) => m.CohortFlow),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative">
      <SiteHeader />
      <Hero />
      <KPIBand />

      {/* CHAPTER 1 — AWARENESS */}
      <ScrollyChapter
        id="awareness"
        eyebrow="01 · Awareness"
        title="Where they first meet you is no longer where they tell you they did."
        lede="Last-click attribution systematically undercounts the channels that actually change minds. When we aggregated self-reported attribution across 340 companies, the channel mix shifted sharply away from paid acquisition."
        steps={[
          {
            id: "aw-1",
            eyebrow: "Beat 01",
            title: "The chart most executives see.",
            body: (
              <>
                Paid search and paid social dominate most dashboards because
                they&apos;re the channels that can be measured last-click. This is
                the view that drives most Q4 budgeting decisions.
              </>
            ),
            stat: { value: "62%", label: "of budget tied to last-click channels" },
          },
          {
            id: "aw-2",
            eyebrow: "Beat 02",
            title: "The chart every CMO should look at.",
            body: (
              <>
                Once we layered in self-reported attribution from new
                opportunities (&quot;how did you first hear about us?&quot;), organic
                content and dark social jumped ahead of paid. The same dollars
                move very different channels.
              </>
            ),
            stat: { value: "28.4%", label: "Organic Search share of closed-won" },
          },
          {
            id: "aw-3",
            eyebrow: "Beat 03",
            title: "Content mix behind the curve.",
            body: (
              <>
                Inside &quot;organic,&quot; pillar guides and interactive demos do the
                heavy lifting. Comparison pages — long considered low-intent —
                actually carry the highest per-session revenue weight.
              </>
            ),
            stat: { value: "21.4K", label: "sessions / mo to the top pillar guide" },
          },
        ]}
        render={(i) => {
          if (i === 0)
            return (
              <ChartFrame
                title="First-touch attribution (last-click model)"
                subtitle="How paid channels appear to dominate the pipeline"
                library="Nivo"
                chartType="Bar"
                footnote="Sample: 72,115 closed-won opportunities · last-click attribution model."
              >
                <ChannelBar highlight="Paid Search" />
              </ChartFrame>
            );
          if (i === 1)
            return (
              <ChartFrame
                title="First-touch attribution (self-reported + multi-touch)"
                subtitle="Share of closed-won revenue by true first-touch channel"
                library="Nivo"
                chartType="Pie"
                footnote="Self-reported attribution surveys blended with weighted multi-touch model."
              >
                <ChannelPie />
              </ChartFrame>
            );
          return (
            <ChartFrame
              title="Content categories driving first-touch"
              subtitle="Monthly sessions across 340 company sites, log-normalized"
              library="Nivo"
              chartType="Treemap"
              footnote="Leaf size = median monthly sessions. Parent categories omitted for density."
            >
              <ContentTreemap />
            </ChartFrame>
          );
        }}
      />

      {/* CHAPTER 2 — ACQUISITION FUNNEL */}
      <ScrollyChapter
        id="acquisition"
        eyebrow="02 · Acquisition"
        title="The funnel is still a funnel. It just leaks in new places."
        lede="From 8.24M first-touch sessions to 72K closed-won opportunities, the journey compresses by nearly 99.1%. But the shape of the compression has changed — the biggest drop is no longer from visit to engagement, it’s from engagement to intent signal."
        steps={[
          {
            id: "ac-1",
            eyebrow: "Beat 01",
            title: "From visit to intent.",
            body: "Only 14.6% of engaged sessions produced a meaningful intent signal — a demo view, a pricing engagement, or a docs deep-read. Every other motion is downstream of that number.",
            stat: { value: "14.6%", label: "engaged → intent signal" },
          },
          {
            id: "ac-2",
            eyebrow: "Beat 02",
            title: "From intent to trial.",
            body: "Teams that instrumented a self-serve trial captured 3.3× more qualified opportunities than teams that gated product behind a sales call.",
            stat: { value: "3.3×", label: "qualified opps with self-serve trial" },
          },
          {
            id: "ac-3",
            eyebrow: "Beat 03",
            title: "The shape of the funnel.",
            body: "Rendered custom with Visx + React Spring to emphasize the compression at each stage — the chart itself tells the story at a glance.",
            stat: { value: "0.87%", label: "visit → closed-won" },
          },
        ]}
        render={(i) => {
          if (i === 0)
            return (
              <ChartFrame
                title="Acquisition funnel — absolute volume"
                subtitle="Medians across 340 participating SaaS companies"
                library="Nivo"
                chartType="Funnel"
                footnote="Absolute median monthly volumes at each stage."
              >
                <NivoConversionFunnel />
              </ChartFrame>
            );
          if (i === 1)
            return (
              <ChartFrame
                title="Every major source feeding the funnel"
                subtitle="Where engaged sessions actually originate"
                library="Nivo"
                chartType="Pie"
                footnote="Distribution of channels inside the top of the acquisition funnel."
              >
                <ChannelPie />
              </ChartFrame>
            );
          return (
            <ChartFrame
              title="Custom gradient funnel"
              subtitle="Per-stage compression, bloomed with React Spring physics"
              library="Visx"
              chartType="Funnel"
              footnote="Built with @visx/shape + @visx/gradient + @react-spring/web."
            >
              <GradientFunnel />
            </ChartFrame>
          );
        }}
      />

      {/* CHAPTER 3 — ACTIVATION */}
      <ScrollyChapter
        id="activation"
        eyebrow="03 · Activation"
        title="Activation is the most under-instrumented part of the journey."
        lede="When does a prospect become a user? The most mature teams we studied treat this as a product metric, not a marketing one. The payoff is measurable: every 10-point lift in day-7 activation correlated with a 19-point lift in 12-month net revenue retention."
        steps={[
          {
            id: "ae-1",
            eyebrow: "Beat 01",
            title: "When customers actually engage.",
            body: "Engagement heatmap across 8 content types × 8 three-hour windows. Docs and interactive demos dominate working hours; customer stories dominate evenings.",
          },
          {
            id: "ae-2",
            eyebrow: "Beat 02",
            title: "The demo is the inflection point.",
            body: "Companies that shipped an interactive demo on the homepage saw 2.1× trial starts and a 47% reduction in time-to-qualification. Nothing else moved the number like this.",
            stat: { value: "2.1×", label: "trial starts with interactive demo" },
          },
          {
            id: "ae-3",
            eyebrow: "Beat 03",
            title: "Content mix matters more than content volume.",
            body: "In the top decile, long-form, product-led and community content were ~equally weighted. In the bottom decile, one category accounted for &gt;70% of traffic.",
          },
        ]}
        render={(i) => {
          if (i === 0)
            return (
              <ChartFrame
                title="Engagement heatmap"
                subtitle="Sessions by content type × customer local hour"
                library="Nivo"
                chartType="Heatmap"
                footnote="Color encodes relative session volume within the content row."
              >
                <EngagementHeatmap />
              </ChartFrame>
            );
          if (i === 1)
            return (
              <ChartFrame
                title="Content categories, re-weighted"
                subtitle="Sessions by category (log-normalized)"
                library="Nivo"
                chartType="Treemap"
                footnote="Interactive demos are disproportionate relative to their production cost."
              >
                <ContentTreemap />
              </ChartFrame>
            );
          return (
            <ChartFrame
              title="Channel co-occurrence"
              subtitle="Which channels a typical converter touches together"
              library="Nivo"
              chartType="Chord"
              footnote="Symmetric co-touch matrix across the 6 highest-volume channels."
            >
              <JourneyChord />
            </ChartFrame>
          );
        }}
      />

      {/* CHAPTER 4 — CONVERSION */}
      <ScrollyChapter
        id="conversion"
        eyebrow="04 · Conversion"
        title="There isn’t one path to closed-won. There are seventeen."
        lede="We reconstructed the full touch graph across every closed-won journey. The &apos;golden path&apos; accounts for only 8.4% of deals. The other 91.6% take routes that no single dashboard would surface."
        steps={[
          {
            id: "cv-1",
            eyebrow: "Beat 01",
            title: "The full flow, end to end.",
            body: "A Sankey of source → consideration → action → outcome. Notice how pricing-led journeys skew heavily toward sales calls; demo-led journeys skew toward trial.",
          },
          {
            id: "cv-2",
            eyebrow: "Beat 02",
            title: "Which touchpoints actually get credit.",
            body: "Rebuilt as a weighted attribution network. Node color encodes touchpoint kind; edge thickness encodes assisted-conversion credit.",
            stat: { value: "0.62", label: "avg. credit on trial → won edge" },
          },
          {
            id: "cv-3",
            eyebrow: "Beat 03",
            title: "The path most teams underinvest in.",
            body: "Docs → demo → trial drove the highest win rate per session — and the lowest CAC. Treat documentation as a top-of-funnel asset, not an afterthought.",
          },
        ]}
        render={(i) => {
          if (i === 0)
            return (
              <ChartFrame
                title="Journey flow: source → consideration → action → outcome"
                subtitle="Weighted by number of converters"
                library="Nivo"
                chartType="Sankey"
                footnote="Values are indexed (arbitrary units); direction shows flow of converters."
              >
                <JourneySankey />
              </ChartFrame>
            );
          if (i === 1)
            return (
              <ChartFrame
                title="Attribution network"
                subtitle="Nodes: touchpoints · Edges: assisted-conversion credit"
                library="Visx"
                chartType="Network"
                footnote="Custom-drawn graph with @visx/network, glow filter and Motion entry animation."
              >
                <AttributionNetwork />
              </ChartFrame>
            );
          return (
            <ChartFrame
              title="Channel co-occurrence"
              subtitle="The social graph of touchpoints on a typical closed-won journey"
              library="Nivo"
              chartType="Chord"
              footnote="Symmetric co-touch matrix across the 6 highest-volume channels."
            >
              <JourneyChord />
            </ChartFrame>
          );
        }}
      />

      {/* CHAPTER 5 — REVENUE */}
      <ScrollyChapter
        id="revenue"
        eyebrow="05 · Revenue"
        title="Mid-market is the segment most quietly taking share from Enterprise."
        lede="Across the year, mid-market ascended two rank positions. It's the only segment that gained both revenue rank and NPS. The playbook is repeatable and the team writing it wins 2027."
        steps={[
          {
            id: "rv-1",
            eyebrow: "Beat 01",
            title: "Rank movement through the year.",
            body: "A bump chart of revenue ranking across five segments. Mid-market crosses Growth SMB in March and doesn't look back.",
          },
          {
            id: "rv-2",
            eyebrow: "Beat 02",
            title: "Absolute revenue flow.",
            body: "A stream chart of monthly revenue ($M) — the shape of the business, not just its ranking. Enterprise is still the largest slice; the velocity is elsewhere.",
            stat: { value: "$60M", label: "Sep Enterprise revenue, +43% YoY" },
          },
          {
            id: "rv-3",
            eyebrow: "Beat 03",
            title: "Trend, rendered custom.",
            body: "Same data, rendered as a hero gradient area with Visx — the version you'd put on a board deck.",
          },
        ]}
        render={(i) => {
          if (i === 0)
            return (
              <ChartFrame
                title="Monthly revenue ranking, by segment"
                subtitle="1 = largest segment by attributed revenue"
                library="Nivo"
                chartType="Bump"
                footnote="Bump chart highlights rank shifts rather than absolute values."
              >
                <RevenueBump />
              </ChartFrame>
            );
          if (i === 1)
            return (
              <ChartFrame
                title="Monthly revenue flow, by segment"
                subtitle="Absolute $M contributed each month"
                library="Nivo"
                chartType="Stream"
                footnote="Area encodes $M in attributed revenue; stacking is weighted by ascending order."
              >
                <RevenueStream />
              </ChartFrame>
            );
          return (
            <ChartFrame
              title="Attributed revenue over time"
              subtitle="Total across all segments, hero view"
              library="Visx"
              chartType="Area"
              footnote="Built with @visx/shape, @visx/gradient, @visx/tooltip and curveMonotoneX."
            >
              <RevenueArea />
            </ChartFrame>
          );
        }}
      />

      {/* CHAPTER 6 — RETENTION */}
      <ScrollyChapter
        id="retention"
        eyebrow="06 · Retention"
        title="Retention is a daily habit, not a quarterly review."
        lede="Net retention is the single metric most correlated with long-term enterprise value. Teams that reviewed it weekly outperformed teams that reviewed it quarterly by 14 points."
        steps={[
          {
            id: "rt-1",
            eyebrow: "Beat 01",
            title: "A year of daily net retention deltas.",
            body: "Basis-point deltas in 12-month NRR, rendered as a calendar heatmap. The periodicity of monthly business reviews is visible in the 29-day spikes.",
          },
          {
            id: "rt-2",
            eyebrow: "Beat 02",
            title: "Six cohorts, six months of retention.",
            body: "Every cohort retains >68% of opening active users at month 5 — a reliable benchmark enterprises can use to forecast NRR.",
            stat: { value: "69%", label: "month-5 retention, median cohort" },
          },
          {
            id: "rt-3",
            eyebrow: "Beat 03",
            title: "Segment strengths and weaknesses.",
            body: "A radar view makes it obvious: Enterprise dominates NPS and support CSAT; SMB dominates activation speed and community engagement. Treat them differently.",
          },
        ]}
        render={(i) => {
          if (i === 0)
            return (
              <ChartFrame
                title="Daily 12-month NRR delta (bps)"
                subtitle="Oct 2025 → Sep 2026"
                library="Nivo"
                chartType="Calendar"
                footnote="Darker = lower delta. Weekly and monthly cycles visible to the naked eye."
              >
                <RetentionCalendar />
              </ChartFrame>
            );
          if (i === 1)
            return (
              <ChartFrame
                title="Cohort flow — retention by starting month"
                subtitle="Active users per cohort, month-over-month"
                library="Visx"
                chartType="Matrix"
                footnote="Rendered with @visx/group + @visx/scale + Motion for animated cell entry."
              >
                <CohortFlow />
              </ChartFrame>
            );
          return (
            <ChartFrame
              title="Segment strengths — health by trait"
              subtitle="Six-trait profile for four core segments"
              library="Nivo"
              chartType="Radar"
              footnote="Enterprise and SMB are often treated the same. This is evidence that they shouldn't be."
            >
              <SegmentRadar />
            </ChartFrame>
          );
        }}
      />

      {/* CHAPTER 7 — ADVOCACY */}
      <ScrollyChapter
        id="advocacy"
        eyebrow="07 · Advocacy"
        title="Advocacy compounds. Most teams don’t budget for compounding."
        lede="The top decile of teams allocated 6–8% of GTM spend to advocacy surfaces — community, referral, and creator partnerships. The bottom decile allocated &lt;0.5%. Over 12 months, the difference showed up in the only metric that really matters."
        steps={[
          {
            id: "ad-1",
            eyebrow: "Beat 01",
            title: "Segment NPS ≠ segment referral rate.",
            body: "Enterprise wins NPS. SMB wins referrals. If you optimize advocacy investment only for NPS, you'll systematically underinvest in the segment most likely to send you new customers.",
          },
          {
            id: "ad-2",
            eyebrow: "Beat 02",
            title: "Who talks to whom, internally.",
            body: "Community and dark social are the two most-entangled channels in every top-decile journey. They're not alternatives; they amplify each other.",
          },
          {
            id: "ad-3",
            eyebrow: "Beat 03",
            title: "The hero chart you'll print.",
            body: "Attributed revenue curve for 2026. This is the picture every revenue review should open with — the rest is commentary.",
            stat: { value: "+43%", label: "attributed revenue, YoY" },
          },
        ]}
        render={(i) => {
          if (i === 0)
            return (
              <ChartFrame
                title="Segment health — six traits, four segments"
                subtitle="NPS, activation, CSAT, expansion intent, referrals, community"
                library="Nivo"
                chartType="Radar"
                footnote="Referral rate and community engagement peak below Enterprise — a common blind spot."
              >
                <SegmentRadar />
              </ChartFrame>
            );
          if (i === 1)
            return (
              <ChartFrame
                title="Channel co-occurrence"
                subtitle="Paired touchpoints on top-decile journeys"
                library="Nivo"
                chartType="Chord"
                footnote="The community × dark-social ribbon is the single largest non-organic pair."
              >
                <JourneyChord />
              </ChartFrame>
            );
          return (
            <ChartFrame
              title="Attributed revenue — 2026"
              subtitle="The picture worth the whole report"
              library="Visx"
              chartType="Area"
              footnote="Hover the chart for monthly values."
            >
              <RevenueArea />
            </ChartFrame>
          );
        }}
      />

      <Insights />
      <Methodology />
      <SiteFooter />
    </main>
  );
}
