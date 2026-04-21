// Synthetic but internally-consistent dataset for the Muze.ai case study.
// All numbers are aggregates of 8.2M anonymized B2B SaaS customer journeys
// across 340 participating accounts (Q4 2025 – Q3 2026).

export const studyMeta = {
  sampleSize: 8_243_117,
  companies: 340,
  windowStart: "Oct 2025",
  windowEnd: "Sep 2026",
  verticals: 9,
  regions: 14,
  touchpointsPerJourney: 27.4,
  medianTimeToConvert: "41 days",
};

export const kpis = [
  { label: "Journeys analyzed", value: "8.24M", delta: "+312% YoY", tone: "up" as const },
  { label: "Median touchpoints", value: "27.4", delta: "+6.1 vs 2024", tone: "up" as const },
  { label: "Blended conversion", value: "3.91%", delta: "+38 bps", tone: "up" as const },
  { label: "Qualified CAC", value: "$812", delta: "-11.4%", tone: "up" as const },
  { label: "12-mo net revenue retention", value: "118%", delta: "+4 pts", tone: "up" as const },
  { label: "Attributed dark-social share", value: "34%", delta: "first measured", tone: "neutral" as const },
];

// ---- Chapter 1: Awareness — channel mix ----
export const channelMix = [
  { channel: "Organic Search", share: 28.4, aov: 1240, color: "violet" },
  { channel: "Dark Social", share: 18.7, aov: 1105, color: "pink" },
  { channel: "Paid Search", share: 13.6, aov: 920, color: "cyan" },
  { channel: "Partner / Affiliate", share: 9.8, aov: 1610, color: "emerald" },
  { channel: "Podcast & Video", share: 8.4, aov: 1470, color: "amber" },
  { channel: "Community (Slack/Discord)", share: 7.1, aov: 1320, color: "sky" },
  { channel: "Events & Field", share: 6.2, aov: 2180, color: "orange" },
  { channel: "Outbound", share: 4.5, aov: 980, color: "rose" },
  { channel: "LinkedIn Organic", share: 3.3, aov: 1180, color: "lime" },
];

// Treemap of content categories driving awareness
export const contentTree = {
  name: "content",
  children: [
    {
      name: "Long-form guides",
      children: [
        { name: "Pillar pages", value: 21400 },
        { name: "Comparisons", value: 14900 },
        { name: "Playbooks", value: 11800 },
      ],
    },
    {
      name: "Product-led",
      children: [
        { name: "Interactive demos", value: 18700 },
        { name: "Template gallery", value: 12300 },
        { name: "Sandbox", value: 9400 },
      ],
    },
    {
      name: "Community",
      children: [
        { name: "Slack answers", value: 15200 },
        { name: "YouTube tutorials", value: 10400 },
        { name: "Creator POVs", value: 7900 },
      ],
    },
    {
      name: "Events",
      children: [
        { name: "Field dinners", value: 6800 },
        { name: "Webinars", value: 5600 },
        { name: "Conferences", value: 4100 },
      ],
    },
  ],
};

// ---- Chapter 2: Acquisition funnel ----
export const acquisitionFunnel = [
  { id: "visit", label: "Site visit", value: 8_243_117 },
  { id: "engage", label: "Engaged session", value: 3_187_402 },
  { id: "signal", label: "Intent signal", value: 1_204_511 },
  { id: "trial", label: "Free trial / PoC", value: 412_038 },
  { id: "qualified", label: "Qualified opportunity", value: 187_224 },
  { id: "closed", label: "Closed won", value: 72_115 },
];

// ---- Chapter 3: Activation — time-of-day × content-type heatmap ----
// rows = content type, columns = hour buckets (local time to customer)
export const engagementHeatmap = (() => {
  const hours = ["00-03", "03-06", "06-09", "09-12", "12-15", "15-18", "18-21", "21-24"];
  const categories = [
    "Interactive demo",
    "Docs / API ref",
    "Pricing & ROI",
    "Comparison",
    "Template gallery",
    "Customer story",
    "Webinar replay",
    "Community Q&A",
  ];
  // Deterministic pseudo-random so the chart looks curated not noisy
  const seeded = (i: number, j: number) => {
    const x = Math.sin(i * 9.13 + j * 3.7) * 10000;
    return Math.abs(x - Math.floor(x));
  };
  return categories.map((cat, i) => ({
    id: cat,
    data: hours.map((h, j) => {
      const base = 20 + seeded(i, j) * 80;
      // give working hours and demos a lift
      const workBoost = j >= 3 && j <= 5 ? 25 : 0;
      const demoBoost = cat === "Interactive demo" ? 18 : 0;
      const docsLift = cat === "Docs / API ref" && j >= 2 && j <= 5 ? 14 : 0;
      return { x: h, y: Math.round(base + workBoost + demoBoost + docsLift) };
    }),
  }));
})();

// ---- Chapter 4: Conversion paths (Sankey) ----
export const journeySankey = {
  nodes: [
    { id: "Organic" },
    { id: "Paid" },
    { id: "Dark Social" },
    { id: "Partner" },
    { id: "Webinar" },
    { id: "Community" },

    { id: "Blog" },
    { id: "Demo" },
    { id: "Pricing" },
    { id: "Docs" },

    { id: "Trial" },
    { id: "Sales Call" },

    { id: "Closed Won" },
    { id: "Closed Lost" },
    { id: "Nurture" },
  ],
  links: [
    // Sources -> consideration
    { source: "Organic", target: "Blog", value: 1860 },
    { source: "Organic", target: "Docs", value: 980 },
    { source: "Organic", target: "Demo", value: 540 },
    { source: "Paid", target: "Pricing", value: 720 },
    { source: "Paid", target: "Demo", value: 410 },
    { source: "Dark Social", target: "Demo", value: 860 },
    { source: "Dark Social", target: "Blog", value: 520 },
    { source: "Partner", target: "Demo", value: 430 },
    { source: "Partner", target: "Pricing", value: 180 },
    { source: "Webinar", target: "Demo", value: 360 },
    { source: "Community", target: "Docs", value: 620 },
    { source: "Community", target: "Demo", value: 240 },

    // Consideration -> action
    { source: "Blog", target: "Trial", value: 540 },
    { source: "Blog", target: "Nurture", value: 1450 },
    { source: "Demo", target: "Trial", value: 1420 },
    { source: "Demo", target: "Sales Call", value: 680 },
    { source: "Pricing", target: "Sales Call", value: 520 },
    { source: "Pricing", target: "Trial", value: 280 },
    { source: "Docs", target: "Trial", value: 480 },
    { source: "Docs", target: "Nurture", value: 920 },

    // Action -> outcome
    { source: "Trial", target: "Closed Won", value: 980 },
    { source: "Trial", target: "Closed Lost", value: 420 },
    { source: "Trial", target: "Nurture", value: 1320 },
    { source: "Sales Call", target: "Closed Won", value: 640 },
    { source: "Sales Call", target: "Closed Lost", value: 380 },
    { source: "Sales Call", target: "Nurture", value: 180 },
  ],
};

// ---- Chapter 5: Revenue by segment over time (Bump + Stream) ----
export const segmentMonths = [
  "Oct", "Nov", "Dec", "Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
];

const rankedSegments = [
  "Enterprise",
  "Mid-market",
  "Growth SMB",
  "Startup",
  "Public sector",
];

// Ranking (1 = top) per month to show shifts in revenue leadership
export const revenueBump = rankedSegments.map((id, idx) => {
  const base = idx + 1;
  const wiggle = [0, 0, 0, 1, 1, 0, -1, 0, 0, 1, 1, 0];
  return {
    id,
    data: segmentMonths.map((m, j) => ({
      x: m,
      y: Math.max(1, Math.min(5, base + (wiggle[(j + idx) % 12] ?? 0))),
    })),
  };
});

// Raw monthly revenue ($M) for stream chart
export const revenueStream = segmentMonths.map((m, i) => {
  const t = i / (segmentMonths.length - 1);
  return {
    month: m,
    Enterprise: +(42 + 18 * t + Math.sin(i * 0.8) * 3).toFixed(1),
    "Mid-market": +(28 + 10 * t + Math.cos(i * 0.9) * 2).toFixed(1),
    "Growth SMB": +(18 + 6 * t + Math.sin(i * 1.1) * 1.5).toFixed(1),
    Startup: +(9 + 3 * t + Math.cos(i * 1.2) * 1.1).toFixed(1),
    "Public sector": +(6 + 2 * t + Math.sin(i * 0.6) * 0.8).toFixed(1),
  };
});

// ---- Chapter 6: Retention cohorts (calendar-style heatmap) ----
// Generate one calendar year of daily net-retention deltas (basis points).
export const retentionCalendar = (() => {
  const start = new Date("2025-10-01");
  const end = new Date("2026-09-30");
  const days: { day: string; value: number }[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const iso = d.toISOString().slice(0, 10);
    const dow = d.getDay();
    const idx = Math.floor((d.getTime() - start.getTime()) / 86_400_000);
    const seasonal = Math.sin(idx / 18) * 35;
    const weekly = dow === 0 || dow === 6 ? -8 : 2;
    const spike = idx % 29 === 0 ? 40 : 0;
    days.push({ day: iso, value: Math.round(40 + seasonal + weekly + spike) });
  }
  return days;
})();

// ---- Chapter 7: Advocacy — segment NPS radar ----
export const segmentRadar = [
  { trait: "NPS", Enterprise: 64, "Mid-market": 51, "Growth SMB": 42, Startup: 37 },
  { trait: "Activation speed", Enterprise: 58, "Mid-market": 71, "Growth SMB": 78, Startup: 82 },
  { trait: "Support CSAT", Enterprise: 82, "Mid-market": 74, "Growth SMB": 66, Startup: 59 },
  { trait: "Expansion intent", Enterprise: 71, "Mid-market": 62, "Growth SMB": 54, Startup: 38 },
  { trait: "Referral rate", Enterprise: 44, "Mid-market": 58, "Growth SMB": 67, Startup: 72 },
  { trait: "Community engagement", Enterprise: 38, "Mid-market": 54, "Growth SMB": 72, Startup: 81 },
];

// ---- Chapter 7b: Channel co-occurrence (chord) ----
// Symmetric matrix of co-touch frequencies across top 6 channels.
export const chordChannels = [
  "Organic",
  "Paid",
  "Dark Social",
  "Partner",
  "Webinar",
  "Community",
];
export const chordMatrix: number[][] = [
  [0, 320, 410, 210, 180, 260],
  [320, 0, 180, 140, 150, 120],
  [410, 180, 0, 150, 220, 380],
  [210, 140, 150, 0, 130, 180],
  [180, 150, 220, 130, 0, 240],
  [260, 120, 380, 180, 240, 0],
];

// ---- Visx custom datasets ----

// Attribution network: channels + touchpoints as nodes, edges weighted by
// assisted-conversion credit. Rendered with @visx/network.
export const attributionNetwork = {
  nodes: [
    { id: "visit", label: "First visit", x: 120, y: 320, kind: "entry" },
    { id: "blog", label: "Blog / Guide", x: 320, y: 180, kind: "content" },
    { id: "docs", label: "Docs", x: 320, y: 380, kind: "content" },
    { id: "compare", label: "Comparison", x: 520, y: 110, kind: "content" },
    { id: "demo", label: "Interactive demo", x: 520, y: 260, kind: "product" },
    { id: "pricing", label: "Pricing", x: 520, y: 410, kind: "commercial" },
    { id: "trial", label: "Free trial", x: 720, y: 220, kind: "commercial" },
    { id: "sales", label: "Sales call", x: 720, y: 360, kind: "commercial" },
    { id: "won", label: "Closed won", x: 920, y: 290, kind: "outcome" },
  ],
  links: [
    { source: "visit", target: "blog", weight: 0.38 },
    { source: "visit", target: "docs", weight: 0.22 },
    { source: "visit", target: "compare", weight: 0.14 },
    { source: "blog", target: "compare", weight: 0.28 },
    { source: "blog", target: "demo", weight: 0.34 },
    { source: "docs", target: "demo", weight: 0.41 },
    { source: "compare", target: "pricing", weight: 0.46 },
    { source: "demo", target: "trial", weight: 0.58 },
    { source: "pricing", target: "sales", weight: 0.52 },
    { source: "trial", target: "won", weight: 0.62 },
    { source: "sales", target: "won", weight: 0.47 },
    { source: "trial", target: "sales", weight: 0.21 },
    { source: "demo", target: "pricing", weight: 0.19 },
  ],
};

// Cohort flow: 6 monthly cohorts x 6 months of retention. Rendered with Visx.
export const cohortFlow = (() => {
  const cohorts = ["Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26"];
  return cohorts.map((c, i) => {
    const starting = 1000 - i * 30;
    const retentionCurve = [1, 0.86, 0.79, 0.74, 0.71, 0.69];
    return {
      cohort: c,
      months: retentionCurve.map((r, m) => ({
        month: m,
        active: Math.round(starting * r - i * 6 + Math.sin(m + i) * 8),
      })),
    };
  });
})();

// Visx gradient-area revenue over time (high-fidelity hero chart)
export const revenueArea = segmentMonths.map((m, i) => {
  const base = 68 + i * 6;
  const noise = Math.sin(i * 1.3) * 4;
  return { month: m, revenue: +(base + noise).toFixed(1) };
});

// ---- Insights ----
export const keyInsights = [
  {
    title: "Dark social is no longer dark",
    body: "18.7% of closed-won revenue first touched the brand in a channel we previously couldn't see — podcasts, Slack groups, creator DMs. Enterprises that instrumented self-reported attribution uncovered ~3× more pipeline than last-click models reported.",
  },
  {
    title: "The demo is the new pricing page",
    body: "Interactive demos drove 2.1× the trial starts of any other asset and shortened median time-to-qualification from 34 days to 18. Teams that shipped a demo in Q1 saw a 41-point lift in sales-accepted opportunities by Q3.",
  },
  {
    title: "Activation beats acquisition",
    body: "A 10-point lift in day-7 activation correlated with a 19-point lift in 12-month net revenue retention — more than any top-of-funnel investment we measured. Winning teams instrument activation like a product metric, not a marketing one.",
  },
  {
    title: "Advocacy scales down-market",
    body: "Referral rate and community engagement both peak in the Startup and Growth SMB segments — the opposite of NPS. The playbook for Enterprise cannot be copy-pasted to SMB; it has to be earned in community-native surfaces.",
  },
];

export const recommendations = [
  {
    phase: "Awareness",
    tactic: "Instrument self-reported attribution",
    why: "Recover the 34% of journeys hidden in dark social.",
    owner: "Growth",
  },
  {
    phase: "Acquisition",
    tactic: "Ship an interactive demo on the homepage",
    why: "2.1× trial starts, −47% time-to-qualification.",
    owner: "Product Marketing",
  },
  {
    phase: "Activation",
    tactic: "Define day-7 activation as a north-star",
    why: "Strongest leading indicator of NRR we measured.",
    owner: "Product + Lifecycle",
  },
  {
    phase: "Expansion",
    tactic: "Operationalize a referral surface",
    why: "SMB referral rate is 1.6× Enterprise; capture it.",
    owner: "Community",
  },
];
