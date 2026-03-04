import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { locales } from "@/i18n/config";
import {
  getCourse,
  getLesson,
  getLessons,
  getModule,
  getCourses,
  getModules,
} from "@/lib/courses";

export async function generateStaticParams() {
  const params: {
    locale: string;
    courseSlug: string;
    moduleSlug: string;
    lessonSlug: string;
  }[] = [];
  for (const locale of locales) {
    const courses = await getCourses(locale);
    for (const course of courses) {
      const modules = await getModules(locale, course.slug);
      for (const mod of modules) {
        const lessons = await getLessons(locale, course.slug, mod.slug);
        for (const lesson of lessons) {
          params.push({
            locale,
            courseSlug: course.slug,
            moduleSlug: mod.slug,
            lessonSlug: lesson.slug,
          });
        }
      }
    }
  }
  return params;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    locale: string;
    courseSlug: string;
    moduleSlug: string;
    lessonSlug: string;
  }>;
}) {
  const { locale, courseSlug, moduleSlug, lessonSlug } = await params;
  const [course, mod, lessonData] = await Promise.all([
    getCourse(locale, courseSlug),
    getModule(locale, courseSlug, moduleSlug),
    getLesson(locale, courseSlug, moduleSlug, lessonSlug),
  ]);
  if (!course || !mod || !lessonData) notFound();
  const { meta, content } = lessonData;

  return (
    <div className="w-full max-w-3xl px-6 py-10 sm:py-12 lg:px-10">
      <Link
        href={`/${locale}/courses/${courseSlug}/${moduleSlug}`}
        className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        {mod.title}
      </Link>

      <header className="mb-10">
        <p className="mb-3 text-sm font-medium text-zinc-600">
          {course.title}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          {meta.title}
        </h1>
      </header>

      <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-zinc-400 prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300 prose-strong:text-zinc-200 prose-code:rounded prose-code:bg-zinc-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-300 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800/80 prose-hr:border-zinc-800/60 prose-blockquote:border-zinc-700 prose-blockquote:text-zinc-400 prose-li:text-zinc-400">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
