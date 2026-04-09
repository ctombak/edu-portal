"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import {
  ChevronLeft, ChevronRight, X, MessageSquare, Clock, Grid3X3, Maximize, Minimize,
} from "lucide-react";
import type { Slide, VariantScheduleItem } from "@/types/course";
import { useSlideAnalysis } from "./SlideAnalyzer";
import { getSlideIllustration } from "./SlideIllustrations";

interface ModuleBreak { moduleTitle: string; startIndex: number; }
interface Props {
  slides: Slide[]; moduleBreaks: ModuleBreak[]; variantTitle: string;
  schedule: VariantScheduleItem[]; locale: string; courseSlug: string;
}

export function PresentationShell({ slides, moduleBreaks, variantTitle }: Props) {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = slides.length;
  const slide = slides[current];
  const currentModule = [...moduleBreaks].reverse().find((mb) => current >= mb.startIndex)?.moduleTitle ?? "";

  const isTitleSlide = useMemo(() => {
    if (!slide) return false;
    const t = slide.content.trim();
    return t.startsWith("# ") && !t.startsWith("##");
  }, [slide]);

  useEffect(() => { const i = setInterval(() => setElapsed((e) => e + 1), 1000); return () => clearInterval(i); }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return h > 0 ? `${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}` : `${m}:${String(sec).padStart(2,"0")}`;
  };

  const clockStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const goNext = useCallback(() => { if (!showOverview) setCurrent((c) => Math.min(c + 1, totalSlides - 1)); }, [showOverview, totalSlides]);
  const goPrev = useCallback(() => { if (!showOverview) setCurrent((c) => Math.max(c - 1, 0)); }, [showOverview]);
  const toggleFs = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    else document.exitFullscreen().then(() => setIsFullscreen(false));
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight": case " ": case "Enter": e.preventDefault(); goNext(); break;
        case "ArrowLeft": case "Backspace": e.preventDefault(); goPrev(); break;
        case "Escape": showOverview ? setShowOverview(false) : window.history.back(); break;
        case "n": case "N": setShowNotes((v) => !v); break;
        case "t": case "T": setShowTimer((v) => !v); break;
        case "o": case "O": setShowOverview((v) => !v); break;
        case "f": case "F": toggleFs(); break;
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goNext, goPrev, showOverview, toggleFs]);

  useEffect(() => {
    const fn = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", fn);
    return () => document.removeEventListener("fullscreenchange", fn);
  }, []);

  if (!slide) return null;
  const progress = ((current + 1) / totalSlides) * 100;

  if (showOverview) {
    return (
      <div className="pres-root fixed inset-0 z-50 overflow-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold pres-heading">Slide Overview</h2>
            <p className="text-sm pres-muted">{variantTitle}</p>
          </div>
          <button onClick={() => setShowOverview(false)} className="rounded-lg p-2.5 pres-muted hover:opacity-80"><X className="h-5 w-5" /></button>
        </div>
        {moduleBreaks.map((mb, i) => {
          const next = moduleBreaks[i + 1]?.startIndex ?? totalSlides;
          return (
            <div key={i} className="mb-8">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider pres-accent">{mb.moduleTitle}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {slides.slice(mb.startIndex, next).map((s, j) => {
                  const idx = mb.startIndex + j;
                  const mod = [...moduleBreaks].reverse().find((m) => idx >= m.startIndex)?.moduleTitle ?? "";
                  const isTitle = s.content.trim().startsWith("# ") && !s.content.trim().startsWith("##");
                  return (
                    <SlideThumbnail key={idx} idx={idx} isCurrent={idx === current}
                      slide={s} isTitle={isTitle} mod={mod} totalSlides={totalSlides}
                      onClick={() => { setCurrent(idx); setShowOverview(false); }} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="pres-root fixed inset-0 z-50 flex flex-col">
      <div className="relative flex flex-1 min-h-0 p-4">
        <div className="flex flex-1 min-h-0 cursor-pointer" onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          if (e.clientX - r.left > r.width / 2) goNext(); else goPrev();
        }}>
          <div className="pres-slide-card">
            <div className="pres-accent-strip" />
            <div className="pres-slide-inner" style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', minHeight: 0 }}>
              <AutoFitContent>
                <SlideContent slide={slide} isTitleSlide={isTitleSlide} currentModule={currentModule}
                  slideIndex={current} totalSlides={totalSlides} />
              </AutoFitContent>
              <SlideFooter idx={current} total={totalSlides} />
            </div>
          </div>
        </div>
        {showNotes && slide.notes && (
          <div className="w-80 shrink-0 pres-notes-panel p-5 overflow-y-auto rounded-r-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-3.5 w-3.5 pres-accent" />
              <span className="text-xs font-semibold pres-accent uppercase tracking-wider">Speaker Notes</span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap pres-body">{slide.notes}</p>
          </div>
        )}
      </div>

      <div className="pres-bar shrink-0">
        <div className="pres-progress-track"><div className="pres-progress-fill transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        <div className="flex items-center justify-between px-5 py-2">
          <div className="flex items-center gap-3 min-w-0">
            <Image src="/logo.png" alt="" width={22} height={22} className="rounded-sm opacity-60" />
            <span className="text-xs font-medium truncate max-w-[200px] pres-body">{currentModule}</span>
            <span className="pres-dim">|</span>
            <span className="text-xs font-mono tabular-nums pres-muted">{current + 1} / {totalSlides}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <button onClick={goPrev} disabled={current === 0} className="pres-btn disabled:opacity-20"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={goNext} disabled={current === totalSlides - 1} className="pres-btn disabled:opacity-20"><ChevronRight className="h-5 w-5" /></button>
          </div>
          <div className="flex items-center gap-0.5">
            {showTimer && (
              <div className="flex items-center gap-2.5 mr-3 text-xs font-mono tabular-nums pres-muted">
                <span>{clockStr}</span><span className="pres-dim">|</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{formatTime(elapsed)}</span>
              </div>
            )}
            <button onClick={() => setShowNotes((v) => !v)} className={`pres-btn ${showNotes ? "pres-btn-active" : ""}`} title="Notes (N)"><MessageSquare className="h-4 w-4" /></button>
            <button onClick={() => setShowTimer((v) => !v)} className={`pres-btn ${showTimer ? "pres-btn-active" : ""}`} title="Timer (T)"><Clock className="h-4 w-4" /></button>
            <button onClick={() => setShowOverview(true)} className="pres-btn" title="Overview (O)"><Grid3X3 className="h-4 w-4" /></button>
            <button onClick={toggleFs} className="pres-btn" title="Fullscreen (F)">{isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}</button>
            <button onClick={() => window.history.back()} className="pres-btn" title="Exit (Esc)"><X className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  AutoFitContent — scales down content if it overflows the container */
/* ================================================================== */
function AutoFitContent({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const fit = () => {
      // Reset scale to measure natural height
      inner.style.transform = 'scale(1)';
      inner.style.transformOrigin = 'top left';
      const containerH = outer.clientHeight;
      const contentH = inner.scrollHeight;
      if (contentH > containerH && containerH > 0) {
        const s = Math.max(containerH / contentH, 0.55); // never shrink below 55%
        setScale(s);
      } else {
        setScale(1);
      }
    };

    // Measure after render
    const raf = requestAnimationFrame(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(outer);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [children]);

  return (
    <div ref={outerRef} style={{ flex: '1 1 0%', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div ref={innerRef} style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: scale < 1 ? `${100 / scale}%` : '100%',
        margin: scale === 1 ? 'auto 0' : '0',
      }}>
        {children}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SlideContent — the ONLY child of pres-slide-inner (grid cell)      */
/* ================================================================== */
function SlideContent({ slide, isTitleSlide, currentModule, slideIndex, totalSlides }: {
  slide: Slide; isTitleSlide: boolean; currentModule: string; slideIndex: number; totalSlides: number;
}) {
  const { visual, matchedTexts, layoutHint } = useSlideAnalysis(slide.content);
  const illustration = useMemo(() => getSlideIllustration(slide.content, "large"), [slide.content]);
  const title = slide.content.match(/^##\s+(.+)/m)?.[1];

  /* ── Title slide ── */
  if (isTitleSlide) {
    return (
      <>
        <div className="relative">
          {/* Decorative gradient orb */}
          <div className="absolute inset-0 -top-20 -bottom-20 pointer-events-none" aria-hidden>
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30" style={{
              background: 'radial-gradient(circle, var(--pres-accent) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }} />
          </div>
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full pres-badge px-5 py-2">
              <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-sm font-semibold tracking-widest uppercase">{currentModule}</span>
            </div>
            {illustration && <div className="mb-8">{illustration}</div>}
            <div className="pres-title-content">
              <SlideMarkdown content={slide.content} isTitleSlide excludeTexts={[]} />
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Visual layout (stats, process, etc.) ── */
  if (visual && (layoutHint === "stat" || layoutHint === "process" || layoutHint === "equation" || layoutHint === "concept")) {
    return (
      <>
        <div>
          <div className="pres-module-label mb-5">{currentModule}</div>
          {title && (
            <>
              <h2 className="text-6xl font-extrabold tracking-tight mb-3 pres-heading">{title}</h2>
              <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mb-5" />
            </>
          )}
          <div className="mb-6">{visual}</div>
          <div className="pres-content">
            <SlideMarkdown content={slide.content} isTitleSlide={false} excludeTexts={matchedTexts} />
          </div>
        </div>
      </>
    );
  }

  /* ── Quote / Short — centered text ── */
  if (layoutHint === "quote" || layoutHint === "short") {
    return (
      <>
        <div className="text-center max-w-4xl mx-auto">
          <div className="pres-module-label mb-5 justify-center">{currentModule}</div>
          <div className="pres-content" style={{ fontSize: layoutHint === "short" ? "2.2rem" : "1.9rem", lineHeight: "1.8" }}>
            <SlideMarkdown content={slide.content} isTitleSlide={false} excludeTexts={[]} />
          </div>
        </div>
      </>
    );
  }

  /* ── Default content layout ── */
  return (
    <>
      <div>
        <div className="pres-module-label mb-5">{currentModule}</div>
        {title && (
          <>
            <h2 className="text-6xl font-extrabold tracking-tight mb-3 pres-heading">{title}</h2>
            <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mb-5" />
          </>
        )}
        <div className="pres-content">
          <SlideMarkdown content={slide.content} isTitleSlide={false} excludeTexts={[]} />
        </div>
      </div>
    </>
  );
}

/* ================================================================== */
/*  SlideThumbnail — measures itself and scales 1920×1080 to fit       */
/* ================================================================== */
function SlideThumbnail({ idx, isCurrent, slide, isTitle, mod, totalSlides, onClick }: {
  idx: number; isCurrent: boolean; slide: Slide; isTitle: boolean; mod: string; totalSlides: number; onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(0.1);

  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const w = ref.current?.offsetWidth ?? 300;
      setScale(w / 1920);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <button ref={ref} onClick={onClick}
      className={`relative aspect-[16/10] rounded-lg border-2 overflow-hidden transition-all hover:scale-[1.03] ${isCurrent ? "pres-card-active" : "pres-card-idle"}`}>
      <div className="absolute top-0 left-0 pointer-events-none origin-top-left" style={{
        width: '1920px', height: '1080px', transform: `scale(${scale})`,
      }}>
        <div className="pres-slide-card" style={{ width: '1920px', height: '1080px', borderRadius: 0, border: 'none', boxShadow: 'none' }}>
          <div className="pres-accent-strip" />
          <div className="pres-slide-inner" style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', minHeight: 0 }}>
            <SlideContent slide={slide} isTitleSlide={isTitle} currentModule={mod}
              slideIndex={idx} totalSlides={totalSlides} />
          </div>
        </div>
      </div>
      <span className="absolute bottom-1 right-2 font-mono text-[10px] pres-dim z-10">{idx + 1}</span>
    </button>
  );
}

/* ================================================================== */
function SlideFooter({ idx, total }: { idx: number; total: number }) {
  return (
    <div className="absolute bottom-4 left-0 right-0 px-16 flex items-center justify-between z-10">
      <div className="flex items-center gap-2 opacity-40">
        <Image src="/logo.png" alt="" width={16} height={16} className="rounded-sm" />
        <span className="text-[10px] font-medium tracking-wide pres-muted">Atlantic Learning</span>
      </div>
      <span className="font-mono text-[11px] tabular-nums pres-dim">{idx + 1} / {total}</span>
    </div>
  );
}

/* ================================================================== */
function SlideMarkdown({ content, isTitleSlide, excludeTexts }: {
  content: string; isTitleSlide: boolean; excludeTexts: string[];
}) {
  const processedContent = useMemo(() => {
    let text = content;
    if (!isTitleSlide) text = text.replace(/^##\s+.+\n?/m, "");
    if (excludeTexts.length > 0) {
      for (const exclude of excludeTexts) {
        const trimmed = exclude.trim();
        if (trimmed) text = text.split("\n").filter((line) => line.trim() !== trimmed).join("\n");
      }
    }
    return text.trim();
  }, [content, isTitleSlide, excludeTexts]);

  if (!processedContent) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="pres-h1 text-6xl font-extrabold leading-tight mb-4">{children}</h1>,
        h2: ({ children }) => isTitleSlide
          ? <h2 className="text-2xl font-normal mt-4 pres-subtitle">{children}</h2>
          : <h2 className="text-2xl font-bold tracking-tight mt-0 mb-4 pres-heading">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold tracking-tight mb-2 pres-heading">{children}</h3>,
        p: ({ children }) => <p className="leading-relaxed pres-body my-2">{children}</p>,
        strong: ({ children }) => <strong className="font-bold pres-strong">{children}</strong>,
        em: ({ children }) => <em className="pres-muted">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="pres-blockquote rounded-r-xl py-3 px-5 my-4 text-lg font-medium italic w-fit">{children}</blockquote>
        ),
        ul: ({ children }) => <ul className="space-y-3 my-4 list-none pl-0 [&_ul]:pl-10 [&_ul]:mt-2 [&_ul]:mb-0 [&_ol]:pl-10 [&_ol]:mt-2 [&_ol]:mb-0">{children}</ul>,
        ol: ({ children }) => <ol className="space-y-3 my-4 list-none pl-0 [&_ul]:pl-10 [&_ul]:mt-2 [&_ul]:mb-0 [&_ol]:pl-10 [&_ol]:mt-2 [&_ol]:mb-0">{children}</ol>,
        li: ({ children }) => (
          <li className="flex items-start gap-3 leading-relaxed pres-body">
            <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500" />
            <span className="flex-1">{children}</span>
          </li>
        ),
        table: ({ children }) => (
          <div className="my-4 overflow-hidden rounded-xl pres-table-wrap">
            <table className="w-full text-lg">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="pres-table-head">{children}</thead>,
        th: ({ children }) => <th className="px-5 py-3 text-left text-sm font-bold pres-table-th">{children}</th>,
        td: ({ children }) => <td className="px-5 py-3 text-lg pres-table-td">{children}</td>,
        code: ({ children, className }) => {
          if (className?.includes("language-")) return <code className="block rounded-lg pres-code-block p-4 text-sm">{children}</code>;
          return <code className="rounded px-1.5 py-0.5 text-[0.9em] font-normal pres-code-inline">{children}</code>;
        },
        hr: () => <hr className="my-5 pres-hr" />,
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
