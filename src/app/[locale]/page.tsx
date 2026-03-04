import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Globe, Wrench, Puzzle, ArrowRight } from "lucide-react";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 h-[700px] w-[700px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-[30%] h-[400px] w-[400px] rounded-full bg-sky-600/[0.04] blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-violet-400">
            {t("tagline")}
          </p>

          <h1 className="mt-8 text-4xl font-bold tracking-tight leading-[1.15] sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              {t("heroLine1")}
            </span>
            <br />
            <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              {t("heroLine2")}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl sm:leading-relaxed">
            {t("heroDesc")}
          </p>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl sm:leading-relaxed">
            {t("heroDesc2")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/courses`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/5 transition-all hover:shadow-white/10 hover:bg-zinc-100"
            >
              {t("viewServices")}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2.5 rounded-full border border-zinc-700 px-7 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="border-t border-zinc-800/40">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <h2 className="mb-10 text-center text-lg font-semibold text-zinc-100">
            {t("whyTitle")}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/25">
                <Globe className="h-5 w-5 text-sky-400" aria-hidden />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">
                {t("whyGlobal")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {t("whyGlobalDesc")}
              </p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/25">
                <Wrench className="h-5 w-5 text-emerald-400" aria-hidden />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">
                {t("whyPractical")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {t("whyPracticalDesc")}
              </p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/25">
                <Puzzle className="h-5 w-5 text-amber-400" aria-hidden />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">
                {t("whyCustom")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {t("whyCustomDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
