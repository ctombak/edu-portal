import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Users, Clock } from "lucide-react";
import { getCourses } from "@/lib/courses";

const CARD_ACCENTS = [
  { bg: "bg-teal-500/10", text: "text-teal-400", ring: "ring-teal-500/25" },
  { bg: "bg-sky-500/10", text: "text-sky-400", ring: "ring-sky-500/25" },
  { bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/25" },
  { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/25" },
  { bg: "bg-rose-500/10", text: "text-rose-400", ring: "ring-rose-500/25" },
];

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const courses = await getCourses(locale);
  const t = await getTranslations("courses");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[600px] w-[600px] rounded-full bg-teal-600/[0.06] blur-[120px]" />
        <div className="absolute -right-20 top-[40%] h-[350px] w-[350px] rounded-full bg-sky-600/[0.04] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-teal-400">
          {t("tagline")}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {t("title")}
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {t("subtitle")}
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-20">
        {courses.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course, i) => {
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
              return (
                <Link
                  key={course.slug}
                  href={`/${locale}/courses/${course.slug}`}
                  className="group relative flex flex-col rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-black/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accent.bg} ring-1 ${accent.ring}`}
                    >
                      <Users className={`h-5 w-5 ${accent.text}`} aria-hidden />
                    </div>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800/70 text-zinc-300 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-semibold text-zinc-100 group-hover:text-white">
                    {course.title}
                  </h2>
                  <p className="mt-2 flex-1 line-clamp-3 text-sm leading-relaxed text-zinc-500">
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-md bg-teal-500/10 px-2.5 py-1 text-xs font-medium text-teal-400">
                      <Clock className="h-3 w-3" aria-hidden />
                      Full Day Workshop
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-6 py-12 text-center">
            <p className="text-zinc-500">{t("noCourses")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
