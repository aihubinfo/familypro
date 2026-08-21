# Layout Checklist

## 1) Structure

- Keep header and main body in one content column.
- Keep TOC as an independent module on the right in desktop layout.
- Avoid phantom spacing between header and first body block.

## 2) Responsive Exclusivity

- Desktop: show desktop TOC only.
- Mobile: show mobile TOC only.
- Ensure no breakpoint where both TOCs are visible.

## 3) TOC Behavior

- TOC includes `h2` only.
- Sidebar TOC is sticky on desktop and does not overlap header.
- Active section highlight updates while scrolling.
- Hash navigation updates active TOC item.

## 4) Overflow Safety

- Wide tables scroll horizontally inside content area.
- Long words/URLs do not break layout width.
- Code blocks do not push container wider than viewport.

## 5) Visual Consistency

- `article-header` and `article-main` widths are aligned.
- Card borders/radius/padding are consistent with site tokens.
- Sidebar width and gap are stable at desktop breakpoints.
- Article covers use a 16:9 box with `object-fit: contain`; no title or artwork is cropped on home, list, or detail pages.
- Blog grids progress from 1 to 2 to 3 to at most 4 columns as viewport width grows.

## 6) Regression Sweep

- Home page renders without layout shift.
- Blog list page renders without card wrapping regressions.
- Long localized titles do not widen grid tracks or create horizontal scrolling.
- One article page per non-default locale still renders correctly.

## 7) Validation Commands

1. `npm run build`
2. `npm run preview`
3. Open and verify:
   - `/{lang}/`
   - `/{lang}/blog/`
   - `/{lang}/blog/{slug}/`
