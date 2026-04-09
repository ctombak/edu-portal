"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, X, Clock, Users, CheckCircle2, BookOpen, Info } from "lucide-react";
import type { PluginModuleDetail, PluginCategory, TeamGuide } from "@/types/course";

const CATEGORY_COLORS: Record<string, { accent: string; bg: string; ring: string }> = {
  general: { accent: "text-teal-400", bg: "bg-teal-500/10", ring: "ring-teal-500/20" },
  hr: { accent: "text-sky-400", bg: "bg-sky-500/10", ring: "ring-sky-500/20" },
  finance: { accent: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" },
  engineering: { accent: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/20" },
};

const CATEGORY_TO_TEAM: Record<string, string> = {
  hr: "hr",
  finance: "finance",
  engineering: "engineering",
};

export function PluginsPageClient({
  categories,
  locale,
  courseSlug,
  teamGuides = [],
}: {
  categories: PluginCategory[];
  locale: string;
  courseSlug: string;
  teamGuides?: TeamGuide[];
}) {
  const [selected, setSelected] = useState<PluginModuleDetail | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamGuide | null>(null);
  const t = useTranslations("plugins");
  const tSg = useTranslations("selectionGuide");

  const closeModal = useCallback(() => {
    setSelected(null);
    setSelectedTeam(null);
  }, []);

  useEffect(() => {
    if (!selected && !selectedTeam) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selected, selectedTeam, closeModal]);

  const handleCategoryClick = (catId: string) => {
    const teamId = CATEGORY_TO_TEAM[catId];
    if (!teamId) return;
    const guide = teamGuides.find((g) => g.id === teamId);
    if (guide) setSelectedTeam(guide);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[600px] w-[600px] rounded-full bg-teal-600/[0.05] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-8 pb-20">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/${locale}/courses/${courseSlug}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            {t("backToTraining")}
          </Link>
          <span className="text-zinc-800">|</span>
          <Link
            href={`/${locale}/courses/${courseSlug}/selection-guide`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-teal-400 transition-colors hover:text-teal-300"
          >
            {t("selectionGuide")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400 leading-relaxed">
          {t("subtitle")}
        </p>

        {categories.map((cat) => {
          const color = CATEGORY_COLORS[cat.id] ?? CATEGORY_COLORS.general;
          const hasTeamGuide = !!CATEGORY_TO_TEAM[cat.id] && teamGuides.some((g) => g.id === CATEGORY_TO_TEAM[cat.id]);
          return (
            <section key={cat.id} className="mt-12">
              {hasTeamGuide ? (
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`group flex items-center gap-2 text-lg font-bold ${color.accent} transition-colors hover:brightness-125`}
                >
                  {cat.title}
                  <Info className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden />
                </button>
              ) : (
                <h2 className={`text-lg font-bold ${color.accent}`}>{cat.title}</h2>
              )}
              <p className="mt-1 text-sm text-zinc-500">{cat.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.modules.map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setSelected(mod)}
                    className="group flex flex-col rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-black/20"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`rounded-md ${color.bg} px-2 py-0.5 text-[11px] font-bold ${color.accent} ring-1 ${color.ring}`}>
                        {mod.id}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-600">
                        <Clock className="h-3 w-3" aria-hidden />
                        {mod.duration}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                      {mod.title}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-zinc-500">
                      <Users className="h-3 w-3 shrink-0" aria-hidden />
                      {mod.bestFor}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Module Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 pt-[8vh]"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-zinc-700/80 bg-zinc-900 p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
              aria-label={t("close")}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-md bg-teal-500/10 px-2.5 py-1 text-xs font-bold text-teal-400 ring-1 ring-teal-500/20">
                {selected.id}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Clock className="h-3 w-3" />
                {selected.duration}
              </span>
            </div>

            <h2 className="text-xl font-bold text-zinc-50">{selected.title}</h2>
            <p className="mt-4 leading-relaxed text-zinc-400">{selected.purpose}</p>

            {selected.learningObjectives && selected.learningObjectives.length > 0 && (
              <div className="mt-5">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Learning Objectives
                </h3>
                <ul className="space-y-1.5">
                  {selected.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
                      <span className="text-sm text-zinc-300">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selected.keyTopics && selected.keyTopics.length > 0 && (
              <div className="mt-5">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Key Topics
                </h3>
                <div className="space-y-2">
                  {selected.keyTopics.map((topic, i) => (
                    <div key={i} className="rounded-lg bg-zinc-800/40 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-teal-400" aria-hidden />
                        <h4 className="text-sm font-semibold text-zinc-200">{topic.title}</h4>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex items-center gap-2 rounded-lg bg-zinc-800/50 px-4 py-3">
              <Users className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{t("bestFor")}</span>
                <p className="text-sm text-zinc-300">{selected.bestFor}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Selection Guide Modal */}
      {selectedTeam && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 pt-[6vh]"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-zinc-700/80 bg-zinc-900 p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
              aria-label={t("close")}
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-bold text-zinc-50">{selectedTeam.title}</h2>
            <p className="mt-2 text-sm text-zinc-400">{selectedTeam.description}</p>

            {/* Priority table */}
            <div className="mt-6 overflow-x-auto">
              <div className="overflow-hidden rounded-xl border border-zinc-800/70 min-w-[500px]">
                <div className="grid grid-cols-[auto_1.5fr_2fr] bg-zinc-800/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <span className="min-w-[90px]">{tSg("priorityLevel")}</span>
                  <span className="px-3">{tSg("module")}</span>
                  <span>{tSg("why")}</span>
                </div>
                {selectedTeam.priorities.map((row, i) => {
                  const priorityColor =
                    row.priority === "Must-Have" || row.priority === "Olmazsa Olmaz"
                      ? "text-emerald-400"
                      : row.priority === "High Value" || row.priority === "Yüksek Değer"
                        ? "text-sky-400"
                        : row.priority === "Recommended" || row.priority === "Önerilen"
                          ? "text-amber-400"
                          : "text-zinc-500";
                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-[auto_1.5fr_2fr] px-4 py-2.5 text-sm ${
                        i % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/20"
                      } ${i < selectedTeam.priorities.length - 1 ? "border-b border-zinc-800/40" : ""}`}
                    >
                      <span className={`min-w-[90px] text-xs font-semibold ${priorityColor}`}>
                        {row.priority}
                      </span>
                      <span className="px-3 font-medium text-zinc-300 text-sm">{row.module}</span>
                      <span className="text-zinc-400 text-sm">{row.why}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schedule */}
            <div className="mt-6 overflow-x-auto">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Suggested Configuration
              </h3>
              <div className="overflow-hidden rounded-xl border border-zinc-800/70 min-w-[400px]">
                {selectedTeam.schedule.map((row, i) => {
                  const isBreak = ["Break", "Lunch", "Mola", "Öğle Yemeği"].includes(row.session);
                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-[auto_1fr_auto] items-center px-4 py-2.5 text-sm ${
                        isBreak ? "bg-zinc-800/20" : i % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/20"
                      } ${i < selectedTeam.schedule.length - 1 ? "border-b border-zinc-800/40" : ""}`}
                    >
                      <span className={`min-w-[70px] font-medium ${isBreak ? "text-zinc-500 italic" : "text-zinc-300"}`}>
                        {row.session}
                      </span>
                      <span className={`px-3 ${isBreak ? "text-zinc-600 italic" : "text-zinc-400"}`}>
                        {row.content}
                      </span>
                      <span className={`text-right ${isBreak ? "text-zinc-600" : "text-zinc-500"}`}>
                        {row.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-zinc-800/30 px-4 py-3 text-xs text-zinc-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" aria-hidden />
              <span>{selectedTeam.scheduleNote}</span>
            </div>

            <div className="mt-6 text-center">
              <Link
                href={`/${locale}/courses/${courseSlug}/selection-guide`}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-400 transition-colors hover:text-teal-300"
                onClick={closeModal}
              >
                View Full Selection Guide
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
