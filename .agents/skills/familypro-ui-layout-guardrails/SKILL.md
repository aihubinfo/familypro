---
name: familypro-ui-layout-guardrails
description: Use when changing UI layout or responsive behavior in the familypro Astro site, especially article/detail/list templates. Covers content-column alignment, desktop/mobile TOC separation, sticky sidebar behavior, active-heading highlighting, overflow handling, and layout regression checks.
---

# Familypro UI Layout Guardrails

Use this skill for template-layer UI changes in:

- `src/layouts/**`
- `src/pages/**`
- shared UI components used by page layout

## Read before editing

1. `AGENTS.md`
2. `src/layouts/BaseLayout.astro`
3. Target page template(s), usually:
   - `src/pages/[lang]/blog/[slug].astro` (article detail)
   - `src/pages/[lang]/blog/index.astro` (list page)
   - `src/pages/index.astro` (home/list cards)
4. [layout-checklist.md](references/layout-checklist.md)

## Non-negotiable layout rules

- Keep `article-header` and `article-main` in the same content column; do not let TOC width change content width.
- Treat desktop and mobile TOC as mutually exclusive modes; never allow both to be visible at the same breakpoint.
- Use one heading source of truth (`h2` only for TOC) and keep anchor ids/data-target consistent across all TOC variants.
- Keep desktop TOC independent from main flow (sidebar module), with sticky behavior on desktop only.
- Prevent content overflow regressions (tables/code blocks/long tokens).
- Keep blog covers fully visible on home, list, and detail pages. Use a stable 16:9 box with `object-fit: contain`; do not reintroduce fixed-height cropping or `object-fit: cover` for article covers.
- Blog card grids must be mobile-first and cap at four columns: 1 column on narrow screens, then 2, 3, and at most 4 columns as viewport width increases.
- Do not introduce per-article hardcoded layout exceptions.

## Recommended implementation pattern

- Use explicit mode classes such as `*-mobile-only` and `*-desktop-only`.
- In desktop media query, force exclusivity with high-priority display rules.
- Keep sticky TOC in a dedicated sidebar column in desktop grid.
- Keep active-state script bound to shared `[data-toc-link]` attributes.
- Initialize TOC interaction only after DOM is ready.
- Use `minmax(0, 1fr)` tracks for card grids so long localized titles cannot force horizontal overflow.

## Validation baseline

- Run `npm run build`.
- If layout or style changed, run `npm run preview`.
- Verify at least one article page on desktop and mobile widths.
- Verify home and blog-list grids at 1-, 2-, 3-, and 4-column breakpoints; no viewport may render more than four cards per row.
- Verify cover artwork and English captions are fully visible without cropping on cards and article detail pages.
- Validate TOC visibility, sticky behavior, active highlight, and no extra whitespace gaps.

Follow the detailed acceptance checks in [layout-checklist.md](references/layout-checklist.md).
