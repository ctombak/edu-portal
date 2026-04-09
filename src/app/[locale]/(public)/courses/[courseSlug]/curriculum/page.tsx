import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Clock, CheckCircle2, Lightbulb, BookOpen } from "lucide-react";
import { locales } from "@/i18n/config";
import { getCourses, getTrainingDetail } from "@/lib/courses";

export async function generateStaticParams() {
  const params: { locale: string; courseSlug: string }[] = [];
  for (const locale of locales) {
    const courses = await getCourses(locale);
    for (const c of courses) {
      params.push({ locale, courseSlug: c.slug });
    }
  }
  return params;
}

const MODULE_COLORS = [
  { accent: "text-zinc-400", bg: "bg-zinc-500/10", ring: "ring-zinc-500/20" },
  { accent: "text-teal-400", bg: "bg-teal-500/10", ring: "ring-teal-500/20" },
  { accent: "text-sky-400", bg: "bg-sky-500/10", ring: "ring-sky-500/20" },
  { accent: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" },
  { accent: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/20" },
  { accent: "text-rose-400", bg: "bg-rose-500/10", ring: "ring-rose-500/20" },
  { accent: "text-zinc-400", bg: "bg-zinc-500/10", ring: "ring-zinc-500/20" },
];

export default async function CurriculumPage({
  params,
}: {
  params: Promise<{ locale: string; courseSlug: string }>;
}) {
  const { locale, courseSlug } = await params;
  const training = await getTrainingDetail(locale, courseSlug);
  if (!training) notFound();

  const t = await getTranslations("curriculum");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 h-[800px] w-[800px] rounded-full bg-teal-600/[0.04] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-8 pb-20">
        <div className="mb-8">
          <Link
            href={`/${locale}/courses/${courseSlug}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            {t("backToTraining")}
          </Link>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Program Curriculum
        </h1>
        <p className="mt-3 text-zinc-400 leading-relaxed">
          {training.tagline}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-zinc-500">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {training.duration}
        </div>

        {/* Module Overview Cards */}
        <div className="mt-10 space-y-6">
          {training.modules.map((mod, i) => {
            const color = MODULE_COLORS[i % MODULE_COLORS.length];
            return (
              <div
                key={mod.id}
                className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color.bg} ring-1 ${color.ring}`}
                  >
                    <BookOpen className={`h-4 w-4 ${color.accent}`} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-zinc-100">
                        {mod.title}
                      </h2>
                      {mod.duration && (
                        <span className="text-xs text-zinc-600">{mod.duration}</span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500">{mod.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-zinc-400 mb-4">
                  {mod.description}
                </p>

                {/* Key Insight */}
                <div className="mb-4 flex items-start gap-2 rounded-lg bg-zinc-800/40 px-4 py-3">
                  <Lightbulb className={`mt-0.5 h-4 w-4 shrink-0 ${color.accent} opacity-70`} />
                  <p className="text-sm italic text-zinc-300">
                    {mod.keyInsight}
                  </p>
                </div>

                {/* Learning Objectives */}
                {mod.learningObjectives && mod.learningObjectives.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {t("learningObjectives")}
                    </h3>
                    <ul className="space-y-1.5">
                      {mod.learningObjectives.map((obj, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${color.accent}`}
                          />
                          <span className="text-sm text-zinc-400">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Topic titles only (no full content) */}
                {mod.topics && mod.topics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mod.topics.map((topic, ti) => (
                      <span
                        key={ti}
                        className={`rounded-md ${color.bg} px-2.5 py-1 text-xs font-medium ${color.accent} ring-1 ${color.ring}`}
                      >
                        {topic.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/5 transition-all hover:shadow-white/10 hover:bg-zinc-100"
          >
            Request Information
          </Link>
        </div>
      </div>
    </div>
  );
}
