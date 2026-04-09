import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/courses";
import {
  getModuleMeta,
  getModules,
  getVariants,
} from "@/lib/content/read-modules";
import {
  ArrowLeft,
  Presentation,
  Pencil,
  Clock,
  Target,
  ChevronDown,
} from "lucide-react";
import { FullMaterialView } from "@/components/admin/FullMaterialView";

export default async function AdminCoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const course = await getCourse(locale, slug);
  if (!course) notFound();

  const meta = await getModuleMeta(locale, slug);
  const variants = await getVariants(locale, slug);

  // Load all core modules for the default view
  const allModuleIds = meta
    ? [...meta.coreModules, ...meta.pluginModules]
    : [];
  const modules = await getModules(locale, slug, allModuleIds);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href={`/${locale}/admin`}
          className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">{course.title}</h1>
          <p className="mt-1 text-sm text-zinc-500">{course.description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href={`/${locale}/admin/courses/${slug}/present`}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-500 transition-colors"
          >
            <Presentation className="h-4 w-4" />
            Present
          </Link>
        </div>
      </div>

      <FullMaterialView
        modules={modules}
        locale={locale}
        courseSlug={slug}
        variants={variants}
      />
    </div>
  );
}
