import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/courses";
import { getVariants } from "@/lib/content/read-modules";
import { ArrowLeft, Presentation, Clock, Layers, ArrowRight } from "lucide-react";

export default async function PresentationSelector({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const course = await getCourse(locale, slug);
  if (!course) notFound();

  const variants = await getVariants(locale, slug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href={`/${locale}/admin/courses/${slug}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Material
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Start Presentation</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Select a training variant for <span className="text-zinc-300">{course.title}</span>
        </p>
      </div>

      {variants.length === 0 ? (
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-6 py-12 text-center">
          <p className="text-zinc-500">No variants configured yet. Add variant JSON files to the variants/ directory.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {variants.map((variant) => (
            <Link
              key={variant.id}
              href={`/${locale}/admin/courses/${slug}/present/${variant.id}`}
              className="group block rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-800/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Presentation className="h-4 w-4 text-teal-400" />
                    <h2 className="text-base font-semibold text-zinc-100 group-hover:text-white">
                      {variant.title}
                    </h2>
                    {variant.id === "default" && (
                      <span className="rounded bg-teal-500/10 px-1.5 py-0.5 text-[10px] font-medium text-teal-400">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">{variant.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 rounded-md bg-zinc-800/80 px-2 py-1 text-xs text-zinc-400">
                      <Layers className="h-3 w-3" />
                      {variant.modules.length} modules
                    </span>
                    {variant.schedule && (
                      <span className="flex items-center gap-1 rounded-md bg-zinc-800/80 px-2 py-1 text-xs text-zinc-400">
                        <Clock className="h-3 w-3" />
                        {variant.schedule[0]?.startTime} –{" "}
                        {variant.schedule[variant.schedule.length - 1]?.startTime}
                      </span>
                    )}
                  </div>

                  {variant.note && (
                    <p className="mt-2 text-xs text-zinc-600 italic">{variant.note}</p>
                  )}
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
