import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { getCourse, getCourses, getTrainingDetail } from "@/lib/courses";
import { TrainingPitchPage } from "@/components/TrainingPitchPage";

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

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; courseSlug: string }>;
}) {
  const { locale, courseSlug } = await params;
  const [course, trainingDetail] = await Promise.all([
    getCourse(locale, courseSlug),
    getTrainingDetail(locale, courseSlug),
  ]);
  if (!course || !trainingDetail) notFound();

  return (
    <TrainingPitchPage
      course={course}
      training={trainingDetail}
      locale={locale}
    />
  );
}
