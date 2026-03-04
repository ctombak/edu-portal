import type { PluginsData, SelectionGuideData, CurriculumData } from "@/types/course";
import { getCourseDir } from "@/lib/content/paths";
import { readPluginsData, readSelectionGuide, readCurriculum } from "@/lib/content/read-meta";

export async function getPluginsData(
  locale: string,
  courseSlug: string
): Promise<PluginsData | null> {
  const courseDir = getCourseDir(locale, courseSlug);
  return readPluginsData(courseDir);
}

export async function getSelectionGuide(
  locale: string,
  courseSlug: string
): Promise<SelectionGuideData | null> {
  const courseDir = getCourseDir(locale, courseSlug);
  return readSelectionGuide(courseDir);
}

export async function getCurriculum(
  locale: string,
  courseSlug: string
): Promise<CurriculumData | null> {
  const courseDir = getCourseDir(locale, courseSlug);
  return readCurriculum(courseDir);
}
