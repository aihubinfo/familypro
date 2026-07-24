---
name: familypro-blog-cover-workflow
description: Generate, optimize, attach, reuse, and validate cover images for the familypro Astro multilingual blog. Use whenever creating a new public blog post, adding a cover to an existing post, updating a blog cover, or adding language variants that must share one coverImage per translationKey.
---

# Familypro Blog Cover Workflow

Create one English-captioned cover for each article identity and reuse it across every locale with the same `translationKey`.

## Read first

Before acting:

1. Read `AGENTS.md`, `src/content.config.ts`, and every target file under `src/content/blog/**`.
2. Confirm how `coverImage` is rendered in `src/pages/[lang]/blog/[slug].astro`.
3. Load and follow the available `imagegen` skill completely before generating or editing an image.
4. If the task also creates, rewrites, or translates article content, use `familypro-blog-workflow` as well.

## Cover policy

- Use exactly one cover asset per `translationKey`.
- Store final assets at `public/blog-covers/<translationKey>.webp`.
- Set every language variant to the same root-relative value:

  ```yaml
  coverImage: /blog-covers/<translationKey>.webp
  ```

- Let the article template place the cover between the article header and Markdown body. Do not duplicate it with Markdown image syntax.
- Let the template use each localized `title` as image alt text.
- Every public cover must contain a clear English title treatment. Do not use text-free covers.
- Reuse the same English-captioned asset across all locale variants; do not localize the in-image text.
- If a valid shared cover already exists, reuse it. Do not regenerate or overwrite it unless the user explicitly requests replacement; use a `-v2` filename for an unrequested alternative.
- Keep `updatedDate` at the actual edit date in every blog file whose frontmatter changes.

## Generate the image

1. Read the article title, summary, opening, major sections, and conclusion. Reduce the article to one visual idea.
2. Define the exact English cover copy before generating:
   - use a concise main title, normally 3–7 words
   - add a short supporting line such as `2026 COMPARISON`, `PRACTICAL GUIDE`, or a topic-specific qualifier when it improves clarity
   - prefer the English article's `title` or `headline`; if no English variant exists, write an accurate English equivalent
   - keep the cover copy semantically aligned with every locale variant
3. Use built-in `image_gen` by default.
4. Generate a wide landscape cover near 16:9 with a strong central composition, safe margins, and details that remain clear at card-thumbnail size.
5. Default to a polished editorial 3D or cinematic illustration on a dark navy/indigo base with restrained topic-specific accent colors. Change medium when the subject clearly calls for photography or another style.
6. Use a consistent English title treatment:
   - bold, modern sans-serif typography with strong contrast
   - place the title inside the safe area without covering the main subject
   - render the supplied English copy verbatim and exactly once
   - no Chinese, Japanese, Arabic, pseudo-text, extra letters, or unintended UI labels
   - no watermark
   - no official logos or copied product interfaces unless the user explicitly requests them
   - use abstract visual cues for branded products
7. Avoid decorative concepts that do not explain the article. Show the central comparison, process, tradeoff, or outcome.
8. Visually inspect the result for subject accuracy, English spelling, extra or garbled text, logo imitation, artifacts, composition, and thumbnail readability. Iterate with one targeted change when needed.

## Save and attach

1. Copy the selected built-in image from its generated location into the repository.
2. Convert PNG/JPEG sources to WebP with a visually high-quality setting. Preserve a wide source of roughly 1600 px or more when available and aim to keep the final file under 500 KB.
3. Use the stable asset path derived from `translationKey`.
4. Add the same `coverImage` field to every existing locale file in that translation group.
5. Do not add separate localized images. The shared cover must keep the same English caption in every locale.

## Validate

Run the bundled checker for the affected translation key:

```bash
node .agents/skills/familypro-blog-cover-workflow/scripts/check_blog_covers.mjs <translationKey>
```

Then run:

```bash
npm run sync:updated-date
npm run check:references
npm run build
```

Inspect at least one built article page and one list/card page. Verify:

- the cover appears before the Markdown body
- the image URL resolves
- all locale variants share the same asset
- the cover includes accurate, legible English text and is not text-free
- no unintended or garbled text appears
- localized alt text is present
- `og:image` and `twitter:image` use the cover
- no duplicate Markdown cover was added

Report the final workspace asset path, the prompt used, that built-in image generation was used, the blog files updated, and validation results.
