"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  Clock,
  Target,
  Pencil,
  Presentation,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Eye,
  EyeOff,
} from "lucide-react";
import type { ParsedModule, Variant } from "@/types/course";

interface Props {
  modules: ParsedModule[];
  locale: string;
  courseSlug: string;
  variants: Variant[];
}

export function FullMaterialView({ modules, locale, courseSlug, variants }: Props) {
  const [showNotes, setShowNotes] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(modules.filter((m) => m.frontmatter.type === "core").map((m) => m.frontmatter.id))
  );
  const [filter, setFilter] = useState<"all" | "core" | "plugin">("all");

  const coreModules = modules.filter((m) => m.frontmatter.type === "core");
  const pluginModules = modules.filter((m) => m.frontmatter.type === "plugin");
  const filtered =
    filter === "core"
      ? coreModules
      : filter === "plugin"
      ? pluginModules
      : modules;

  function toggleModule(id: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-zinc-800 bg-zinc-900/60 p-0.5">
          {(["all", "core", "plugin"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {f === "all" ? "All Modules" : f === "core" ? "Core" : "Plug-ins"}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {showNotes ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showNotes ? "Hide Notes" : "Show Notes"}
        </button>
      </div>

      {/* Table of Contents */}
      <div className="mb-8 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
        <h3 className="text-sm font-semibold text-zinc-300 mb-3">Contents</h3>
        <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <a
              key={m.frontmatter.id}
              href={`#module-${m.frontmatter.id}`}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200 transition-colors"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  m.frontmatter.type === "core" ? "bg-teal-400" : "bg-amber-400"
                }`}
              />
              <span className="truncate">{m.frontmatter.title}</span>
              <span className="ml-auto shrink-0 text-zinc-600">{m.frontmatter.duration}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {filtered.map((mod) => {
          const isExpanded = expandedModules.has(mod.frontmatter.id);
          return (
            <div
              key={mod.frontmatter.id}
              id={`module-${mod.frontmatter.id}`}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(mod.frontmatter.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-zinc-800/30 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-zinc-500 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-100 truncate">
                      {mod.frontmatter.title}
                    </h3>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        mod.frontmatter.type === "core"
                          ? "bg-teal-500/10 text-teal-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {mod.frontmatter.type}
                    </span>
                  </div>
                  {mod.frontmatter.subtitle && (
                    <p className="text-xs text-zinc-500 mt-0.5">{mod.frontmatter.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Clock className="h-3 w-3" /> {mod.frontmatter.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-600">
                    <Presentation className="h-3 w-3" /> {mod.slides.length} slides
                  </span>
                </div>
              </button>

              {/* Module Content */}
              {isExpanded && (
                <div className="border-t border-zinc-800/60 px-5 py-5">
                  {/* Learning Objectives */}
                  {mod.frontmatter.learningObjectives && (
                    <div className="mb-5 rounded-lg bg-teal-500/5 border border-teal-500/10 px-4 py-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Target className="h-3.5 w-3.5 text-teal-400" />
                        <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                          Learning Objectives
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {mod.frontmatter.learningObjectives.map((obj, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                            <span className="text-teal-500 mt-0.5">•</span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Slide content */}
                  <div className="space-y-6">
                    {mod.slides.map((slide, i) => (
                      <div key={i} className="relative">
                        <div className="prose prose-invert prose-sm max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-strong:text-zinc-200 prose-blockquote:border-teal-500/50 prose-blockquote:text-teal-300/80 prose-li:text-zinc-400 prose-td:text-zinc-400 prose-th:text-zinc-300">
                          <ReactMarkdown>{slide.content}</ReactMarkdown>
                        </div>
                        {showNotes && slide.notes && (
                          <div className="mt-2 rounded-md bg-amber-500/5 border border-amber-500/10 px-3 py-2">
                            <div className="flex items-center gap-1.5 mb-1">
                              <MessageSquare className="h-3 w-3 text-amber-400" />
                              <span className="text-[10px] font-medium text-amber-400 uppercase tracking-wider">
                                Speaker Notes
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 italic">{slide.notes}</p>
                          </div>
                        )}
                        {i < mod.slides.length - 1 && (
                          <div className="mt-6 border-b border-zinc-800/40" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2 border-t border-zinc-800/60 pt-4">
                    <Link
                      href={`/${locale}/admin/courses/${courseSlug}/edit/${mod.frontmatter.id}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
