import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight, FileText, Layers } from "lucide-react";
import { locales } from "@/i18n/config";
import {
  getCourse,
  getModule,
  getLessons,
  getModules,
  getCourses,
} from "@/lib/courses";

export async function generateStaticParams() {
  const params: {
    locale: string;
    courseSlug: string;
    moduleSlug: string;
  }[] = [];
  for (const locale of locales) {
    const courses = await getCourses(locale);
    for (const course of courses) {
      const modules = await getModules(locale, course.slug);
      for (const mod of modules) {
        params.push({
          locale,
          courseSlug: course.slug,
          moduleSlug: mod.slug,
        });
      }
    }
  }
  return params;
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{
    locale: string;
    courseSlug: string;
    moduleSlug: string;
  }>;
}) {
  const { locale, courseSlug, moduleSlug } = await params;
  const [course, mod, lessons] = await Promise.all([
    getCourse(locale, courseSlug),
    getModule(locale, courseSlug, moduleSlug),
    getLessons(locale, courseSlug, moduleSlug),
  ]);
  if (!course || !mod) notFound();
  const t = await getTranslations("courses");

  return (
    <div className="w-full max-w-3xl px-6 py-10 sm:py-12 lg:px-10">
      {/* Back link */}
      <Link
        href={`/${locale}/courses/${courseSlug}`}
        className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        {course.title}
      </Link>

      {/* Module header */}
      <header className="mb-10">
        <div className="flex items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/25">
            <FileText className="h-6 w-6" aria-hidden />
          </div>
          <div className="min-w-0 pt-0.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
              {mod.title}
            </h1>
            {mod.description && (
              <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
                {mod.description}
              </p>
            )}
            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
              <Layers className="h-3 w-3" aria-hidden />
              <span>
                {lessons.length}{" "}
                {lessons.length === 1 ? "lesson" : "lessons"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Lessons */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600">
          {t("lessons")}
        </h2>

        {lessons.length > 0 ? (
          <div className="divide-y divide-zinc-800/60 overflow-hidden rounded-xl border border-zinc-800/70">
            {lessons.map((lesson, i) => (
              <Link
                key={lesson.slug}
                href={`/${locale}/courses/${courseSlug}/${moduleSlug}/${lesson.slug}`}
                className="group flex items-center gap-4 bg-zinc-900/40 px-5 py-4 transition-colors hover:bg-zinc-800/50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-xs font-semibold text-zinc-500 transition-colors group-hover:bg-zinc-700 group-hover:text-zinc-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                    {lesson.title}
                  </h3>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-700 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-400" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-6 py-10 text-center">
            <p className="text-zinc-500">{t("noLessons")}</p>
          </div>
        )}
      </section>
    </div>
  );
}
