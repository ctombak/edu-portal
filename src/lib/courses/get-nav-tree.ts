import type { NavFolder, NavLink, NavNode } from "@/types/nav";
import { getCourses } from "./get-courses";
import { getLessons } from "./get-lessons";
import { getModules } from "./get-modules";

export async function getNavTree(locale: string): Promise<NavNode[]> {
  const courses = await getCourses(locale);
  const prefix = `/${locale}/courses`;

  const nodes: NavNode[] = await Promise.all(
    courses.map(async (course) => {
      const modules = await getModules(locale, course.slug);
      const children: NavNode[] = await Promise.all(
        modules.map(async (mod) => {
          const lessons = await getLessons(locale, course.slug, mod.slug);
          const lessonLinks: NavLink[] = lessons.map((lesson) => ({
            type: "link",
            title: lesson.title,
            href: `${prefix}/${course.slug}/${mod.slug}/${lesson.slug}`,
          }));
          const moduleFolder: NavFolder = {
            type: "folder",
            title: mod.title,
            href: `${prefix}/${course.slug}/${mod.slug}`,
            children: lessonLinks,
          };
          return moduleFolder;
        })
      );
      const courseFolder: NavFolder = {
        type: "folder",
        title: course.title,
        href: `${prefix}/${course.slug}`,
        children,
      };
      return courseFolder;
    })
  );

  return nodes;
}
