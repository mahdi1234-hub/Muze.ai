"use client";

import { ReactNode } from "react";

export function ChartFrame({
  title,
  subtitle,
  library,
  chartType,
  children,
  footnote,
}: {
  title: string;
  subtitle?: string;
  library: "Nivo" | "Visx";
  chartType: string;
  children: ReactNode;
  footnote?: string;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="text-[13px] font-medium">{title}</div>
          {subtitle && (
            <div className="text-[11px] text-[color:var(--muted)] mt-0.5">
              {subtitle}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-[color:var(--muted)]">
            {chartType}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            {library}
          </span>
        </div>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
      {footnote && (
        <div className="text-[10px] text-[color:var(--muted)] mt-3 leading-relaxed">
          {footnote}
        </div>
      )}
    </div>
  );
}
