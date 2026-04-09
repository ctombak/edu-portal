import fs from "fs/promises";
import path from "path";
import { getCourseDir } from "./paths";
import { parseModuleFile } from "@/lib/slides/parse-slides";
import type { ParsedModule, ModuleMeta, Variant } from "@/types/course";

/**
 * Read _meta.json for a course's modules directory.
 */
export async function getModuleMeta(
  locale: string,
  courseSlug: string
): Promise<ModuleMeta | null> {
  const dir = path.join(getCourseDir(locale, courseSlug), "modules");
  try {
    const raw = await fs.readFile(path.join(dir, "_meta.json"), "utf-8");
    return JSON.parse(raw) as ModuleMeta;
  } catch {
    return null;
  }
}

/**
 * Read and parse a single module .md file.
 */
export async function getModule(
  locale: string,
  courseSlug: string,
  moduleId: string
): Promise<ParsedModule | null> {
  const dir = path.join(getCourseDir(locale, courseSlug), "modules");
  const filePath = path.join(dir, `${moduleId}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return parseModuleFile(raw, moduleId);
  } catch {
    return null;
  }
}

/**
 * Read raw markdown content for a module (for the editor).
 */
export async function getModuleRaw(
  locale: string,
  courseSlug: string,
  moduleId: string
): Promise<string | null> {
  const dir = path.join(getCourseDir(locale, courseSlug), "modules");
  const filePath = path.join(dir, `${moduleId}.md`);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

/**
 * Read all modules for a given list of module IDs.
 */
export async function getModules(
  locale: string,
  courseSlug: string,
  moduleIds: string[]
): Promise<ParsedModule[]> {
  const results = await Promise.all(
    moduleIds.map((id) => getModule(locale, courseSlug, id))
  );
  return results.filter((m): m is ParsedModule => m !== null);
}

/**
 * List all available variant configs for a course.
 */
export async function getVariants(
  locale: string,
  courseSlug: string
): Promise<Variant[]> {
  const dir = path.join(getCourseDir(locale, courseSlug), "variants");
  try {
    const files = await fs.readdir(dir);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    const variants = await Promise.all(
      jsonFiles.map(async (f) => {
        const raw = await fs.readFile(path.join(dir, f), "utf-8");
        return JSON.parse(raw) as Variant;
      })
    );
    // Put 'default' first
    return variants.sort((a, b) => {
      if (a.id === "default") return -1;
      if (b.id === "default") return 1;
      return a.title.localeCompare(b.title);
    });
  } catch {
    return [];
  }
}

/**
 * Get a single variant by ID.
 */
export async function getVariant(
  locale: string,
  courseSlug: string,
  variantId: string
): Promise<Variant | null> {
  const dir = path.join(getCourseDir(locale, courseSlug), "variants");
  const filePath = path.join(dir, `${variantId}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as Variant;
  } catch {
    return null;
  }
}
