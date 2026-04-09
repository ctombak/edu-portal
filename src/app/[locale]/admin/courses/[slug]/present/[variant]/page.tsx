import { notFound } from "next/navigation";
import { getVariant, getModules } from "@/lib/content/read-modules";
import { PresentationShell } from "@/components/presentation/PresentationShell";
import type { Slide } from "@/types/course";

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; variant: string }>;
}) {
  const { locale, slug, variant: variantId } = await params;
  const variant = await getVariant(locale, slug, variantId);
  if (!variant) notFound();

  const modules = await getModules(locale, slug, variant.modules);

  // Flatten all slides from all modules into a single ordered list
  const allSlides: Slide[] = modules.flatMap((m) => m.slides);

  // Build module index map for navigation
  const moduleBreaks: { moduleTitle: string; startIndex: number }[] = [];
  let idx = 0;
  for (const m of modules) {
    moduleBreaks.push({
      moduleTitle: m.frontmatter.title,
      startIndex: idx,
    });
    idx += m.slides.length;
  }

  return (
    <PresentationShell
      slides={allSlides}
      moduleBreaks={moduleBreaks}
      variantTitle={variant.title}
      schedule={variant.schedule}
      locale={locale}
      courseSlug={slug}
    />
  );
}
