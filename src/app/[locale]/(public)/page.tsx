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
      {/* ── Hero ── */}
      <section className="landing-hero relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden bg-zinc-950">
        <div className="pointer-events-none absolute inset-0">
          <div className="landing-orb-1 absolute left-1/2 top-[5%] -translate-x-1/2 h-[600px] w-[900px] rounded-full" />
          <div className="landing-orb-2 absolute right-[-5%] top-[25%] h-[400px] w-[400px] rounded-full" />
          <div className="landing-orb-3 absolute left-[5%] bottom-[10%] h-[350px] w-[450px] rounded-full" />
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <div className="landing-badge mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase" style={{ color: '#4db8a8' }}>
                Better Managers. Better Business.
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl lg:text-6xl">
              <span className="text-zinc-100">{t("heroLine1")}</span>
              <br />
              <span className="landing-gradient-text">{t("heroLine2")}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {t("heroDesc")}
            </p>
            <p className="mt-1.5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {t("heroDesc2")}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/courses`}
                className="landing-cta-primary group inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
              >
                {t("viewServices")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="landing-cta-secondary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all"
              >
                {t("contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Partner With Us ── */}
      <section className="landing-section-alt relative">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20">
          <div className="mb-14 text-center">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#4db8a8' }}>
              Our approach
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
              {t("whyTitle")}
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div className="text-center sm:text-left">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                <Globe className="h-5 w-5 text-sky-400" aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">{t("whyGlobal")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{t("whyGlobalDesc")}</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Wrench className="h-5 w-5 text-emerald-400" aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">{t("whyPractical")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{t("whyPracticalDesc")}</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Puzzle className="h-5 w-5 text-amber-400" aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">{t("whyCustom")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{t("whyCustomDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-zinc-800/50 bg-zinc-950">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            Ready to invest in your leaders?
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Let&apos;s design a program tailored to your organization&apos;s challenges.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="landing-cta-primary group inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              Request Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href={`/${locale}/courses`}
              className="landing-cta-secondary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all"
            >
              Browse Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
