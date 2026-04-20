---
locale: en
translationKey: gamma-ppt-generation-practical-guide-2026
title: "How to Build Presentations You Want in Gamma: Text and Template Paths"
headline: "Practical steps to turn content into a presentable, exportable deck in Gamma"
description: "Gamma guide: define your brief, then create from text (Generate/Paste/Import) or templates/Remix. Covers audience, tone, cards, images, and PPTX export."
summary: "Start with a clear brief, then pick the right entry point. Use the parameter tables below for audience, tone, card count, and image strategy so the first generation lands closer to what you expect."
category: AI Tools
pubDate: 2026-04-02
updatedDate: 2026-04-20
author: Huge
service: General
tags:
  - Gamma
  - AI presentations
  - PowerPoint
  - prompts
  - Remix
draft: false
---

Gamma turns your material into **card-based** decks in the browser and lets you export **PowerPoint (PPTX)**, PDF, and more. To get a deck that **matches what you actually want**—right story, speakable copy, and a file you can hand off—you usually need two things: **spell out the brief**, then **pick the right creation path**.

Official docs boil this down to **two paths** (not two separate products—just different starting points):

| Path | Typical entry | What you start with | What drives the outcome most |
| --- | --- | --- | --- |
| **Create from text** | **Create New AI** → **Generate / Paste / Import** | A one-line topic, a draft, or a file/link | Whether structure, page count, and factual constraints are explicit |
| **Reuse a template shell** | **Templates** → **Create from this**, or **⋯ → Create from this (remix)** | A gamma with fixed sections/layout, or a team workspace template | Whether the template fits the story + whether Remix instructions say what to swap |

What follows maps to the menus and controls; labels may vary by account.

> Last verified: 2026-04-02  
> Note: Plans and entitlements change. **Workspace Templates** are documented for tiers such as **Pro / Ultra / Team / Business**—confirm at checkout. **Remix** is available on plans that support it and consumes **credits**.

## 1) Before you start: write a short “expected deck” brief

For either path, jot the notes below (you can paste them into the topic box, above pasted text, or into a Remix prompt). They reduce rework:

- **Audience and setting**: internal vs external; pitch vs training vs review; do they want conclusions, numbers, or risk?
- **The one takeaway**: what they should remember—or **one action** you want (approve, pilot, schedule).
- **Time and page cap**: e.g. 10 minutes, max 12 cards; a hard cap cuts filler slides.
- **Must-include / must-not**: terms, compliance language, numbers you can’t invent.
- **Visuals**: whether you need images; for text-only decks, choose **Don’t add images** or **Image placeholders** at generation time (see “Image source” below).

## 2) Parameters you can configure (aligned with official generation behavior)

Gamma’s developer docs describe generation fields in full ([Generate from text](https://developers.gamma.app/guides/generate-api-parameters-explained)). The **Generate / Advanced Mode** UI follows the **same conceptual model**—often grouped into a few panels or steps. **Exact control names depend on your UI**; the tables below explain what each field is **for**, with **examples you can paste or adapt**.

**Note:** Even if you never call the API, thinking in these dimensions—same as passing JSON parameters—helps you fill topic prompts, advanced fields, and `additionalInstructions` correctly.

### 2.1 Text handling mode `textMode` (how AI treats your source text)

| Value | Meaning | Typical use |
| --- | --- | --- |
| `generate` | **Expand** your text into a full narrative and structure | **Generate**: topic or short bullets only; you want AI to flesh it out |
| `condense` | **Compress** long content to fit a deck | Long reports or articles before presenting |
| `preserve` | **Keep wording**, add structure only where sensible | **Paste**: copy is approved; you fear AI will rewrite facts |

**Example (topic or instructions field, to signal preserve intent):** “The body below is final. Keep facts and numbers; only split into cards and headings—do not rewrite sentences.”

### 2.2 Audience, tone, length, language `textOptions`

Fields under `textOptions` are documented in the API reference; **`amount` / `tone` / `audience` behave as documented when `textMode` is `generate`** (and for length when `condense`). If you’re in “don’t change my words” mode, don’t expect tone fields to rewrite everything.

| Field | Role | Hints | Example |
| --- | --- | --- | --- |
| `audience` | Who will view it; affects depth and examples | Short phrase, ~500 chars max | “VP-level product leads at SaaS companies; care about ROI and rollout risk” |
| `tone` | Voice and style | Short phrase, ~500 chars max | “Professional, restrained, no hype. Avoid marketing slogans.” |
| `amount` | How much text per card | `brief` / `medium` / `detailed` / `extensive` | Use `brief` for tight time slots; `detailed` for training |
| `language` | **Output language** (can differ from input) | ISO codes; see [Output language](https://developers.gamma.app/reference/output-language-accepted-values) | `en` for English; `zh` for Chinese output |

**Combined example (paste into an “advanced” or free-text field):**

- “Audience: division GM. Tone: lead with conclusions, short sentences. Amount: max 5 bullets per card. Language: English.”

### 2.3 Card count and splits `numCards`, `cardSplit`

| Field | Meaning | Practical tips |
| --- | --- | --- |
| `numCards` | Target number of cards (when `cardSplit` is `auto`) | Docs often cite **1–60** cards on common plans and **up to 75** on Ultra (confirm in current docs and your account). Set a cap early to avoid huge decks. |
| `cardSplit` | `auto`: split to hit `numCards`; `inputTextBreaks`: split on your separators | Use a **`---` line on its own** in the text (`\n---\n` in API terms) to **force breaks**; with “respect breaks,” `numCards` may be ignored. |

**Example split when pasting long text:**

```text
## Background
…
---
## Options
…
---
## Recommendation
…
```

### 2.4 Output type and aspect ratio `format`, `cardOptions.dimensions`

| `format` | Output | When to use |
| --- | --- | --- |
| `presentation` | Slide/card deck | **Default for PowerPoint-style work** |
| `document` | Document layout | Reading-heavy, less “slide-by-slide” |
| `webpage` | Web page | Site or landing page |
| `social` | Social layouts | Square, vertical, etc. |

For `presentation`, `cardOptions.dimensions` is often **`16x9`** (standard projectors), **`4x3`**, or **`fluid`** (content-driven height). For typical conference rooms, **16:9** is a safe default.

### 2.5 Theme `themeId` / **Theme** in the UI

Themes control colors, fonts, and overall look. The API uses `themeId`; you pick **Theme** in the editor. If your team has a brand theme, **pick it before generation**—cheaper than re-theming a finished deck.

### 2.6 Image source `imageOptions` (maps to no images / placeholders / stock / AI art)

Gamma uses `imageOptions.source` and related fields; the UI usually lines up like this (**confirm labels in your build**):

| Strategy | Typical meaning | When to use |
| --- | --- | --- |
| No images / `noImages` | Text only, or **only URLs you embed in the text** | Data-heavy, compliance-sensitive, or when assets are fixed |
| Placeholders / `placeholder` | Reserve space for images you add later | Lock structure first, visuals second |
| AI generation / `aiGenerated` | Model-generated images; add **`style`** or **`stylePreset`** (photo, illustration, 3D, etc.) | External-facing decks when you want a consistent look |
| Stock / `pexels`, `giphy`, etc. | Photos or GIFs from stock | Realistic photos or light motion |
| Commercial-use web / `webFreeToUseCommercially` etc. | License-aware imagery | Sales decks |

**Style example (AI images):** `minimal, high contrast, no text in images` (minimal, high contrast, no text baked into images).

### 2.7 Extra instructions `additionalInstructions`

For anything that doesn’t fit other fields: layout preferences, “always end with a summary card,” tone tweaks. Official limit is roughly **5000 characters**; don’t contradict `textMode` (e.g. `condense` plus “preserve every word”).

**Examples:**

- “Cover slide: title + date only; each section starts with a bullet summary card; do not invent customer logos.”
- “Last slide: three next steps + owner placeholders.”

### 2.8 Optional: header/footer (`cardOptions.headerFooter`), sharing (`sharingOptions`)

- **`cardOptions.headerFooter`**: logos, page numbers, copyright—API exposes precise control; use the UI if offered.
- **`sharingOptions`**: workspace vs external access, email shares—useful for review workflows.

### 2.9 Browser vs API

The REST API requires an API key; documentation ties **API access** to paid plans such as **Pro / Ultra / Teams / Business**. You can create and export entirely in the **browser** without the API; **the same parameters** still help you write better prompts in Advanced Mode.

---

## 3) Path 1: Create from text (Generate / Paste / Import)

Click **Create New AI** and choose the mode that matches how much you already have.

### 3.1 Generate: topic only, get a first draft you can reshape

**Best for:** fast drafts, rough brainstorming.  
**Poor fit:** you already have a strict outline and data model—don’t expect a single vague prompt to nail it.

**Steps:**

1. In the topic box, include **audience + setting + goal + card cap** (maps to `audience` / `tone` / `numCards` in section 2).
2. In **Advanced Mode**, add `tone`, `amount`, **Don’t add images** / **Image placeholders** (i.e. `imageOptions`), and aspect ratio (`dimensions`) if you see it.
3. After the first pass, **reorder cards and fix titles** before line-editing copy.

### 3.2 Paste: you already have prose—let Gamma split and layout

**Best for:** notes, specs, transcripts, model drafts.  
**Risk:** long “background” sections become too many slides.

**Before you paste:**

- Add 3–5 lines at the top: **what the deck must argue**, what to drop, and which numbers are off-limits.
- Shrink long background to **one card** or mark “appendix—do not split into its own section.”
- Use **`---` split markers** where you need hard breaks (see §2.3).
- Normalize **terms, product names, units**; put any must-quote lines in quotes at the top.

### 3.3 Import: PowerPoint, docs, URLs—ingest, then edit

**Best for:** deck refreshes, turning long pages into a deck.  
**Note:** Layout re-applies under Gamma’s theme; **don’t expect a pixel-perfect PPTX import**.

**Flow:** after import, scan whether **card titles match your chapter logic** → merge/delete cards → use Agent for local copy tweaks.

---

## 4) Path 2: Reuse a template shell (Workspace Templates, Remix, duplicate)

“Template” here means **whole gamma as a shell**; per-card layouts are in section 5.

### 4.1 Workspace Templates (**Templates** in the sidebar)

**Use for:** recurring structures—monthly metrics, sales proposals, QBRs, lesson skeletons.  
**Short path:**

- **Templates** → **+ Add a gamma** → pick a gamma → **Create template** → name → **Save copy as template**; or use **⋯** on the dashboard or editor to save as template.
- To start: **+ New Gamma** / **+ Create New** and **remix** a template; **+ New Gamma** also supports **duplicate** (no AI—clone and edit by hand).

This path **locks layout and section habits**; you still spell out swaps in the Remix prompt.  
**Paid:** Workspace Templates are documented for **Pro / Ultra / Team / Business**; if you don’t see **Templates**, that’s often a plan limitation.

### 4.2 Remix (**⋯ → Create from this (remix)**)

**Use for:** same storyline, different client, quarter, or audience.  
**You can combine in the prompt** (same idea as §2 `audience` / `tone` / `additionalInstructions`):

1. **Replace rules**: e.g. “Swap cards 2–4 for this week’s numbers; keep the first page and final CTA.”
2. **New material**: outline bullets; or paste **CSV** for table-style updates per Gamma docs.
3. **Constraints**: page cap, cards you must not touch, compliance lines.
4. **Images**: drag images in and say “use this only on the cover.”

**Cost:** Remix uses **credits**; test one card before batch runs.  
**Originals:** Remix creates a new gamma; it does not overwrite the source.

### 4.3 When to fall back to Path 1

- If the new story **doesn’t fit the old shell**, **Paste / Import** is often faster than forcing a template.
- If you don’t need reusable layout, **Generate / Paste** is the shorter route.

---

## 5) Card-level layouts (what one slide looks like)

Inside an existing gamma, use **sparkle** and related dropdowns to add cards and pick layout styles (names vary by release). This shapes **single-card design**—it doesn’t replace the narrative brief in section 1.

---

## 6) Editing pass: a fixed order

1. **Reorder** for a clear arc: problem → approach → proof → next steps (or your meeting rhythm).  
2. **One idea per card**; push detail to the next card or speaker notes.  
3. **Fact pass**: numbers, names, dates.  
4. **Then Agent**: per-card **sparkle** or top **Agent** (multi-card batch may vary by plan); say **what to change** and **what must not change**.

Use **/** for blocks and **Insert** for media—evidence, not a substitute for outline.

---

## 7) Export PPTX / PDF: validate in Present Mode

**Share → Export** or **⋯ → Export**; **PDF / PNG / PowerPoint (PPTX)**. Export matches **Present Mode** (not every edit-mode pixel); run through Present Mode before you call it final.

**Watermark:** free exports may show **Made with Gamma**; paid plans usually remove it—confirm per subscription.

**If export fails:** network issues; very long gammas (split and merge); oversized images (compress or replace).

---

## References

- [FamilyPro: Gamma product page](https://familypro.io/en/products/gamma?invite=YK868462)
- [How do I create a new presentation, document, or webpage in Gamma?](https://help.gamma.app/en/articles/7838093-how-do-i-create-a-new-presentation-document-or-webpage-in-gamma) (Generate / Paste / Import)
- [Generate from text (API parameter reference, maps to Advanced options)](https://developers.gamma.app/guides/generate-api-parameters-explained)
- [Output language accepted values (`language` codes)](https://developers.gamma.app/reference/output-language-accepted-values)
- [What is Remix and how do I use it?](https://help.gamma.app/en/articles/12601672-what-is-remix-and-how-do-i-use-it)
- [How do I use Workspace Templates?](https://help.gamma.app/en/articles/12590858-how-do-i-use-workspace-templates)
- [Where do I start when adding content in Gamma?](https://help.gamma.app/en/articles/11016385-where-do-i-start-when-adding-content-in-gamma)
- [What’s the easiest way to export my Gamma?](https://help.gamma.app/en/articles/8022861-what-s-the-easiest-way-to-export-my-gamma)
