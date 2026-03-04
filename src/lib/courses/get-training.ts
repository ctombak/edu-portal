import type { TrainingDetail } from "@/types/course";
import { getCourseDir } from "@/lib/content/paths";
import { readTrainingDetail } from "@/lib/content/read-meta";

export async function getTrainingDetail(
  locale: string,
  courseSlug: string
): Promise<TrainingDetail | null> {
  const courseDir = getCourseDir(locale, courseSlug);
  return readTrainingDetail(courseDir);
}
