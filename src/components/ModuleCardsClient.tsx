"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { X, Clock, CheckCircle2, BookOpen, Quote } from "lucide-react";
import type { TrainingModule, ModuleTopic } from "@/types/course";

interface ModuleColor {
  bg: string;
  text: string;
  ring: string;
  border: string;
}

export function ModuleCardsClient({
  modules,
  moduleIcons,
  moduleColors,
}: {
  modules: TrainingModule[];
  moduleIcons: Record<string, string>;
  moduleColors: Record<string, ModuleColor>;
}) {
  const [selected, setSelected] = useState<TrainingModule | null>(null);
  const t = useTranslations("training");

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selected, closeModal]);

  return (
    <>
      <div className="space-y-4">
        {modules.map((mod) => {
          const color = moduleColors[mod.id] ?? moduleColors.adaptive;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => setSelected(mod)}
              className={`w-full rounded-xl border ${color.border} bg-zinc-900/40 p-6 text-left transition-all hover:-translate-y-0.5 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-black/20 sm:p-8`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color.bg} ring-1 ${color.ring}`}
                >
                  <BookOpen className={`h-5 w-5 ${color.text}`} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${color.text}`}>
                    {mod.subtitle}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-zinc-100">
                    {mod.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-zinc-400">
                    {mod.description}
                  </p>
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-zinc-800/40 px-4 py-3">
                    <Quote className={`mt-0.5 h-4 w-4 shrink-0 ${color.text} opacity-60`} aria-hidden />
                    <p className="text-sm italic leading-relaxed text-zinc-300">
                      &ldquo;{mod.keyInsight}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <ModuleDetailModal
          module={selected}
          color={moduleColors[selected.id] ?? moduleColors.adaptive}
          onClose={closeModal}
          t={t}
        />
      )}
    </>
  );
}

function ModuleDetailModal({
  module: mod,
  color,
  onClose,
  t,
}: {
  module: TrainingModule;
  color: ModuleColor;
  onClose: () => void;
  t: (key: string) => string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 pt-[10vh]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-700/80 bg-zinc-900 p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          <X className="h-4 w-4" />
        </button>

        <p className={`text-xs font-semibold uppercase tracking-wider ${color.text}`}>
          {mod.subtitle}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-zinc-50">{mod.title}</h2>

        {mod.duration && (
          <div className="mt-3 flex items-center gap-1.5 text-sm text-zinc-500">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {mod.duration}
          </div>
        )}

        <p className="mt-4 leading-relaxed text-zinc-400">{mod.description}</p>

        {mod.learningObjectives && mod.learningObjectives.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              {t("whatYouLearn")}
            </h3>
            <ul className="space-y-2">
              {mod.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${color.text}`} aria-hidden />
                  <span className="text-sm text-zinc-300">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {mod.topics && mod.topics.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Key Topics
            </h3>
            <div className="space-y-3">
              {mod.topics.map((topic: ModuleTopic, i: number) => (
                <div key={i} className="rounded-lg bg-zinc-800/40 px-4 py-3">
                  <h4 className="text-sm font-semibold text-zinc-200">{topic.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-start gap-2 rounded-lg bg-zinc-800/30 px-4 py-3">
          <Quote className={`mt-0.5 h-4 w-4 shrink-0 ${color.text} opacity-60`} aria-hidden />
          <p className="text-sm italic leading-relaxed text-zinc-300">
            &ldquo;{mod.keyInsight}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
