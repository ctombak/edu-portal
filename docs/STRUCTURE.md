# Education Portfolio — Folder Structure

Structure for **courses → modules → lessons** with **English and Turkish** support.

**What’s in the repo:** A full skeleton is in place: `content/courses/react-fundamentals/` (sample course + module + lesson), `src/app/courses/` routes (list, course, module, lesson), and `src/types/course.ts`. Implement `src/lib/courses` to read from `content/` and wire the pages to real data.

---

## 1. Content (source of truth)

Course content is **per locale**. Use **slugs** in URLs and file names (e.g. `react-fundamentals`, `state-and-effects`). Each locale has its own tree under `content/<locale>/courses/`.

```
content/
  en/courses/...   (English meta.json + .mdx)
  tr/courses/...   (Turkish meta.json + .mdx)
```

- **Course:** one folder per course; `meta.json` describes the course and (optionally) the order of modules.
- **Module:** one folder per module inside a course; `meta.json` describes the module and order of lessons.
- **Lesson:** one `.mdx` (or `.md`) file per lesson inside a module. Filename = lesson slug.

Example:

```
content/en/courses/react-fundamentals/
  meta.json
  state-and-effects/
    meta.json
    use-state.mdx
content/tr/courses/react-fundamentals/
  meta.json
  state-and-effects/
    meta.json
    use-state.mdx
```

---

## 2. App routes (Next.js App Router)

All routes are under **locale** so URLs are `/[locale]/...` (e.g. `/en/courses`, `/tr/courses`).

```
src/app/
  [locale]/
    layout.tsx                 → Header with nav + language switcher (flags)
    page.tsx                   → Home
    courses/
      page.tsx                 → List all courses (for this locale)
      [courseSlug]/
        page.tsx               → Course overview + list of modules
        [moduleSlug]/
          page.tsx             → Module overview + list of lessons
          [lessonSlug]/
            page.tsx           → Single lesson (load & render MDX)
```

- **courses/page.tsx** — Read all courses from `content/<locale>/courses/*`, show cards/links. UI strings from `messages/<locale>.json`.
- **courses/[courseSlug]/page.tsx** — Read course meta + list modules for the current locale.
- **courses/[courseSlug]/[moduleSlug]/page.tsx** — Read module meta + list lessons.
- **courses/[courseSlug]/[moduleSlug]/[lessonSlug]/page.tsx** — Load the corresponding `.mdx` for the locale and render with ReactMarkdown.

**i18n:** `next-intl` with locale in the path. Middleware redirects `/` to `/en`. Language switcher in the header toggles between English (🇬🇧) and Turkish (🇹🇷).

---

## 3. Data / utilities (optional but recommended)

Centralize reading from the file system and parsing meta/MDX:

```
src/lib/
  courses/
    index.ts                   re-export
    get-courses.ts             list courses, get one by slug
    get-modules.ts             list modules for a course, get one by slug
    get-lessons.ts             list lessons for a module, get one by slug
  content/
    read-meta.ts               read & parse meta.json
    render-lesson.ts           compile MDX for a lesson
```

Types can live in `src/types/course.ts` (e.g. `Course`, `Module`, `Lesson`, `LessonMeta`).

---

## 4. Meta.json shape (suggested)

**Course `meta.json`:**
```json
{
  "title": "React Fundamentals",
  "description": "Learn core React concepts.",
  "order": 1,
  "image": "/courses/react-fundamentals.jpg"
}
```

**Module `meta.json`:**
```json
{
  "title": "State and Effects",
  "description": "useState, useEffect, and data flow.",
  "order": 2
}
```

**Lesson:** frontmatter in the `.mdx` file, e.g.:
```yaml
---
title: "Using useState"
order: 1
---
```

---

## 5. URL examples

| Page           | URL (English)                                                    | URL (Turkish)                                                    |
|----------------|------------------------------------------------------------------|------------------------------------------------------------------|
| Home           | `/en`                                                            | `/tr`                                                            |
| All courses    | `/en/courses`                                                    | `/tr/courses`                                                    |
| One course     | `/en/courses/react-fundamentals`                                 | `/tr/courses/react-fundamentals`                                |
| One module     | `/en/courses/react-fundamentals/state-and-effects`               | `/tr/courses/react-fundamentals/state-and-effects`               |
| One lesson     | `/en/courses/react-fundamentals/state-and-effects/use-state`     | `/tr/courses/react-fundamentals/state-and-effects/use-state`     |

---

## 6. Adding content

1. For each new course, add the same folder structure under **both** `content/en/courses/` and `content/tr/courses/` (e.g. `react-fundamentals/`, `meta.json`, modules, lessons).
2. Keep **course and module slugs** identical across locales so URLs stay in sync when switching language.
3. UI strings live in `messages/en.json` and `messages/tr.json`; course/module/lesson titles and body come from the `content/<locale>/` files.
