import Link from "next/link";
import { getCourses } from "@/lib/courses";
import { getVariants } from "@/lib/content/read-modules";
import { BookOpen, Presentation, Pencil, ArrowRight, Layers } from "lucide-react";

const ACCENTS = [
  { bg: "bg-teal-500/10", ring: "ring-teal-500/25", text: "text-teal-400" },
  { bg: "bg-sky-500/10", ring: "ring-sky-500/25", text: "text-sky-400" },
  { bg: "bg-emerald-500/10", ring: "ring-emerald-500/25", text: "text-emerald-400" },
  { bg: "bg-amber-500/10", ring: "ring-amber-500/25", text: "text-amber-400" },
];

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const courses = await getCourses(locale);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Training Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage your training programs, view full material, and start presentations.
        </p>
      </div>

      <div className="space-y-6">
        {await Promise.all(
          courses.map(async (course, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const variants = await getVariants(locale, course.slug);

            return (
              <div
                key={course.slug}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-100">
                      {course.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accent.bg} ring-1 ${accent.ring}`}
                  >
                    <BookOpen className={`h-5 w-5 ${accent.text}`} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/admin/courses/${course.slug}`}
                    className="group inline-flex items-center gap-2 rounded-lg border border-zinc-700/80 bg-zinc-800/50 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-zinc-600 hover:bg-zinc-800"
                  >
                    <BookOpen className="h-4 w-4 text-zinc-400" />
                    Full Material
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-500 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <Link
                    href={`/${locale}/admin/courses/${course.slug}/present`}
                    className="group inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-500"
                  >
                    <Presentation className="h-4 w-4" />
                    Start Presentation
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {variants.length > 0 && (
                  <div className="mt-4 border-t border-zinc-800/60 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-3.5 w-3.5 text-zinc-500" />
                      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        Variants
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v) => (
                        <Link
                          key={v.id}
                          href={`/${locale}/admin/courses/${course.slug}/present/${v.id}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
                        >
                          <Presentation className="h-3 w-3" />
                          {v.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
