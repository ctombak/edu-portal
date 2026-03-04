import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { Lesson, LessonMeta } from "@/types/course";
import { getModuleDir } from "@/lib/content/paths";

const LESSON_EXTENSIONS = [".mdx", ".md"];

function isLessonFile(name: string): boolean {
  const ext = path.extname(name);
  return LESSON_EXTENSIONS.includes(ext.toLowerCase());
}

function slugFromFilename(name: string): string {
  return path.basename(name, path.extname(name));
}

export async function getLessons(
  locale: string,
  courseSlug: string,
  moduleSlug: string
): Promise<Lesson[]> {
  const moduleDir = getModuleDir(locale, courseSlug, moduleSlug);
  let entries: string[];
  try {
    entries = await fs.readdir(moduleDir);
  } catch {
    return [];
  }

  const lessonFiles = entries.filter(
    (name) => isLessonFile(name) && !name.startsWith(".")
  );

  const lessons: Lesson[] = await Promise.all(
    lessonFiles.map(async (name) => {
      const slug = slugFromFilename(name);
      const filePath = path.join(moduleDir, name);
      const raw = await fs.readFile(filePath, "utf-8");
      const { data } = matter(raw);
      const meta = (data || {}) as Partial<LessonMeta>;
      return {
        slug,
        title: meta.title ?? slug,
        order: typeof meta.order === "number" ? meta.order : 0,
      };
    })
  );

  return lessons.sort((a, b) => a.order - b.order);
}

export async function getLesson(
  locale: string,
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): Promise<{ meta: Lesson; content: string } | null> {
  const moduleDir = getModuleDir(locale, courseSlug, moduleSlug);
  let filename: string | null = null;
  for (const ext of LESSON_EXTENSIONS) {
    const candidate = `${lessonSlug}${ext}`;
    try {
      await fs.access(path.join(moduleDir, candidate));
      filename = candidate;
      break;
    } catch {
      // try next extension
    }
  }
  if (!filename) return null;

  const filePath = path.join(moduleDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = (data || {}) as Partial<LessonMeta>;
  const lesson: Lesson = {
    slug: lessonSlug,
    title: meta.title ?? lessonSlug,
    order: typeof meta.order === "number" ? meta.order : 0,
  };
  return { meta: lesson, content };
}
