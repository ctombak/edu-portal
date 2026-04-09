"use client";

/**
 * Visual components for presentation slides.
 * Uses pres-* CSS vars so they adapt to light/dark theme automatically.
 */

/* ------------------------------------------------------------------ */
/*  Stat Bar                                                           */
/* ------------------------------------------------------------------ */
export function StatBar({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-20 shrink-0 text-right">
        <span className="text-3xl font-extrabold tabular-nums bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">
          {value}%
        </span>
      </div>
      <div className="flex-1">
        <div className="mb-1.5 text-sm font-medium" style={{ color: "var(--pres-heading)" }}>{label}</div>
        <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: "var(--pres-code-bg)" }}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-600 to-cyan-500 transition-all duration-1000 ease-out"
            style={{ width: `${value}%`, transitionDelay: `${delay}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Big Number                                                         */
/* ------------------------------------------------------------------ */
export function BigNumber({ value, suffix, label, large }: { value: string; suffix?: string; label: string; large?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border border-teal-500/20 ${large ? "px-8 py-8" : "px-6 py-5"}`}
      style={{ background: "var(--pres-badge-bg)" }}
    >
      <span className={`${large ? "text-6xl" : "text-4xl"} font-extrabold tabular-nums bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent`}>
        {value}{suffix}
      </span>
      <span className={`${large ? "mt-3 text-base" : "mt-2 text-sm"} text-center`} style={{ color: "var(--pres-muted)" }}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Grid                                                          */
/* ------------------------------------------------------------------ */
export function StatGrid({ stats, fullSize }: { stats: { value: string; suffix?: string; label: string }[]; fullSize?: boolean }) {
  return (
    <div className={`grid gap-4 ${stats.length <= 2 ? "grid-cols-2" : stats.length === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>
      {stats.map((s, i) => <BigNumber key={i} {...s} large={fullSize} />)}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Quadrant Diagram                                                   */
/* ------------------------------------------------------------------ */
export function QuadrantDiagram({
  title, xAxis, yAxis, quadrants,
}: {
  title?: string;
  xAxis: [string, string];
  yAxis: [string, string];
  quadrants: [string, string, string, string];
}) {
  const colors = [
    "border-teal-500/25 bg-teal-500/10",
    "border-cyan-500/25 bg-cyan-500/10",
    "border-sky-500/20 bg-sky-500/[0.08]",
    "border-amber-500/20 bg-amber-500/[0.08]",
  ];

  return (
    <div className="my-4">
      {title && <h4 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--pres-muted)" }}>{title}</h4>}
      <div className="relative mx-auto max-w-lg">
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap" style={{ color: "var(--pres-dim)" }}>
          {yAxis[1]} → {yAxis[0]}
        </div>
        <div className="ml-4 grid grid-cols-2 gap-2">
          {quadrants.map((q, i) => (
            <div key={i} className={`rounded-xl border p-4 ${colors[i]}`}>
              <span className="text-sm font-semibold" style={{ color: "var(--pres-heading)" }}>{q}</span>
            </div>
          ))}
        </div>
        <div className="ml-4 mt-2 text-center text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--pres-dim)" }}>
          {xAxis[0]} → {xAxis[1]}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Process Flow                                                       */
/* ------------------------------------------------------------------ */
export function ProcessFlow({ steps, fullSize }: { steps: { title: string; desc?: string }[]; fullSize?: boolean }) {
  return (
    <div className={`flex flex-col ${fullSize ? "gap-2" : "gap-1"}`}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className={`flex ${fullSize ? "h-11 w-11 text-base" : "h-9 w-9 text-sm"} shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 font-bold text-white shadow-lg shadow-teal-500/20`}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`${fullSize ? "h-8" : "h-6"} w-px bg-gradient-to-b from-teal-600/50 to-transparent`} />
            )}
          </div>
          <div className="pt-1.5 pb-2">
            <span className={`font-semibold ${fullSize ? "text-xl" : "text-lg"}`} style={{ color: "var(--pres-heading)" }}>{step.title}</span>
            {step.desc && <span className={`ml-1 ${fullSize ? "text-lg" : "text-base"}`} style={{ color: "var(--pres-muted)" }}> — {step.desc}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Equation Card                                                      */
/* ------------------------------------------------------------------ */
export function EquationCard({ equation, parts }: { equation: string; parts?: { term: string; desc: string }[] }) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-teal-500/20">
      <div className="px-6 py-5 text-center" style={{ background: "var(--pres-badge-bg)" }}>
        <span className="text-2xl font-bold tracking-wide" style={{ color: "var(--pres-heading)" }}>{equation}</span>
      </div>
      {parts && parts.length > 0 && (
        <div style={{ background: "var(--pres-table-bg)" }}>
          {parts.map((p, i) => (
            <div key={i} className="flex items-baseline gap-3 px-6 py-3" style={{ borderTop: "1px solid var(--pres-table-border)" }}>
              <span className="font-semibold" style={{ color: "var(--pres-accent)" }}>{p.term}</span>
              <span className="text-sm" style={{ color: "var(--pres-muted)" }}>{p.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Concept Cards                                                      */
/* ------------------------------------------------------------------ */
const conceptIcons: Record<string, string> = {
  analyst: "🔬", driver: "🚀", harmonizer: "🤝", visionary: "💡",
  credibility: "🎯", reliability: "⚡", intimacy: "🛡️",
  goal: "🎯", reality: "📍", options: "🔀", will: "✅",
  partner: "🤝", involve: "📢", consideration: "👁️", monitor: "📊",
  technical: "🔧", adaptive: "🔄", balcony: "🏛️", dance: "💃",
  default: "◆",
};

function getIcon(label: string): string {
  const lower = label.toLowerCase();
  for (const [key, icon] of Object.entries(conceptIcons)) {
    if (lower.includes(key)) return icon;
  }
  return conceptIcons.default;
}

const cardStyles = [
  "border-teal-500/20 bg-teal-500/[0.08]",
  "border-cyan-500/20 bg-cyan-500/[0.08]",
  "border-sky-500/20 bg-sky-500/[0.08]",
  "border-amber-500/20 bg-amber-500/[0.08]",
  "border-emerald-500/20 bg-emerald-500/[0.08]",
  "border-rose-500/20 bg-rose-500/[0.08]",
];

export function ConceptCards({ items, fullSize }: { items: { title: string; desc: string }[]; fullSize?: boolean }) {
  return (
    <div className={`grid gap-3 ${items.length <= 2 ? "grid-cols-2" : items.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {items.map((item, i) => (
        <div key={i} className={`rounded-xl border ${fullSize ? "p-5" : "p-4"} ${cardStyles[i % cardStyles.length]}`}>
          <div className={`${fullSize ? "mb-3 text-3xl" : "mb-2 text-2xl"}`}>{getIcon(item.title)}</div>
          <div className={`${fullSize ? "text-xl" : "text-lg"} font-bold`} style={{ color: "var(--pres-heading)" }}>{item.title}</div>
          <div className={`mt-1 ${fullSize ? "text-base" : "text-sm"} leading-relaxed`} style={{ color: "var(--pres-muted)" }}>{item.desc}</div>
        </div>
      ))}
    </div>
  );
}
