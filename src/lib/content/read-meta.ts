import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type {
  CourseMeta,
  TrainingDetail,
  PluginsData,
  SelectionGuideData,
  CurriculumData,
  CurriculumSection,
  CurriculumTopic,
} from "@/types/course";

/* ------------------------------------------------------------------ */
/*  JSON readers (unchanged)                                          */
/* ------------------------------------------------------------------ */

export async function readCourseMeta(courseDir: string): Promise<CourseMeta> {
  const filePath = path.join(courseDir, "meta.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as CourseMeta;
}

export async function readTrainingDetail(courseDir: string): Promise<TrainingDetail | null> {
  const filePath = path.join(courseDir, "training.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as TrainingDetail;
  } catch {
    return null;
  }
}

export async function readPluginsData(courseDir: string): Promise<PluginsData | null> {
  const filePath = path.join(courseDir, "plugins.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as PluginsData;
  } catch {
    return null;
  }
}

export async function readSelectionGuide(courseDir: string): Promise<SelectionGuideData | null> {
  const filePath = path.join(courseDir, "selection-guide.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as SelectionGuideData;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  MDX body parser                                                   */
/* ------------------------------------------------------------------ */

const FRAMEWORK_RE = /^\*\*Framework: (.+?)\*\* — (.+)$/gm;

function parseSectionBody(body: string): {
  overview: string;
  topics: CurriculumTopic[];
} {
  // Split on ## headings to separate topics
  const headingRe = /^## (.+)$/gm;
  const segments: { title: string; text: string }[] = [];
  let overview = "";
  let lastIndex = 0;
  let lastTitle = "";
  let m: RegExpExecArray | null;

  while ((m = headingRe.exec(body)) !== null) {
    const chunk = body.slice(lastIndex, m.index).trim();
    if (!lastTitle) {
      overview = chunk;
    } else {
      segments.push({ title: lastTitle, text: chunk });
    }
    lastTitle = m[1].trim();
    lastIndex = m.index + m[0].length;
  }
  if (lastTitle) {
    segments.push({ title: lastTitle, text: body.slice(lastIndex).trim() });
  }

  const topics: CurriculumTopic[] = segments.map(({ title, text }) => {
    // Extract the first blockquote as keyQuote
    const quoteMatch = text.match(/^> (.+)$/m);
    const keyQuote = quoteMatch ? quoteMatch[1].trim() : undefined;

    // Extract all **Framework: Name** — description lines
    const frameworks: { name: string; description: string }[] = [];
    let fw: RegExpExecArray | null;
    const fwRe = new RegExp(FRAMEWORK_RE.source, "gm");
    while ((fw = fwRe.exec(text)) !== null) {
      frameworks.push({ name: fw[1], description: fw[2] });
    }

    // Content = everything except blockquotes and framework lines
    const content = text
      .replace(/^> .+$/gm, "")
      .replace(/^\*\*Framework: .+?\*\* — .+$/gm, "")
      .trim()
      .replace(/\n{3,}/g, "\n\n");

    return {
      title,
      content,
      ...(keyQuote && { keyQuote }),
      ...(frameworks.length > 0 && { frameworks }),
    };
  });

  return { overview, topics };
}

/* ------------------------------------------------------------------ */
/*  Curriculum reader (MDX-first, JSON fallback)                      */
/* ------------------------------------------------------------------ */

const SECTION_FILES = [
  "opening.mdx",
  "module-1.mdx",
  "module-2.mdx",
  "module-3.mdx",
  "module-4.mdx",
  "module-5.mdx",
  "closing.mdx",
];

export async function readCurriculum(courseDir: string): Promise<CurriculumData | null> {
  const currDir = path.join(courseDir, "curriculum");

  // Try MDX-based curriculum first
  try {
    const metaRaw = await fs.readFile(path.join(currDir, "_meta.json"), "utf-8");
    const meta = JSON.parse(metaRaw) as {
      title: string;
      subtitle: string;
      totalDuration: string;
    };

    const sections: CurriculumSection[] = [];
    for (const file of SECTION_FILES) {
      try {
        const raw = await fs.readFile(path.join(currDir, file), "utf-8");
        const { data, content } = matter(raw);
        const { overview, topics } = parseSectionBody(content);

        sections.push({
          id: data.id as string,
          title: data.title as string,
          subtitle: data.subtitle as string | undefined,
          duration: data.duration as string,
          overview: overview || undefined,
          learningObjectives: data.learningObjectives as string[] | undefined,
          topics,
        });
      } catch {
        // skip missing section files
      }
    }

    if (sections.length === 0) throw new Error("no sections");

    return { title: meta.title, subtitle: meta.subtitle, totalDuration: meta.totalDuration, sections };
  } catch {
    // Fall back to legacy curriculum.json
    try {
      const raw = await fs.readFile(path.join(courseDir, "curriculum.json"), "utf-8");
      return JSON.parse(raw) as CurriculumData;
    } catch {
      return null;
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Overview reader (overview.mdx)                                    */
/* ------------------------------------------------------------------ */

export async function readOverview(
  courseDir: string
): Promise<{ overview: string; facilitatorBio: string; tagline?: string; facilitator?: string } | null> {
  try {
    const raw = await fs.readFile(path.join(courseDir, "overview.mdx"), "utf-8");
    const { data, content } = matter(raw);

    // Split on the first ## heading (e.g. ## Facilitator / ## Eğitmen)
    const headingIdx = content.search(/^## /m);
    let overview: string;
    let facilitatorBio = "";

    if (headingIdx >= 0) {
      overview = content.slice(0, headingIdx).trim();
      const afterHeading = content.slice(headingIdx);
      const lines = afterHeading.split("\n");
      facilitatorBio = lines.slice(1).join("\n").trim();
    } else {
      overview = content.trim();
    }

    return {
      overview,
      facilitatorBio,
      tagline: data.tagline as string | undefined,
      facilitator: data.facilitator as string | undefined,
    };
  } catch {
    return null;
  }
}
