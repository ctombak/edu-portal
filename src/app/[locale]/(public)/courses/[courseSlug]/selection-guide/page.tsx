import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { locales } from "@/i18n/config";
import { getCourses, getSelectionGuide } from "@/lib/courses";

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

export default async function SelectionGuidePage({
  params,
}: {
  params: Promise<{ locale: string; courseSlug: string }>;
}) {
  const { locale, courseSlug } = await params;
  const guide = await getSelectionGuide(locale, courseSlug);
  if (!guide) notFound();

  const t = await getTranslations("selectionGuide");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-0 -translate-y-1/3 h-[500px] w-[500px] rounded-full bg-sky-600/[0.04] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-8 pb-20">
        {/* Navigation */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/${locale}/courses/${courseSlug}/plugins`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            {t("backToPlugins")}
          </Link>
          <span className="text-zinc-800">|</span>
          <Link
            href={`/${locale}/courses/${courseSlug}`}
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
          >
            Training Overview
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400 leading-relaxed">
          {guide.intro}
        </p>

        {/* General Audience Selection */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-zinc-100">{guide.generalTitle}</h2>
          <div className="overflow-x-auto">
            <div className="overflow-hidden rounded-xl border border-zinc-800/70 min-w-[600px]">
              <div className="grid grid-cols-[2fr_2fr_1.5fr] bg-zinc-800/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <span>{t("audienceProfile")}</span>
                <span>{t("recommended")}</span>
                <span>{t("considerSwapping")}</span>
              </div>
              {guide.generalRows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[2fr_2fr_1.5fr] px-5 py-3.5 text-sm ${
                    i % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/20"
                  } ${i < guide.generalRows.length - 1 ? "border-b border-zinc-800/40" : ""}`}
                >
                  <span className="pr-3 font-medium text-zinc-300">{row.profile}</span>
                  <span className="pr-3 text-zinc-400">{row.recommended}</span>
                  <span className="text-zinc-500">{row.swapOut}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team-specific sections */}
        {guide.teams.map((team) => (
          <section key={team.id} className="mt-14">
            <h2 className="mb-2 text-xl font-bold text-zinc-100">{team.title}</h2>
            <p className="mb-6 text-sm text-zinc-500">{team.description}</p>

            {/* Priority table */}
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Module Priority
            </h3>
            <div className="overflow-x-auto">
              <div className="mb-8 overflow-hidden rounded-xl border border-zinc-800/70 min-w-[600px]">
                <div className="grid grid-cols-[auto_1.5fr_2fr] bg-zinc-800/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <span className="min-w-[100px]">{t("priorityLevel")}</span>
                  <span className="px-3">{t("module")}</span>
                  <span>{t("why")}</span>
                </div>
                {team.priorities.map((row, i) => {
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
                      className={`grid grid-cols-[auto_1.5fr_2fr] px-5 py-3 text-sm ${
                        i % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/20"
                      } ${i < team.priorities.length - 1 ? "border-b border-zinc-800/40" : ""}`}
                    >
                      <span className={`min-w-[100px] text-xs font-semibold ${priorityColor}`}>
                        {row.priority}
                      </span>
                      <span className="px-3 font-medium text-zinc-300">{row.module}</span>
                      <span className="text-zinc-400">{row.why}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Suggested schedule */}
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Suggested 8-Hour Configuration
            </h3>
            <ScheduleTable rows={team.schedule} t={t} />
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-zinc-800/30 px-4 py-3 text-xs text-zinc-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" aria-hidden />
              <span>{team.scheduleNote}</span>
            </div>

            {/* Alternative schedule */}
            {team.altSchedule && team.altTitle && (
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  {team.altTitle}
                </h3>
                <ScheduleTable rows={team.altSchedule} t={t} />
                {team.altNote && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-zinc-800/30 px-4 py-3 text-xs text-zinc-500">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" aria-hidden />
                    <span>{team.altNote}</span>
                  </div>
                )}
              </div>
            )}
          </section>
        ))}

        {/* Discussion Guide */}
        <section className="mt-14">
          <h2 className="mb-2 text-xl font-bold text-zinc-100">{guide.discussionTitle}</h2>
          <p className="mb-6 text-sm text-zinc-500">{guide.discussionIntro}</p>
          <div className="space-y-3">
            {guide.questions.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/40 px-5 py-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-400 ring-1 ring-teal-500/20">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-zinc-300">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Decision Matrix */}
        <section className="mt-10">
          <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6">
            <h3 className="font-semibold text-zinc-200">{guide.decisionMatrixTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{guide.decisionMatrixDesc}</p>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/5 transition-all hover:shadow-white/10 hover:bg-zinc-100"
          >
            Request Customized Training
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ScheduleTable({
  rows,
  t,
}: {
  rows: { session: string; content: string; duration: string }[];
  t: (key: string) => string;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="overflow-hidden rounded-xl border border-zinc-800/70 min-w-[500px]">
        <div className="grid grid-cols-[auto_1fr_auto] bg-zinc-800/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          <span className="min-w-[80px]">{t("session")}</span>
          <span className="px-3">{t("content")}</span>
          <span className="text-right">{t("duration")}</span>
        </div>
        {rows.map((row, i) => {
          const isBreak = ["Break", "Lunch", "Mola", "Öğle Yemeği"].includes(row.session);
          return (
            <div
              key={i}
              className={`grid grid-cols-[auto_1fr_auto] items-center px-5 py-3 text-sm ${
                isBreak
                  ? "bg-zinc-800/20"
                  : i % 2 === 0
                    ? "bg-zinc-900/40"
                    : "bg-zinc-900/20"
              } ${i < rows.length - 1 ? "border-b border-zinc-800/40" : ""}`}
            >
              <span className={`min-w-[80px] font-medium ${isBreak ? "text-zinc-500 italic" : "text-zinc-300"}`}>
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
  );
}

