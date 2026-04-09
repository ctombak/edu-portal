# Edu-Portal v2 — Architecture Blueprint

> Corporate training platform: **public training catalog** + **private trainer workspace** with presentation mode.

---

## 1. Vision

| Audience | What they see |
|----------|---------------|
| **Public visitors** | Training catalog — browse programs, modules, plug-in options, selection guides. Enough to evaluate and decide, but not the full training material. |
| **Trainer (authenticated)** | Full training material for every module, variant selector, and a **presentation mode** that turns module content into navigable slides for live delivery. Inline editing via CodeMirror. |

---

## 2. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 16 (App Router, Turbopack)** | SSR + static gen |
| Auth | **NextAuth.js v5** — CredentialsProvider | Single admin user, JWT session, no database |
| Content | **Markdown (.md)** on filesystem | Easy to edit, git-versioned |
| Styling | **Tailwind CSS 4** + `@tailwindcss/typography` | Utility-first, theme-aware |
| Theming | **CSS custom properties** remapping zinc palette | Light/dark via `data-theme` attribute |
| i18n | **next-intl** | en/tr support |
| Presentation | **Custom React component** (`PresentationShell`) | Fullscreen slides, auto-fit scaling, dynamic thumbnails |
| Inline editing | **CodeMirror** + API route | Admin-only, writes back to filesystem |
| Brand colors | **Teal/cyan** (`#4db8a8`, `#2d9f93`, `#38bdf8`) | No purple/violet anywhere |

---

## 3. Content Architecture

### 3.1 Directory Structure

```
content/
  {locale}/
    courses/
      {course-slug}/
        meta.json                  # Course metadata (title, description, order, type)
        overview.mdx               # Public landing page content + facilitator bio
        training.json              # Public info: schedule, stats, logistics, frameworks
        plugins.json               # Plugin modules metadata for public browse
        selection-guide.json       # Module selection guidance

        modules/                   # ALL module content (core + plugins)
          _meta.json               # Lists coreModules[] and pluginModules[] arrays
          core/                    # Numbered for sequential review
            01-opening.md
            02-the-adaptive-leader.md
            03-the-relational-leader.md
            04-the-growth-leader.md
            05-the-strategic-leader.md
            06-the-ai-fluent-leader.md
            07-closing.md
          plugins/                 # Swappable per variant
            conflict.md
            hybrid-remote.md
            managing-up.md
            leadership-pipeline.md
            emotional-intelligence.md
            prioritization.md
            cross-cultural.md
            hr-leader-of-leaders.md
            hr-transformation.md
            hr-culture-architect.md
            hr-data-driven.md
            hr-dual-role.md
            financial-storytelling.md
            scorekeeper-to-partner.md
            cost-pressure.md
            future-ready-finance.md
            risk-uncertainty.md
            ic-to-manager.md
            engineering-to-business.md
            engineering-team-health.md
            technical-debt.md
            engineering-ai.md
            dual-ladder.md

        variants/                  # Training flavor configurations
          default.json             # All 5 core modules + opening/closing
          engineering.json         # Core 1-3 + engineering plugins
          finance.json             # Core 1-3 + finance plugins
          hr.json                  # Core 1-3 + HR plugins

        curriculum/                # Public-facing summaries (MDX)
          _meta.json
          opening.mdx
          module-1.mdx ... module-5.mdx
          closing.mdx
```

### 3.2 Module Markdown Format

Each `.md` file in `modules/core/` or `modules/plugins/` IS the slide deck. Same file serves:
- **Full Material view** (admin): all slides rendered continuously
- **Presentation mode** (admin): one slide at a time

```markdown
---
id: core/02-the-adaptive-leader
title: "The Adaptive Leader"
subtitle: "Diagnosing Context, Energy & Self-Awareness"
duration: 75 min
type: core
learningObjectives:
  - Distinguish technical problems from adaptive challenges
  - Apply the 'balcony and dance floor' perspective
---

# The Adaptive Leader

Diagnosing Context, Energy & Self-Awareness

<!-- notes: Welcome participants. Set context for why adaptive leadership matters. -->

---

## The Heifetz Framework

- **Technical problems** — Clear, known solutions
- **Adaptive challenges** — Unclear, require learning

> The single biggest failure of leadership is treating adaptive challenges like technical problems.

<!-- notes: Ask audience for examples. 30 seconds to reflect. -->

---

## Technical vs. Adaptive: Examples

| Technical | Adaptive |
|-----------|----------|
| Fix the bug | Change the culture |
| Install new software | Shift team mindset |

---
```

**Conventions:**
- `---` at top = YAML front matter
- `---` between content = slide separator
- `<!-- notes: ... -->` = speaker notes (hidden from audience, shown in notes panel)
- `# Title` (h1) = module title slide
- `## Title` (h2) = section heading slide
- Module IDs include path prefix: `core/02-the-adaptive-leader`, `plugins/conflict`

### 3.3 Variant Configuration

```json
{
  "id": "engineering",
  "title": "Engineering Team Training",
  "modules": ["core/01-opening", "core/02-the-adaptive-leader", "core/03-the-relational-leader", "core/04-the-growth-leader", "plugins/ic-to-manager", "plugins/engineering-to-business", "core/07-closing"],
  "schedule": [
    { "session": "Opening", "module": "core/01-opening", "duration": "40 min", "startTime": "08:30" },
    { "session": "Module 1", "module": "core/02-the-adaptive-leader", "duration": "75 min", "startTime": "09:10" },
    ...
  ]
}
```

---

## 4. Routing & Pages

### 4.1 Public Routes (no auth)

```
/[locale]/                                    # Landing page (dark hero, teal accents)
/[locale]/about                               # About
/[locale]/contact                             # Contact form
/[locale]/courses                             # Course listing
/[locale]/courses/[slug]                      # Course overview (pitch page)
/[locale]/courses/[slug]/curriculum           # Module summaries (public level)
/[locale]/courses/[slug]/plugins              # Plugin module browser
/[locale]/courses/[slug]/selection-guide      # Variant selection guidance
```

### 4.2 Auth

```
/[locale]/login                               # Login page
```

### 4.3 Admin Routes (auth required)

```
/[locale]/admin                               # Dashboard — course list
/[locale]/admin/courses/[slug]                # Full training material (all modules)
/[locale]/admin/courses/[slug]/edit/[moduleId] # CodeMirror markdown editor
/[locale]/admin/courses/[slug]/present        # Variant selector
/[locale]/admin/courses/[slug]/present/[variant] # Presentation mode (fullscreen)
```

---

## 5. Key Features

### 5.1 Authentication
- Single admin user, credentials from env vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`)
- NextAuth.js v5 with JWT session
- Middleware protects `/admin` routes

### 5.2 Presentation Mode
- Fullscreen slide deck from any variant
- **Auto-fit scaling**: content that exceeds viewport scales down automatically (never scrolls)
- **Dynamic thumbnails**: overview (press `O`) shows 1:1 miniature of each slide using ResizeObserver
- Keyboard navigation: `→`/`Space` next, `←` prev, `N` notes, `T` timer, `O` overview, `F` fullscreen, `Esc` exit
- Progress bar, clock, elapsed timer
- Speaker notes panel (toggle with `N`)
- Slide footer: logo + "Atlantic Learning" + slide number
- Teal accent strip, gradient background, concept cards, stat grids, process flows

### 5.3 Full Material View
- All modules in expandable sections
- Filter: all / core / plugin
- Learning objectives, slides, speaker notes (togglable)
- Edit button per module → opens CodeMirror editor
- Speaker notes in amber callout boxes

### 5.4 Inline Editor
- CodeMirror with One Dark theme
- Three modes: editor / split / preview
- Save → `POST /api/content/save` → writes `.md` file to disk
- Supports subdirectory module IDs (`core/01-opening`)

### 5.5 Landing Page
- Always-dark hero with teal gradient text, ambient orbs
- Theme-aware "Why Partner" section (dark bg in dark mode, tinted blue-gray in light)
- CTA section with consultation + browse buttons
- Minimal footer: copyright + trainer login

### 5.6 Theming
- Light/dark mode via `data-theme` attribute on `<html>`
- CSS custom properties remap entire zinc palette for light mode
- Presentation has its own `pres-*` CSS variable system (teal-based)
- Landing page hero sections use hardcoded colors (always dark regardless of theme)

---

## 6. Key Files

### Content Reading/Writing
| File | Purpose |
|------|---------|
| `src/lib/content/read-modules.ts` | Parse `.md` → `ParsedModule` (frontmatter + slides + notes) |
| `src/lib/content/write-module.ts` | Write markdown back to disk (supports subdirectories) |
| `src/lib/content/read-meta.ts` | Read `meta.json`, `training.json`, `plugins.json`, `overview.mdx` |
| `src/lib/content/paths.ts` | Resolve content directory paths |
| `src/lib/slides/parse-slides.ts` | Split markdown by `---` into slide objects, extract `<!-- notes: -->` |
| `src/app/api/content/save/route.ts` | POST endpoint — auth + path traversal protection + write |

### Presentation
| File | Purpose |
|------|---------|
| `src/components/presentation/PresentationShell.tsx` | Main shell: navigation, overview, slide rendering, AutoFitContent, SlideThumbnail |
| `src/components/presentation/SlideAnalyzer.tsx` | Detect stats/process/concept patterns → visual hints + matched text dedup |
| `src/components/presentation/SlideVisuals.tsx` | StatGrid, ProcessFlow, ConceptCards, EquationCard, QuadrantDiagram |
| `src/components/presentation/SlideIllustrations.tsx` | SVG illustrations matched to content keywords |

### Admin
| File | Purpose |
|------|---------|
| `src/components/admin/FullMaterialView.tsx` | Expandable module list with slides + notes |
| `src/components/admin/MarkdownEditor.tsx` | Editor UI with save |
| `src/components/admin/CodeMirrorEditor.tsx` | Syntax-highlighted editor (lazy-loaded) |

### Styling
| File | Purpose |
|------|---------|
| `src/app/globals.css` | Theme variables, zinc remap, `pres-*` variables (teal), landing page classes |

---

## 7. Data Flow

### Public visitor:
```
Request → middleware (i18n) → Page → read meta.json/training.json → render public view
```

### Admin reading material:
```
Request → middleware (i18n + auth) → Page → getModuleMeta() + getModules() → FullMaterialView
```

### Presentation:
```
Select variant → getVariant() → getModules(variant.modules) → parse slides → PresentationShell
  → AutoFitContent scales if overflow
  → SlideAnalyzer detects visual patterns
  → SlideVisuals renders stat/concept/process cards
```

### Inline editing:
```
Admin → edit button → getModuleRaw() → CodeMirror editor → POST /api/content/save → writeModuleFile()
```

---

## 8. Environment Variables

```env
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD_HASH=$2b$10$...    # bcrypt hash
NEXTAUTH_SECRET=random-secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 9. Courses

| Course | Core Modules | Plugin Modules | Variants |
|--------|-------------|----------------|----------|
| Leadership & Management | 7 (opening → closing) | 23 (engineering, finance, HR, general) | default, engineering, finance, hr |
| Enterprise Product Lifecycle | 7 (opening → closing) | 5 (cloud, legacy, regulatory, AI/ML, analytics) | default |

---

## 10. Future Considerations

- Student accounts and progress tracking
- Certificate generation
- Export slides to PDF
- Second-screen presenter view
- Content versioning UI
- Multi-facilitator support
