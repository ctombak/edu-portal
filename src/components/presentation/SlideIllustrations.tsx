"use client";

/**
 * Large, prominent SVG illustrations for presentation slides.
 * Each maps to a content theme and fills a significant visual area.
 */

/* ── Shared wrapper ── */
function Wrap({ children, className = "", size = "default" }: { children: React.ReactNode; className?: string; size?: "small" | "default" | "large" }) {
  const sizeClass = size === "large"
    ? "w-full h-full max-h-[400px]"
    : size === "small"
    ? "w-full h-full max-h-[200px]"
    : "w-full h-full max-h-[280px]";
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 300" className={sizeClass} fill="none">
        {children}
      </svg>
    </div>
  );
}

/* ── Leadership / People ── */
export function IllustrationLeadership() {
  return (
    <Wrap>
      {/* Central leader */}
      <circle cx="200" cy="100" r="28" className="fill-teal-500/20 stroke-teal-500/60" strokeWidth="2" />
      <circle cx="200" cy="88" r="10" className="fill-teal-400/40" />
      <rect x="190" y="102" width="20" height="18" rx="4" className="fill-teal-400/30" />
      {/* Connection lines */}
      {[
        { x: 100, y: 200 }, { x: 200, y: 220 }, { x: 300, y: 200 },
        { x: 140, y: 180 }, { x: 260, y: 180 },
      ].map((p, i) => (
        <g key={i}>
          <line x1="200" y1="120" x2={p.x} y2={p.y - 20} className="stroke-teal-500/20" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx={p.x} cy={p.y} r="18" className="fill-cyan-500/10 stroke-cyan-500/30" strokeWidth="1.5" />
          <circle cx={p.x} cy={p.y - 8} r="6" className="fill-cyan-400/25" />
          <rect x={p.x - 6} y={p.y - 1} width="12" height="10" rx="3" className="fill-cyan-400/20" />
        </g>
      ))}
      {/* Glow */}
      <circle cx="200" cy="100" r="50" className="fill-teal-500/[0.05]" />
    </Wrap>
  );
}

/* ── Statistics / Chart ── */
export function IllustrationStats() {
  const bars = [
    { h: 120, color: "fill-teal-500/50" },
    { h: 80, color: "fill-teal-400/40" },
    { h: 160, color: "fill-teal-600/50" },
    { h: 100, color: "fill-cyan-500/40" },
    { h: 140, color: "fill-teal-500/45" },
    { h: 60, color: "fill-cyan-400/35" },
    { h: 130, color: "fill-teal-400/45" },
  ];
  return (
    <Wrap>
      {bars.map((bar, i) => (
        <g key={i}>
          <rect
            x={60 + i * 44}
            y={260 - bar.h}
            width="28"
            height={bar.h}
            rx="4"
            className={bar.color}
          />
          <rect
            x={60 + i * 44}
            y={260 - bar.h}
            width="28"
            height="8"
            rx="4"
            className="fill-white/10"
          />
        </g>
      ))}
      {/* Baseline */}
      <line x1="50" y1="260" x2="370" y2="260" className="stroke-zinc-600/30" strokeWidth="1" />
      {/* Trend line */}
      <polyline
        points="74,180 118,200 162,140 206,170 250,130 294,160 338,120"
        className="stroke-teal-400/60"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Dots on trend */}
      {[74, 118, 162, 206, 250, 294, 338].map((x, i) => (
        <circle key={i} cx={x} cy={[180, 200, 140, 170, 130, 160, 120][i]} r="4" className="fill-teal-400/80" />
      ))}
    </Wrap>
  );
}

/* ── Trust / Relationships ── */
export function IllustrationTrust() {
  return (
    <Wrap>
      {/* Overlapping circles — Venn style */}
      <circle cx="160" cy="140" r="70" className="fill-teal-500/10 stroke-teal-500/30" strokeWidth="1.5" />
      <circle cx="240" cy="140" r="70" className="fill-cyan-500/10 stroke-cyan-500/30" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="70" className="fill-sky-500/10 stroke-sky-500/30" strokeWidth="1.5" />
      {/* Center intersection */}
      <circle cx="200" cy="160" r="20" className="fill-teal-400/20" />
      {/* Labels */}
      <text x="130" y="120" textAnchor="middle" className="fill-teal-400/60 text-[11px] font-semibold">Credibility</text>
      <text x="270" y="120" textAnchor="middle" className="fill-cyan-400/60 text-[11px] font-semibold">Reliability</text>
      <text x="200" y="245" textAnchor="middle" className="fill-sky-400/60 text-[11px] font-semibold">Intimacy</text>
      <text x="200" y="165" textAnchor="middle" className="fill-zinc-200/70 text-[12px] font-bold">Trust</text>
    </Wrap>
  );
}

/* ── Growth / Coaching ── */
export function IllustrationGrowth() {
  return (
    <Wrap>
      {/* Ascending steps */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x={60 + i * 65}
            y={230 - i * 40}
            width="55"
            height={30 + i * 40}
            rx="6"
            className="fill-teal-500/[0.08] stroke-teal-500/20"
            strokeWidth="1"
          />
          <rect
            x={60 + i * 65}
            y={230 - i * 40}
            width="55"
            height="20"
            rx="6"
            className="fill-teal-500/[0.12]"
          />
        </g>
      ))}
      {/* Arrow */}
      <line x1="60" y1="60" x2="360" y2="60" className="stroke-teal-400/0" />
      <polyline
        points="80,210 145,170 210,130 275,90 340,50"
        className="stroke-teal-400/40"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
        fill="none"
      />
      <polygon points="345,45 335,55 345,55" className="fill-teal-400/40" />
      {/* Star at top */}
      <circle cx="340" cy="50" r="8" className="fill-teal-400/20 stroke-teal-400/50" strokeWidth="1.5" />
    </Wrap>
  );
}

/* ── Exercise / Activity ── */
export function IllustrationExercise() {
  return (
    <Wrap>
      {/* Clipboard */}
      <rect x="130" y="40" width="140" height="200" rx="12" className="fill-teal-500/10 stroke-teal-500/25" strokeWidth="2" />
      <rect x="170" y="30" width="60" height="20" rx="10" className="fill-teal-500/20 stroke-teal-500/30" strokeWidth="1.5" />
      {/* Checklist items */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="155" y={80 + i * 40} width="18" height="18" rx="4" className={`stroke-teal-500/30 ${i < 2 ? "fill-teal-500/20" : "fill-transparent"}`} strokeWidth="1.5" />
          {i < 2 && <polyline points={`159,${89 + i * 40} 163,${93 + i * 40} 170,${84 + i * 40}`} className="stroke-teal-400/70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x="182" y={84 + i * 40} width={70 - i * 10} height="8" rx="4" className="fill-zinc-500/15" />
        </g>
      ))}
      {/* Pencil */}
      <g transform="translate(290, 140) rotate(25)">
        <rect x="0" y="0" width="8" height="60" rx="2" className="fill-amber-500/30 stroke-amber-500/40" strokeWidth="1" />
        <polygon points="0,60 8,60 4,72" className="fill-amber-500/40" />
      </g>
    </Wrap>
  );
}

/* ── Discussion / Communication ── */
export function IllustrationDiscussion() {
  return (
    <Wrap>
      {/* Speech bubbles */}
      <rect x="60" y="60" width="160" height="80" rx="16" className="fill-teal-500/10 stroke-teal-500/25" strokeWidth="1.5" />
      <polygon points="100,140 110,160 120,140" className="fill-teal-500/10 stroke-teal-500/25" strokeWidth="1.5" />
      <rect x="80" y="85" width="100" height="6" rx="3" className="fill-teal-400/20" />
      <rect x="80" y="100" width="70" height="6" rx="3" className="fill-teal-400/15" />
      <rect x="80" y="115" width="85" height="6" rx="3" className="fill-teal-400/15" />

      <rect x="180" y="150" width="160" height="80" rx="16" className="fill-cyan-500/10 stroke-cyan-500/25" strokeWidth="1.5" />
      <polygon points="300,230 290,250 280,230" className="fill-cyan-500/10 stroke-cyan-500/25" strokeWidth="1.5" />
      <rect x="200" y="175" width="100" height="6" rx="3" className="fill-cyan-400/20" />
      <rect x="200" y="190" width="80" height="6" rx="3" className="fill-cyan-400/15" />
      <rect x="200" y="205" width="90" height="6" rx="3" className="fill-cyan-400/15" />

      {/* Connection dots */}
      <circle cx="170" cy="155" r="4" className="fill-teal-400/30" />
      <circle cx="185" cy="150" r="3" className="fill-cyan-400/20" />
    </Wrap>
  );
}

/* ── Strategy / Compass ── */
export function IllustrationStrategy() {
  return (
    <Wrap>
      {/* Compass circle */}
      <circle cx="200" cy="150" r="100" className="fill-teal-500/[0.05] stroke-teal-500/20" strokeWidth="1.5" />
      <circle cx="200" cy="150" r="70" className="stroke-teal-500/10" strokeWidth="1" />
      <circle cx="200" cy="150" r="40" className="stroke-teal-500/10" strokeWidth="1" />
      {/* Cardinal points */}
      <line x1="200" y1="50" x2="200" y2="250" className="stroke-teal-500/15" strokeWidth="1" />
      <line x1="100" y1="150" x2="300" y2="150" className="stroke-teal-500/15" strokeWidth="1" />
      {/* Needle */}
      <polygon points="200,70 190,155 200,145 210,155" className="fill-teal-500/40" />
      <polygon points="200,230 190,155 200,165 210,155" className="fill-cyan-500/20" />
      {/* Center */}
      <circle cx="200" cy="150" r="8" className="fill-teal-500/30 stroke-teal-400/50" strokeWidth="2" />
      {/* Labels */}
      <text x="200" y="42" textAnchor="middle" className="fill-teal-400/60 text-[12px] font-bold">N</text>
      <text x="310" y="155" textAnchor="middle" className="fill-zinc-500/40 text-[12px] font-bold">E</text>
      <text x="200" y="268" textAnchor="middle" className="fill-zinc-500/40 text-[12px] font-bold">S</text>
      <text x="90" y="155" textAnchor="middle" className="fill-zinc-500/40 text-[12px] font-bold">W</text>
    </Wrap>
  );
}

/* ── Change / Transformation ── */
export function IllustrationChange() {
  return (
    <Wrap>
      {/* Before state */}
      <rect x="40" y="100" width="100" height="100" rx="12" className="fill-zinc-500/10 stroke-zinc-500/20" strokeWidth="1.5" />
      <rect x="60" y="120" width="60" height="8" rx="4" className="fill-zinc-500/15" />
      <rect x="60" y="136" width="45" height="8" rx="4" className="fill-zinc-500/10" />
      <rect x="60" y="152" width="55" height="8" rx="4" className="fill-zinc-500/10" />
      {/* Arrow */}
      <g>
        <line x1="160" y1="150" x2="240" y2="150" className="stroke-teal-500/40" strokeWidth="3" strokeLinecap="round" />
        <polygon points="240,142 258,150 240,158" className="fill-teal-500/40" />
        {/* Sparkles on arrow */}
        <circle cx="190" cy="138" r="3" className="fill-teal-400/30" />
        <circle cx="210" cy="160" r="2" className="fill-teal-400/25" />
        <circle cx="225" cy="135" r="2.5" className="fill-cyan-400/30" />
      </g>
      {/* After state — elevated */}
      <rect x="260" y="80" width="100" height="120" rx="12" className="fill-teal-500/10 stroke-teal-500/25" strokeWidth="1.5" />
      <rect x="280" y="100" width="60" height="8" rx="4" className="fill-teal-400/20" />
      <rect x="280" y="116" width="45" height="8" rx="4" className="fill-teal-400/15" />
      <rect x="280" y="132" width="55" height="8" rx="4" className="fill-teal-400/15" />
      <rect x="280" y="148" width="40" height="8" rx="4" className="fill-teal-400/10" />
      {/* Glow on new */}
      <circle cx="310" cy="140" r="50" className="fill-teal-500/[0.04]" />
    </Wrap>
  );
}

/* ── AI / Technology ── */
export function IllustrationAI() {
  return (
    <Wrap>
      {/* Neural network */}
      {/* Layer 1 */}
      {[80, 130, 180].map((y, i) => (
        <circle key={`l1-${i}`} cx="80" cy={y} r="12" className="fill-teal-500/15 stroke-teal-500/30" strokeWidth="1.5" />
      ))}
      {/* Layer 2 */}
      {[60, 110, 160, 210].map((y, i) => (
        <circle key={`l2-${i}`} cx="180" cy={y} r="12" className="fill-cyan-500/15 stroke-cyan-500/30" strokeWidth="1.5" />
      ))}
      {/* Layer 3 */}
      {[90, 140, 190].map((y, i) => (
        <circle key={`l3-${i}`} cx="280" cy={y} r="12" className="fill-teal-500/15 stroke-teal-500/30" strokeWidth="1.5" />
      ))}
      {/* Output */}
      <circle cx="360" cy="140" r="16" className="fill-teal-500/20 stroke-teal-400/50" strokeWidth="2" />
      {/* Connections */}
      {[80, 130, 180].map((y1) =>
        [60, 110, 160, 210].map((y2, j) => (
          <line key={`c1-${y1}-${j}`} x1="92" y1={y1} x2="168" y2={y2} className="stroke-teal-500/10" strokeWidth="1" />
        ))
      )}
      {[60, 110, 160, 210].map((y1) =>
        [90, 140, 190].map((y2, j) => (
          <line key={`c2-${y1}-${j}`} x1="192" y1={y1} x2="268" y2={y2} className="stroke-cyan-500/10" strokeWidth="1" />
        ))
      )}
      {[90, 140, 190].map((y, i) => (
        <line key={`c3-${i}`} x1="292" y1={y} x2="344" y2={140} className="stroke-teal-500/15" strokeWidth="1" />
      ))}
      {/* Pulse */}
      <circle cx="360" cy="140" r="24" className="fill-teal-400/[0.06]" />
    </Wrap>
  );
}

/* ── Feedback / Mirror ── */
export function IllustrationFeedback() {
  return (
    <Wrap>
      {/* Two people facing each other */}
      <g>
        {/* Person left */}
        <circle cx="120" cy="120" r="22" className="fill-teal-500/10 stroke-teal-500/25" strokeWidth="1.5" />
        <circle cx="120" cy="110" r="9" className="fill-teal-400/30" />
        <rect x="112" y="122" width="16" height="14" rx="4" className="fill-teal-400/20" />
        {/* Signal waves going right */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${155 + i * 18},120 Q ${165 + i * 18},105 ${155 + i * 18},90`}
            className="stroke-teal-400/20"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </g>
      <g>
        {/* Person right */}
        <circle cx="280" cy="120" r="22" className="fill-cyan-500/10 stroke-cyan-500/25" strokeWidth="1.5" />
        <circle cx="280" cy="110" r="9" className="fill-cyan-400/30" />
        <rect x="272" y="122" width="16" height="14" rx="4" className="fill-cyan-400/20" />
        {/* Signal waves going left */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${245 - i * 18},180 Q ${235 - i * 18},195 ${245 - i * 18},210`}
            className="stroke-cyan-400/20"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </g>
      {/* Exchange symbol */}
      <circle cx="200" cy="150" r="15" className="fill-teal-500/10 stroke-teal-500/20" strokeWidth="1.5" />
      <text x="200" y="155" textAnchor="middle" className="fill-teal-400/50 text-[14px]">⇄</text>
    </Wrap>
  );
}

/* ── Quadrant / Grid ── */
export function IllustrationGrid() {
  return (
    <Wrap>
      <line x1="200" y1="30" x2="200" y2="270" className="stroke-teal-500/20" strokeWidth="1.5" />
      <line x1="50" y1="150" x2="350" y2="150" className="stroke-teal-500/20" strokeWidth="1.5" />
      {/* Quadrant fills */}
      <rect x="55" y="35" width="140" height="110" rx="8" className="fill-teal-500/[0.06]" />
      <rect x="205" y="35" width="140" height="110" rx="8" className="fill-cyan-500/[0.06]" />
      <rect x="55" y="155" width="140" height="110" rx="8" className="fill-zinc-500/[0.04]" />
      <rect x="205" y="155" width="140" height="110" rx="8" className="fill-amber-500/[0.04]" />
      {/* Dots representing items */}
      <circle cx="120" cy="80" r="6" className="fill-teal-500/25" />
      <circle cx="145" cy="100" r="4" className="fill-teal-500/20" />
      <circle cx="260" cy="70" r="5" className="fill-cyan-500/25" />
      <circle cx="290" cy="95" r="7" className="fill-cyan-500/20" />
      <circle cx="110" cy="200" r="4" className="fill-zinc-500/15" />
      <circle cx="270" cy="210" r="5" className="fill-amber-500/20" />
    </Wrap>
  );
}

/* ── Theme → Illustration mapping ── */
const themeKeywords: [RegExp, () => React.ReactNode][] = [
  [/exercis|activity|workbook|worksheet|practice|pair up|role.?play|map your|write down|share.*partner|debrief/i, () => <IllustrationExercise />],
  [/discussion|discuss|reflect|share|debrief|gallery walk|group/i, () => <IllustrationDiscussion />],
  [/statistic|%|percent|survey|research|data|forecast|report.*find/i, () => <IllustrationStats />],
  [/trust|relational|relationship|credibility|reliability|intimacy/i, () => <IllustrationTrust />],
  [/feedback|SBI|coaching|GROW|mentor/i, () => <IllustrationFeedback />],
  [/change|transform|transition|kotter|bridges|evolution/i, () => <IllustrationChange />],
  [/AI|artificial intelligence|machine learning|neural|automat/i, () => <IllustrationAI />],
  [/strateg|vision|compass|direction|decision|delegation|priorit/i, () => <IllustrationStrategy />],
  [/grid|matrix|quadrant|stakeholder.*map|power.*interest/i, () => <IllustrationGrid />],
  [/grow|develop|coaching|psychological safety|fail.?fast|learn/i, () => <IllustrationGrowth />],
  [/leader|influence|manage|team|organ/i, () => <IllustrationLeadership />],
];

export function getSlideIllustration(content: string, size: "small" | "default" | "large" = "default"): React.ReactNode | null {
  for (const [pattern, render] of themeKeywords) {
    if (pattern.test(content)) {
      const sizeClass = size === "large"
        ? "w-full max-w-md"
        : size === "small"
        ? "w-48"
        : "w-72";
      return <div className={sizeClass}>{render()}</div>;
    }
  }
  return null;
}
