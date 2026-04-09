import fs from "fs/promises";
import path from "path";

/**
 * Write updated markdown content back to a module file.
 * Used by the inline editor API route.
 */
export async function writeModuleFile(
  locale: string,
  courseSlug: string,
  moduleId: string,
  content: string
): Promise<void> {
  const contentDir = path.join(process.cwd(), "content", locale, "courses", courseSlug, "modules");
  const filePath = path.join(contentDir, `${moduleId}.md`);

  // Ensure directory exists (supports subdirectories like core/ and plugins/)
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}
