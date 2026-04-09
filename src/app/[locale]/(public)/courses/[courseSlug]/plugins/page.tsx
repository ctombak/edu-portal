import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { getCourses, getPluginsData, getSelectionGuide } from "@/lib/courses";
import { PluginsPageClient } from "@/components/PluginsPageClient";

export async function generateStaticParams() {
  const params: { locale: string; courseSlug: string }[] = [];
  for (const locale of locales) {
    const courses = await getCourses(locale);
    for (const c of courses) {
      params.push({ locale, courseSlug: c.slug });
    }
  }
  return params;
}

export default async function PluginsPage({
  params,
}: {
  params: Promise<{ locale: string; courseSlug: string }>;
}) {
  const { locale, courseSlug } = await params;
  const [pluginsData, selectionGuide] = await Promise.all([
    getPluginsData(locale, courseSlug),
    getSelectionGuide(locale, courseSlug),
  ]);
  if (!pluginsData) notFound();

  const teamGuides = selectionGuide?.teams ?? [];

  return (
    <PluginsPageClient
      categories={pluginsData.categories}
      locale={locale}
      courseSlug={courseSlug}
      teamGuides={teamGuides}
    />
  );
}
