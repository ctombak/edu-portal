import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Briefcase, Lightbulb } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 -translate-y-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/[0.05] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Header */}
        <header className="mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-violet-400">
            {t("title")}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            {t("headline")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            {t("bio")}
          </p>
        </header>

        {/* Philosophy */}
        <section className="mb-14">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/25">
              <Lightbulb className="h-5 w-5 text-violet-400" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">
                {t("philosophy")}
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-400">
                {t("philosophyText")}
              </p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/25">
              <Briefcase className="h-5 w-5 text-sky-400" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">
                {t("experience")}
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-400">
                {t("experienceText")}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-8 text-center">
          <p className="text-lg font-semibold text-zinc-100">{t("cta")}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/courses`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
            >
              {tNav("courses")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100"
            >
              {tNav("contact")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
