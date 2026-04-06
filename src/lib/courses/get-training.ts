import type { TrainingDetail } from "@/types/course";
import { getCourseDir } from "@/lib/content/paths";
import { readTrainingDetail, readOverview } from "@/lib/content/read-meta";

export async function getTrainingDetail(
  locale: string,
  courseSlug: string
): Promise<TrainingDetail | null> {
  const courseDir = getCourseDir(locale, courseSlug);
  const training = await readTrainingDetail(courseDir);
  if (!training) return null;

  // Merge prose from overview.mdx if available
  const overviewData = await readOverview(courseDir);
  if (overviewData) {
    training.overview = overviewData.overview;
    training.facilitatorBio = overviewData.facilitatorBio;
  }

  return training;
}
