import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Clock, CheckCircle2, Quote, BookOpen } from "lucide-react";
import { locales } from "@/i18n/config";
import { getCourses, getCurriculum } from "@/lib/courses";

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

const SECTION_COLORS: Record<string, { accent: string; bg: string; ring: string }> = {
  opening: { accent: "text-zinc-400", bg: "bg-zinc-500/10", ring: "ring-zinc-500/20" },
  module1: { accent: "text-violet-400", bg: "bg-violet-500/10", ring: "ring-violet-500/20" },
  module2: { accent: "text-sky-400", bg: "bg-sky-500/10", ring: "ring-sky-500/20" },
  module3: { accent: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" },
  module4: { accent: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/20" },
  module5: { accent: "text-rose-400", bg: "bg-rose-500/10", ring: "ring-rose-500/20" },
  closing: { accent: "text-zinc-400", bg: "bg-zinc-500/10", ring: "ring-zinc-500/20" },
};

export default async function CurriculumPage({
  params,
}: {
  params: Promise<{ locale: string; courseSlug: string }>;
}) {
  const { locale, courseSlug } = await params;
  const curriculum = await getCurriculum(locale, courseSlug);
  if (!curriculum) notFound();

  const t = await getTranslations("curriculum");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 h-[800px] w-[800px] rounded-full bg-violet-600/[0.04] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-8 pb-20">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}/courses/${courseSlug}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            {t("backToTraining")}
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          {curriculum.title}
        </h1>
        <p className="mt-3 text-zinc-400 leading-relaxed">{curriculum.subtitle}</p>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-zinc-500">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {curriculum.totalDuration}
        </div>

        {/* Table of Contents */}
        <nav className="mt-8 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Program Outline
          </h2>
          <div className="space-y-1.5">
            {curriculum.sections.map((section) => {
              const color = SECTION_COLORS[section.id] ?? SECTION_COLORS.opening;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${color.bg} ring-1 ${color.ring}`} />
                    <span className="text-zinc-300">{section.title}</span>
                  </div>
                  <span className="text-xs text-zinc-600">{section.duration}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* Sections */}
        {curriculum.sections.map((section) => {
          const color = SECTION_COLORS[section.id] ?? SECTION_COLORS.opening;
          return (
            <section key={section.id} id={section.id} className="mt-14 scroll-mt-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-3 w-3 rounded-full ${color.bg} ring-1 ${color.ring}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wider ${color.accent}`}>
                    {section.duration}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">{section.title}</h2>
                {section.subtitle && (
                  <p className="mt-1 text-lg text-zinc-400">{section.subtitle}</p>
                )}
              </div>

              {section.overview && (
                <p className="mb-6 leading-relaxed text-zinc-400">{section.overview}</p>
              )}

              {section.learningObjectives && section.learningObjectives.length > 0 && (
                <div className="mb-8 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    {t("learningObjectives")}
                  </h3>
                  <ul className="space-y-2">
                    {section.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${color.accent}`} aria-hidden />
                        <span className="text-sm text-zinc-300">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-6">
                {section.topics.map((topic, ti) => (
                  <div key={ti} className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className={`h-4 w-4 ${color.accent}`} aria-hidden />
                      <h3 className="text-base font-semibold text-zinc-200">{topic.title}</h3>
                    </div>
                    <p className="leading-relaxed text-zinc-400 text-sm">{topic.content}</p>

                    {topic.frameworks && topic.frameworks.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {topic.frameworks.map((fw, fi) => (
                          <div key={fi} className={`rounded-lg ${color.bg} px-4 py-3 ring-1 ${color.ring}`}>
                            <h4 className={`text-sm font-semibold ${color.accent}`}>{fw.name}</h4>
                            <p className="mt-1 text-sm text-zinc-400">{fw.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {topic.keyQuote && (
                      <div className="mt-4 flex items-start gap-2 rounded-lg bg-zinc-800/40 px-4 py-3">
                        <Quote className={`mt-0.5 h-4 w-4 shrink-0 ${color.accent} opacity-60`} aria-hidden />
                        <p className="text-sm italic leading-relaxed text-zinc-300">
                          &ldquo;{topic.keyQuote}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom CTA */}
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
