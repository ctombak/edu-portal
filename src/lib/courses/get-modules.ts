import fs from "fs/promises";
import path from "path";
import type { Dirent } from "node:fs";
import type { Module } from "@/types/course";
import { getCourseDir } from "@/lib/content/paths";
import { readModuleMeta } from "@/lib/content/read-meta";

export async function getModules(locale: string, courseSlug: string): Promise<Module[]> {
  const courseDir = getCourseDir(locale, courseSlug);
  let entries: Dirent[];
  try {
    entries = await fs.readdir(courseDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const moduleDirs = entries.filter(
    (e) => e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules"
  );

  const modules: Module[] = await Promise.all(
    moduleDirs.map(async (d) => {
      const moduleDir = path.join(courseDir, d.name);
      const meta = await readModuleMeta(moduleDir);
      return { slug: d.name, ...meta };
    })
  );

  return modules.sort((a, b) => a.order - b.order);
}

export async function getModule(
  locale: string,
  courseSlug: string,
  moduleSlug: string
): Promise<Module | null> {
  const courseDir = getCourseDir(locale, courseSlug);
  const dir = path.join(courseDir, moduleSlug);
  try {
    const stat = await fs.stat(dir);
    if (!stat.isDirectory()) return null;
  } catch {
    return null;
  }
  const meta = await readModuleMeta(dir);
  return { slug: moduleSlug, ...meta };
}
