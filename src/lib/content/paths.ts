import path from "path";

const CONTENT_DIR = "content";
const COURSES_DIR = "courses";

/** Project root (where package.json lives). */
function getProjectRoot(): string {
  return process.cwd();
}

/** Absolute path to content/<locale>/courses. */
export function getCoursesContentDir(locale: string): string {
  return path.join(getProjectRoot(), CONTENT_DIR, locale, COURSES_DIR);
}

/** Absolute path to one course folder: content/<locale>/courses/<courseSlug>. */
export function getCourseDir(locale: string, courseSlug: string): string {
  return path.join(getCoursesContentDir(locale), courseSlug);
}

