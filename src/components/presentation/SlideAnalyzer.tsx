"use client";

import { useMemo } from "react";
import {
  StatBar,
  StatGrid,
  QuadrantDiagram,
  ProcessFlow,
  EquationCard,
  ConceptCards,
} from "./SlideVisuals";

/**
 * Analyzes slide markdown content and returns auto-generated visual components,
 * the raw text lines consumed, and a layout classification hint.
 */

export type SlideLayout =
  | "title"
  | "stat"
  | "process"
  | "equation"
  | "concept"
  | "quote"
  | "short"
  | "table"
  | "content";

export interface SlideAnalysis {
  visual: React.ReactNode | null;
  matchedTexts: string[];
  layoutHint: SlideLayout;
}

interface DetectorResult {
  type: string;
  component: React.ReactNode;
  matchedTexts: string[];
}

/* ------------------------------------------------------------------ */
/*  Pattern: lines with percentage numbers → StatBars or StatGrid      */
/* ------------------------------------------------------------------ */
function detectStats(content: string): DetectorResult | null {
  const statPattern = /^[-*]\s+(\d{1,3})%\s+(.+)/gm;
  const matches = [...content.matchAll(statPattern)];
  if (matches.length < 2) return null;

  const matchedTexts = matches.map((m) => m[0]);

  if (matches.length <= 4) {
    const stats = matches.map((m) => ({
      value: m[1],
      suffix: "%",
      label: m[2].replace(/\*\*/g, "").trim(),
    }));
    return { type: "stat-grid", component: <StatGrid stats={stats} fullSize />, matchedTexts };
  }

  const bars = matches.map((m, i) => ({
    value: parseInt(m[1]),
    label: m[2].replace(/\*\*/g, "").trim(),
    delay: i * 200,
  }));
  return {
    type: "stat-bars",
    matchedTexts,
    component: (
      <div className="space-y-1">
        {bars.map((b, i) => (
          <StatBar key={i} {...b} />
        ))}
      </div>
    ),
  };
}

/* ------------------------------------------------------------------ */
/*  Pattern: multiplier stats like "3x further"                        */
/* ------------------------------------------------------------------ */
function detectMultipliers(content: string): DetectorResult | null {
  const multPattern = /(\d+)x\s+([\w\s]+)/gi;
  const matches = [...content.matchAll(multPattern)];
  if (matches.length < 2) return null;

  const matchedTexts = matches.map((m) => m[0]);
  const stats = matches.map((m) => ({
    value: m[1],
    suffix: "x",
    label: m[2].trim(),
  }));

  return { type: "multiplier-grid", component: <StatGrid stats={stats} fullSize />, matchedTexts };
}

/* ------------------------------------------------------------------ */
/*  Pattern: equation like "Trust = (X + Y + Z) / W"                   */
/* ------------------------------------------------------------------ */
function detectEquation(content: string): DetectorResult | null {
  const eqPatterns = [
    /\*\*(\w[\w\s]*=\s*\(.+?\)\s*\/\s*.+?)\*\*/,
    /(\w[\w\s]*=\s*\(.+?\)\s*\/\s*[\w-]+)/,
  ];

  for (const pattern of eqPatterns) {
    const match = content.match(pattern);
    if (match) {
      const partPattern = /\*\*(\w[\w\s]*?)\*\*\s*(?:comes?\s+from|from|is|--)\s+(.+?)(?:\n|$)/gi;
      const parts = [...content.matchAll(partPattern)].map((m) => ({
        term: m[1].trim(),
        desc: m[2].replace(/\*\*/g, "").trim(),
      }));

      const matchedTexts = [match[0], ...parts.map((_, i) => content.matchAll(partPattern) ? match[0] : "")].filter(Boolean);

      return {
        type: "equation",
        component: <EquationCard equation={match[1].trim()} parts={parts.slice(0, 6)} />,
        matchedTexts: [match[0]],
      };
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Pattern: bold-labeled list items → Concept Cards                   */
/* ------------------------------------------------------------------ */
function detectConceptCards(content: string): DetectorResult | null {
  const cardPattern = /^[-*]\s+\*\*(?:The\s+)?(.+?)[:\*]+\*?\*?\s*(.+)/gm;
  const matches = [...content.matchAll(cardPattern)];
  if (matches.length < 3) return null;

  const matchedTexts = matches.map((m) => m[0]);

  const items = matches.map((m) => ({
    title: m[1].replace(/\*\*/g, "").replace(/:$/, "").trim(),
    desc: m[2]
      .replace(/\*\*/g, "")
      .replace(/--\s*but\s+/i, "— ")
      .replace(/--\s+/g, "— ")
      .trim(),
  }));

  const avgLen = items.reduce((sum, it) => sum + it.desc.length, 0) / items.length;
  if (avgLen < 15) return null;

  return {
    type: "concept-cards",
    component: <ConceptCards items={items.slice(0, 6)} fullSize />,
    matchedTexts,
  };
}

/* ------------------------------------------------------------------ */
/*  Pattern: numbered steps (1. **X** — desc) → Process Flow           */
/* ------------------------------------------------------------------ */
function detectProcessFlow(content: string): DetectorResult | null {
  const stepPattern = /^\s*\d+\.\s+\*\*(.+?)\*\*\s*[-—–:]\s*(.+)/gm;
  const matches = [...content.matchAll(stepPattern)];
  if (matches.length < 3) return null;

  const matchedTexts = matches.map((m) => m[0]);

  const steps = matches.map((m) => ({
    title: m[1].trim(),
    desc: m[2].replace(/\*\*/g, "").trim(),
  }));

  return {
    type: "process-flow",
    component: <ProcessFlow steps={steps} fullSize />,
    matchedTexts,
  };
}

/* ------------------------------------------------------------------ */
/*  Pattern: 2x2 grid / quadrant (high/low axes)                      */
/* ------------------------------------------------------------------ */
function detectQuadrant(content: string): DetectorResult | null {
  if (!/(grid|matrix|quadrant)/i.test(content)) return null;

  const quadPattern = /\*\*(\w[\w\s]*?)\*\*\s*\(([^)]+)\)\s*[-—–]\s*(.+)/g;
  const matches = [...content.matchAll(quadPattern)];

  if (matches.length === 4) {
    const matchedTexts = matches.map((m) => m[0]);
    return {
      type: "quadrant",
      matchedTexts,
      component: (
        <QuadrantDiagram
          xAxis={["Low Engagement", "High Engagement"]}
          yAxis={["Low Influence", "High Influence"]}
          quadrants={matches.map((m) => `${m[1].trim()}\n${m[3].trim().substring(0, 50)}`) as [string, string, string, string]}
        />
      ),
    };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Layout classifier                                                  */
/* ------------------------------------------------------------------ */
function classifyLayout(content: string, detectorType: string | null): SlideLayout {
  if (detectorType === "stat-grid" || detectorType === "stat-bars" || detectorType === "multiplier-grid") return "stat";
  if (detectorType === "process-flow") return "process";
  if (detectorType === "equation") return "equation";
  if (detectorType === "concept-cards") return "concept";
  if (detectorType === "quadrant") return "concept";

  // Check for dominant blockquote
  const lines = content.trim().split("\n").filter((l) => l.trim().length > 0);
  const quoteLines = lines.filter((l) => l.trim().startsWith(">"));
  if (quoteLines.length > 0 && quoteLines.length >= lines.length * 0.4) return "quote";

  // Check for table
  if (/\|.+\|/.test(content) && /\|[-:]+\|/.test(content)) return "table";

  // Short content → big centered text
  const contentLines = lines.filter((l) => !l.startsWith("#"));
  if (contentLines.length <= 3) return "short";

  return "content";
}

/* ------------------------------------------------------------------ */
/*  Main analysis hook                                                 */
/* ------------------------------------------------------------------ */
export function useSlideAnalysis(content: string): SlideAnalysis {
  return useMemo(() => {
    if (!content || content.trim().length < 50) {
      return { visual: null, matchedTexts: [], layoutHint: "short" };
    }

    const detectors = [
      detectEquation,
      detectProcessFlow,
      detectStats,
      detectMultipliers,
      detectQuadrant,
      detectConceptCards,
    ];

    for (const detect of detectors) {
      const result = detect(content);
      if (result) {
        return {
          visual: result.component,
          matchedTexts: result.matchedTexts,
          layoutHint: classifyLayout(content, result.type),
        };
      }
    }

    return {
      visual: null,
      matchedTexts: [],
      layoutHint: classifyLayout(content, null),
    };
  }, [content]);
}

/** @deprecated Use useSlideAnalysis instead */
export function useSlideVisuals(content: string): React.ReactNode | null {
  const { visual } = useSlideAnalysis(content);
  return visual;
}
