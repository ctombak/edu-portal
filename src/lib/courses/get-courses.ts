import fs from "fs/promises";
import path from "path";
import type { Dirent } from "node:fs";
import type { Course } from "@/types/course";
import { getCoursesContentDir } from "@/lib/content/paths";
import { readCourseMeta } from "@/lib/content/read-meta";

export async function getCourses(locale: string): Promise<Course[]> {
  const dir = getCoursesContentDir(locale);
  const entries = (await fs.readdir(dir, {
    withFileTypes: true,
  })) as Dirent[];
  const courseDirs = entries.filter((e) => e.isDirectory() && !e.name.startsWith("."));

  const courses: Course[] = await Promise.all(
    courseDirs.map(async (d) => {
      const courseDir = path.join(dir, d.name);
      const meta = await readCourseMeta(courseDir);
      return { slug: d.name, ...meta };
    })
  );

  return courses.sort((a, b) => a.order - b.order);
}

export async function getCourse(locale: string, slug: string): Promise<Course | null> {
  const dir = getCoursesContentDir(locale);
  const courseDir = path.join(dir, slug);
  try {
    const stat = await fs.stat(courseDir);
    if (!stat.isDirectory()) return null;
  } catch {
    return null;
  }
  const meta = await readCourseMeta(courseDir);
  return { slug, ...meta };
}
