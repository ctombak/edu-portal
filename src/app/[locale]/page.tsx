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
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 h-[700px] w-[700px] rounded-full bg-teal-700/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-600/[0.04] blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-10 pb-24 sm:pt-14 sm:pb-32 lg:pt-16 lg:pb-36">
        <div className="flex flex-col items-center text-center">
          {/* Branded hero box */}
          <div className="relative mb-10 w-full max-w-sm overflow-hidden rounded-xl bg-gradient-to-br from-[#0c2a3a] via-[#102f42] to-[#143848] shadow-2xl shadow-teal-950/40 ring-1 ring-white/[0.06] sm:max-w-3xl sm:rounded-2xl md:max-w-4xl lg:max-w-5xl">
            <div className="relative z-10 flex flex-col items-center px-6 py-8 text-center sm:flex-row sm:justify-center sm:gap-6 sm:px-10 sm:py-10 lg:gap-8 lg:px-16 lg:py-12">
              <div className="flex flex-col items-center sm:flex-row sm:items-baseline sm:gap-3 lg:gap-4">
                <h2 className="text-2xl font-light tracking-wide text-[#c8dce6] sm:text-3xl lg:text-5xl">
                  Atlantic
                </h2>
                <p className="mt-0.5 text-3xl font-bold tracking-tight text-white sm:mt-0 sm:text-4xl lg:text-[3.5rem]">
                  Learning
                </p>
              </div>
              <div className="mt-3 h-px w-12 bg-[#4db8a8]/70 sm:mt-0 sm:h-8 sm:w-px" aria-hidden />
              <span className="mt-3 flex flex-col items-center text-[10px] font-medium tracking-[0.2em] uppercase text-[#b8d8e8] sm:mt-0 sm:flex-row sm:gap-1.5 sm:text-xs sm:tracking-[0.25em] lg:text-sm lg:tracking-[0.3em]">
                <span>Better Managers.</span>
                <span>Better Business.</span>
              </span>
            </div>

            {/* Decorative wave layers */}
            <svg
              className="absolute right-0 bottom-0 h-[55%] w-[40%] sm:h-[70%] sm:w-[30%]"
              viewBox="0 0 400 200"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M400 200H0c0 0 40-30 100-50s80-55 140-50 70 30 160 10V200Z"
                fill="#1a4a50"
                opacity="0.5"
              />
              <path
                d="M400 200H80c0 0 30-25 80-35s70-40 120-30 60 20 120 5V200Z"
                fill="#2a7a78"
                opacity="0.4"
              />
              <path
                d="M400 200H160c0 0 20-20 70-28s60-30 100-20 40 15 70 8V200Z"
                fill="#4db8a8"
                opacity="0.35"
              />
            </svg>
          </div>

          <h1 className="mt-0 text-4xl font-bold tracking-tight leading-[1.15] sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              {t("heroLine1")}
            </span>
            <br />
            <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              {t("heroLine2")}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl sm:leading-relaxed">
            {t("heroDesc")}
          </p>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl sm:leading-relaxed">
            {t("heroDesc2")}
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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
        <div className="mx-auto max-w-5xl px-6 pt-8 pb-16 sm:pt-10 sm:pb-20">
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
