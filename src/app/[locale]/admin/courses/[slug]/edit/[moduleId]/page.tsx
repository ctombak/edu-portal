import { notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";
import { getModuleRaw } from "@/lib/content/read-modules";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";

export default async function EditModulePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; moduleId: string }>;
}) {
  const { locale, slug, moduleId } = await params;
  const course = await getCourse(locale, slug);
  if (!course) notFound();

  const raw = await getModuleRaw(locale, slug, moduleId);
  if (raw === null) notFound();

  return (
    <MarkdownEditor
      initialContent={raw}
      locale={locale}
      courseSlug={slug}
      moduleId={moduleId}
      courseTitle={course.title}
    />
  );
}
