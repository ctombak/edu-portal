# Education Portal — Folder Structure

Structure for **courses** (training workshops) with **English and Turkish** support.

---

## 1. Content (source of truth)

Course content is **per locale**. Use **slugs** in URLs and file names (e.g. `leadership-and-management`, `enterprise-product-lifecycle`). Each locale has its own tree under `content/<locale>/courses/`.

The project uses a **hybrid content model**:

- **JSON** for structured / tabular data (schedules, stats, plugin modules, selection guides).
- **MDX** for prose-heavy content (curriculum sections, course overview, facilitator bio).

### Directory layout

```
content/
  en/courses/
    <courseSlug>/
      meta.json               Course metadata (title, description, order, type)
      overview.mdx             Course overview & facilitator bio (prose)
      training.json            Schedule, modules, frameworks, logistics (structured)
      plugins.json             Plug-in module categories & details (structured)
      selection-guide.json     Team-specific module selection guides (structured)
      curriculum/
        _meta.json             Curriculum title, subtitle, totalDuration
        opening.mdx            Opening session
        module-1.mdx           Module 1
        module-2.mdx           Module 2
        module-3.mdx           Module 3
        module-4.mdx           Module 4
        module-5.mdx           Module 5
        closing.mdx            Closing session
  tr/courses/
    (same structure, Turkish translations)
```

### Curriculum MDX format

Each curriculum section file uses YAML frontmatter for metadata and Markdown body for prose content:

```mdx
---
id: module1
title: "Module 1: The Adaptive Leader"
subtitle: "Diagnosing Context, Energy & Self-Awareness"
duration: "75 min"
learningObjectives:
  - "Distinguish technical problems from adaptive challenges"
  - "Apply the 'balcony and dance floor' perspective"
---

Section overview paragraph goes here (before the first ## heading).

## Topic Title

Topic prose content as natural paragraphs.

> Key quote displayed as a blockquote.

**Framework: Framework Name** — Framework description.

## Next Topic Title

More prose content...
```

**Conventions:**

- `## ` headings = topic titles
- `> ` blockquotes = key quotes
- `**Framework: Name** — description` = framework entries
- `learningObjectives` in frontmatter (omit for sections that have none)

### overview.mdx format

```mdx
---
tagline: "From Authority to Influence: Building a High-Performance Culture"
facilitator: "Cihat Tombak"
---

Course overview paragraphs go here.

## Facilitator

Facilitator bio goes here.
```

### meta.json shape

```json
{
  "title": "Leadership & Management Training",
  "description": "A full-day interactive workshop...",
  "order": 1,
  "type": "training"
}
```

---

## 2. App routes (Next.js App Router)

All routes are under **locale** so URLs are `/[locale]/...` (e.g. `/en/courses`, `/tr/courses`).

```
src/app/
  layout.tsx                          Root layout (fonts, theme, i18n provider)
  globals.css                         Tailwind v4 + theme variables
  [locale]/
    layout.tsx                        Header (nav, language switcher, theme toggle) + footer
    page.tsx                          Home
    about/
      page.tsx                        About page
    contact/
      page.tsx                        Contact form (client component)
    courses/
      page.tsx                        List all courses for this locale
      [courseSlug]/
        page.tsx                      Course pitch page (training overview)
        curriculum/
          page.tsx                    Full curriculum with sections & topics
        plugins/
          page.tsx                    Plug-in module catalog
        selection-guide/
          page.tsx                    Team-specific module selection guide
```

- **courses/page.tsx** — Reads all courses via `getCourses(locale)`, displays cards.
- **courses/[courseSlug]/page.tsx** — Loads `getCourse()` + `getTrainingDetail()`, renders `TrainingPitchPage`.
- **courses/[courseSlug]/curriculum/page.tsx** — Loads `getCurriculum()`, renders TOC + sections with topics, frameworks, quotes.
- **courses/[courseSlug]/plugins/page.tsx** — Loads `getPluginsData()` + `getSelectionGuide()`, renders `PluginsPageClient`.
- **courses/[courseSlug]/selection-guide/page.tsx** — Loads `getSelectionGuide()`, renders team guides + discussion questions.

---

## 3. Data / utilities

Centralized reading from the file system:

```
src/lib/
  courses/
    index.ts                   Re-exports all data-fetching functions
    get-courses.ts             getCourses(locale), getCourse(locale, slug)
    get-training.ts            getTrainingDetail(locale, slug) — merges training.json + overview.mdx
    get-plugins.ts             getPluginsData, getSelectionGuide, getCurriculum
  content/
    paths.ts                   getCoursesContentDir(locale), getCourseDir(locale, slug)
    read-meta.ts               JSON readers + MDX parsers (readCurriculum, readOverview, etc.)
```

Types live in `src/types/course.ts` (`Course`, `CourseMeta`, `TrainingDetail`, `CurriculumData`, `PluginsData`, `SelectionGuideData`, etc.).

---

## 4. Components

```
src/components/
  TrainingPitchPage.tsx        Course pitch / landing page (server component)
  ModuleCardsClient.tsx        Training module cards with modal details
  PluginsPageClient.tsx        Plugin catalog with modals + team guides
  FacilitatorLink.tsx          Facilitator avatar + bio link
  HeaderRight.tsx              Theme switcher + language switcher
  LanguageSwitcher.tsx         EN/TR toggle (preserves scroll position)
  MobileNav.tsx                Hamburger menu for mobile
  ScrollToTopButton.tsx        Fixed scroll-to-top button
  ThemeProvider.tsx             Dark/light/auto theme context
  ThemeSwitcher.tsx            Three-mode theme toggle
```

---

## 5. i18n

**Library:** `next-intl` with locale in the URL path (`localePrefix: "always"`).

```
src/i18n/
  config.ts                    Locales: en, tr — default: en
  routing.ts                   Routing config (localePrefix: "always")
  navigation.ts                Locale-aware Link, useRouter, etc.
  request.ts                   Server-side message loading
src/middleware.ts               Redirects to default locale
messages/
  en.json                      English UI strings
  tr.json                      Turkish UI strings
```

Course/module/lesson titles and body come from `content/<locale>/` files. UI strings (nav labels, form labels, section headings) come from `messages/<locale>.json`.

---

## 6. URL examples

| Page             | URL (English)                                            | URL (Turkish)                                            |
|------------------|----------------------------------------------------------|----------------------------------------------------------|
| Home             | `/en`                                                    | `/tr`                                                    |
| All courses      | `/en/courses`                                            | `/tr/courses`                                            |
| Course pitch     | `/en/courses/leadership-and-management`                  | `/tr/courses/leadership-and-management`                  |
| Curriculum       | `/en/courses/leadership-and-management/curriculum`       | `/tr/courses/leadership-and-management/curriculum`       |
| Plugins          | `/en/courses/leadership-and-management/plugins`          | `/tr/courses/leadership-and-management/plugins`          |
| Selection guide  | `/en/courses/leadership-and-management/selection-guide`  | `/tr/courses/leadership-and-management/selection-guide`  |

---

## 7. Adding content

1. Create the same folder structure under **both** `content/en/courses/` and `content/tr/courses/`.
2. Keep **course slugs** identical across locales so URLs stay in sync when switching language.
3. For curriculum, create one MDX file per section in `curriculum/` and a `_meta.json` with title/subtitle/totalDuration.
4. Put the course overview and facilitator bio in `overview.mdx`.
5. Keep structured data (schedule, modules, plugins, selection guide) in JSON files.
6. UI strings live in `messages/en.json` and `messages/tr.json`; course content comes from the `content/<locale>/` files.
