import matter from "gray-matter";
import type { ModuleFrontmatter, Slide, ParsedModule } from "@/types/course";

const NOTES_RE = /<!--\s*notes:\s*([\s\S]*?)\s*-->/gi;

/**
 * Parse a module .md file into frontmatter + slides.
 * Slides are separated by `---` (horizontal rule) in the body.
 * Speaker notes use `<!-- notes: ... -->` syntax.
 */
export function parseModuleFile(raw: string, moduleId: string): ParsedModule {
  const { data, content } = matter(raw);
  const frontmatter = data as ModuleFrontmatter;
  if (!frontmatter.id) frontmatter.id = moduleId;

  const slides = splitIntoSlides(content, frontmatter);
  return { frontmatter, rawContent: content, slides };
}

function splitIntoSlides(content: string, fm: ModuleFrontmatter): Slide[] {
  // Split on --- that appear as standalone lines (horizontal rules)
  // but NOT the frontmatter delimiter (already stripped by gray-matter)
  const blocks = content.split(/\n---\n/).filter((b) => b.trim());

  return blocks.map((block, index) => {
    // Extract speaker notes
    let notes: string | undefined;
    const notesMatch = block.match(NOTES_RE);
    if (notesMatch) {
      notes = notesMatch
        .map((m) => {
          const inner = m.match(/<!--\s*notes:\s*([\s\S]*?)\s*-->/i);
          return inner ? inner[1].trim() : "";
        })
        .filter(Boolean)
        .join("\n");
    }

    // Remove notes from displayed content
    const slideContent = block.replace(NOTES_RE, "").trim();

    return {
      content: slideContent,
      notes,
      moduleId: fm.id,
      moduleTitle: fm.title,
      index,
    };
  });
}
