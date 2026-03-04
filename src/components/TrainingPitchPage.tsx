import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Users,
  User,
  TrendingUp,
  AlertTriangle,
  Brain,
  Shield,
  Target,
  Cpu,
  ClipboardList,
  MapPin,
  BookOpen,
  Coffee,
  Package,
  Quote,
  Sparkles,
} from "lucide-react";
import type { Course, TrainingDetail } from "@/types/course";
import { ModuleCardsClient } from "./ModuleCardsClient";
import { FacilitatorLink } from "./FacilitatorLink";

const MODULE_ICONS: Record<string, React.ElementType> = {
  adaptive: Brain,
  relational: Users,
  growth: Sparkles,
  strategic: Target,
  "ai-fluent": Cpu,
};

const MODULE_COLORS: Record<string, { bg: string; text: string; ring: string; border: string }> = {
  adaptive: { bg: "bg-violet-500/10", text: "text-violet-400", ring: "ring-violet-500/20", border: "border-violet-500/20" },
  relational: { bg: "bg-sky-500/10", text: "text-sky-400", ring: "ring-sky-500/20", border: "border-sky-500/20" },
  growth: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20", border: "border-emerald-500/20" },
  strategic: { bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/20", border: "border-amber-500/20" },
  "ai-fluent": { bg: "bg-rose-500/10", text: "text-rose-400", ring: "ring-rose-500/20", border: "border-rose-500/20" },
};

export async function TrainingPitchPage({
  course,
  training,
  locale,
}: {
  course: Course;
  training: TrainingDetail;
  locale: string;
}) {
  const t = await getTranslations("training");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 h-[800px] w-[800px] rounded-full bg-violet-600/[0.06] blur-[140px]" />
        <div className="absolute right-0 top-[40%] h-[400px] w-[400px] rounded-full bg-sky-600/[0.04] blur-[100px]" />
      </div>

      {/* Back link */}
      <div className="mx-auto max-w-4xl px-6 pt-8">
        <Link
          href={`/${locale}/courses`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          {t("backToPrograms")}
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-8 pb-12 sm:pb-16">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-violet-400/60" aria-hidden />
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-violet-400">
            {t("facilitator")} {training.facilitator}
          </p>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
          {course.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-zinc-400 sm:text-2xl">
          {training.tagline}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-zinc-800/50 px-4 py-3 ring-1 ring-zinc-700/40">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <Clock className="h-3 w-3 text-violet-400" aria-hidden />
              {t("duration")}
            </div>
            <p className="text-sm font-medium text-zinc-200">{training.duration}</p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 px-4 py-3 ring-1 ring-zinc-700/40">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <Users className="h-3 w-3 text-sky-400" aria-hidden />
              {t("audience")}
            </div>
            <p className="text-sm font-medium text-zinc-200">{training.audience}</p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 px-4 py-3 ring-1 ring-zinc-700/40">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <User className="h-3 w-3 text-emerald-400" aria-hidden />
              {t("facilitator")}
            </div>
            <p className="text-sm font-medium text-zinc-200">{training.facilitator}</p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("programOverview")}</SectionHeading>
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6 sm:p-8">
          {training.overview.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className={`leading-relaxed text-zinc-400 ${i > 0 ? "mt-4" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 2026 Leadership Reality */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("leadershipReality")}</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          {training.stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5"
            >
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-500/10 ring-1 ring-amber-500/20">
                <TrendingUp className="h-3.5 w-3.5 text-amber-400" aria-hidden />
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">{stat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Program Structure */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("programStructure")}</SectionHeading>
        <div className="overflow-hidden rounded-xl border border-zinc-800/70">
          <div className="grid grid-cols-[auto_auto_1fr_auto] bg-zinc-800/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <span className="min-w-[55px]">{t("startTime")}</span>
            <span className="min-w-[80px] px-3">{t("session")}</span>
            <span className="px-3">{t("focus")}</span>
            <span className="text-right">{t("duration")}</span>
          </div>
          {training.schedule.map((item, i) => {
            const isBreak = item.type === "break";
            return (
              <div
                key={i}
                className={`grid grid-cols-[auto_auto_1fr_auto] items-center px-5 py-3 text-sm ${
                  isBreak
                    ? "bg-zinc-800/20 border-l-2 border-l-zinc-700/50"
                    : i % 2 === 0
                      ? "bg-zinc-900/40"
                      : "bg-zinc-900/20"
                } ${i < training.schedule.length - 1 ? "border-b border-zinc-800/40" : ""}`}
              >
                <span className={`min-w-[55px] font-mono text-xs ${isBreak ? "text-zinc-600" : "text-zinc-400"}`}>
                  {item.startTime}
                </span>
                <span className={`min-w-[80px] px-3 font-medium ${isBreak ? "text-zinc-500 italic" : "text-zinc-300"}`}>
                  {item.session}
                </span>
                <span className={`px-3 ${isBreak ? "text-zinc-600 italic" : "text-zinc-400"}`}>
                  {item.focus}
                </span>
                <span className={`text-right ${isBreak ? "text-zinc-600" : "text-zinc-500"}`}>
                  {item.duration}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-zinc-600">{t("totalTime")}</p>
      </section>

      {/* What Participants Will Learn */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("whatYouLearn")}</SectionHeading>
        <ModuleCardsClient
          modules={training.modules}
          moduleIcons={{}}
          moduleColors={MODULE_COLORS}
        />
      </section>

      {/* Key Frameworks */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("keyFrameworks")}</SectionHeading>
        <div className="overflow-hidden rounded-xl border border-zinc-800/70">
          <div className="grid grid-cols-[1fr_1fr] bg-zinc-800/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <span>{t("framework")}</span>
            <span>{t("application")}</span>
          </div>
          {training.frameworks.map((fw, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_1fr] px-5 py-3 text-sm ${
                i % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/20"
              } ${i < training.frameworks.length - 1 ? "border-b border-zinc-800/40" : ""}`}
            >
              <span className="pr-4 font-medium text-zinc-300">{fw.name}</span>
              <span className="text-zinc-400">{fw.application}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Optional Plug-In Modules */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("optionalModules")}</SectionHeading>
        <p className="mb-6 text-sm text-zinc-500 leading-relaxed">
          {t("optionalModulesDesc")}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {training.pluginModules.map((pm, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5"
            >
              <h4 className="text-sm font-semibold text-zinc-200">{pm.name}</h4>
              <p className="mt-1.5 text-xs text-zinc-500">{pm.bestFor}</p>
            </div>
          ))}
          <Link
            href={`/${locale}/courses/${course.slug}/plugins`}
            className="group flex flex-col items-center justify-center rounded-xl border border-dashed border-violet-500/30 bg-violet-500/[0.04] p-5 text-center transition-all hover:border-violet-500/50 hover:bg-violet-500/[0.08]"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 ring-1 ring-violet-500/20">
              <ArrowRight className="h-4 w-4 text-violet-400 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </div>
            <span className="text-sm font-semibold text-violet-400">{t("seeAll")}</span>
            <span className="mt-1 text-xs text-zinc-500">{t("seeAllDesc")}</span>
          </Link>
        </div>
      </section>

      {/* Program Design */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("programDesign")}</SectionHeading>
        <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/40 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <span className="text-lg font-bold text-emerald-400">
                {training.practicePercentage}%
              </span>
            </div>
            <div>
              <p className="font-semibold text-zinc-100">
                {t("practiceOriented")}
              </p>
              <p className="text-sm text-zinc-500">
                Adult learning principles
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {training.designHighlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-lg bg-zinc-800/40 px-4 py-3"
              >
                <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" aria-hidden />
                <span className="text-sm leading-relaxed text-zinc-300">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilitator */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("facilitator")}</SectionHeading>
        <FacilitatorLink
          name={training.facilitator}
          bio={training.facilitatorBio}
          locale={locale}
          courseSlug={course.slug}
        />
      </section>

      {/* Logistics */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionHeading>{t("logistics")}</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          <LogisticsCard
            icon={Clock}
            label={t("time")}
            value={training.logistics.time}
            color="text-violet-400"
          />
          <LogisticsCard
            icon={Coffee}
            label={t("breaks")}
            value={training.logistics.breaks}
            color="text-sky-400"
          />
          <LogisticsCard
            icon={Users}
            label={t("format")}
            value={training.logistics.format}
            color="text-emerald-400"
          />
          <LogisticsCard
            icon={Package}
            label={t("materials")}
            value={training.logistics.materials}
            color="text-amber-400"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] to-sky-500/[0.04] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-zinc-400 leading-relaxed">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-900 shadow-lg shadow-white/5 transition-all hover:shadow-white/10 hover:bg-zinc-100"
            >
              {t("ctaButton")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-xl font-bold text-zinc-100 sm:text-2xl">
      {children}
    </h2>
  );
}

function LogisticsCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5">
      <div className="mb-2 flex items-center gap-2">
        <Icon className={`h-4 w-4 ${color}`} aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {label}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-300">{value}</p>
    </div>
  );
}
