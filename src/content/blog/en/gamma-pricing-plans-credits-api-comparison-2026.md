---
locale: en
translationKey: gamma-pricing-plans-credits-api-comparison-2026
title: "Gamma Plans & Credits: Plus, Pro, Ultra, Usage and Buying Tips"
headline: "Gamma tiers, monthly credits, and how to estimate cost per deck"
description: "Gamma tiers: monthly credits, in-app vs API deductions, deck estimates, shared logins and API wrappers, buying tips—Help Center and developer docs."
summary: "Start with monthly credits and feature limits, then estimate usage using in-app rates or API responses. The end sections spell out who shared accounts and per-use API wrappers suit—and when to buy which tier."
category: AI Tools
pubDate: 2026-04-02
updatedDate: 2026-04-02
author: Huge
service: General
tags:
  - Gamma
  - pricing
  - credits
  - API
  - buying guide
draft: false
---

When you subscribe to Gamma, **monthly credits**, **rough cost per deck**, and **whether to use the API or a third-party per-run service** shape total cost and how your team works. This article follows Gamma’s Help Center and developer docs. **Dollar prices and add-on rates include a data date; checkout always wins.**

> Data date: 2026-04-02  
> Note: Plan names, credit amounts, billing rules, and USD prices can change by region, tax, promotions, and product updates. The tables follow Gamma’s public docs. **If any figure disagrees with [Gamma Pricing](https://gamma.app/pricing), use the live checkout page.**

## 1) Plans: monthly credits and key differences (official)

Gamma’s upgrade guide lists **monthly AI credits** for paid tiers (refilled each billing cycle; annual billing usually discounts the **price**, not the **monthly credit grant**). Figures below are what the docs state today:

| Plan | Monthly credits (official) | Creation-related highlights people compare |
| --- | --- | --- |
| **Free** | **400** one-time for new users (**no monthly refresh**) | Up to **~10** AI-generated cards per run (more can be added manually); basic image models, etc. |
| **Plus** | **1,000** | Up to **~20** cards per AI generation; removes export watermark (see official matrix) |
| **Pro** | **4,000** | Up to **~50** cards per run; **API access**; broader image models, sites/analytics (see official docs) |
| **Ultra** | **20,000** | Up to **~75** cards per run; **API**; higher-end image models and higher site quotas, etc. |
| **Teams** | **6,000 / seat** | Team features on top of Pro: centralized billing, shared folders, brand themes; **minimum 2 seats** (pricing on site / team article) |
| **Business** | **10,000 / seat** | Enterprise-oriented features beyond Teams (e.g. SSO—confirm in docs); **minimum 10 seats** |

The Teams/Business article gives **USD reference pricing per seat** with minimum seats: **Team ~$240/seat·year (min 2 seats)**, **Business ~$480/seat·year (min 10 seats)**—**whether that is billed monthly, annually, or plus tax depends on your invoice.**

**Common USD monthly list prices for individuals (public pages, reference only):** Plus **~$8/mo**, Pro **~$18/mo**, Ultra **~$100/mo**—again, **confirm on [Gamma Pricing](https://gamma.app/pricing).**

### 1.1 Rollover and add-on packs (official)

- **Rollover:** Unused credits roll over up to roughly **2× your monthly grant** (Help Center uses Plus **1,000/mo** → balance cap about **2,000**; same 2× idea applies to other tiers—verify in your account).
- **Add-ons:** Paid users can buy packs; a common list price is **1,500 credits for $6**—see [purchase credits](https://help.gamma.app/en/articles/12466653-how-do-i-purchase-more-credits) and your billing page.
- **Free:** When credits are gone they do not refresh; referrals and other programs may add more (see Help Center).

## 2) Two credit models—don’t mix them up

Gamma documents **two explanations**: one for **in-app AI actions**, one for **async API generation**. Both use **credits**, but you **cannot** map “40 credits per create in the UI” directly onto “1–3 credits per card via API” without context—they measure different flows.

### 2.1 In-app (Help Center rates)

From “How do credits work in Gamma” (rates **may change**):

| Action | Credits (as documented) |
| --- | --- |
| **Create with AI** | **40 credits / gamma** |
| **Add card with AI** | **5 credits / card** |
| **Chat with AI** | **10 credits / helpful suggestion** (errors/clarifications not charged) |
| **AI image prompt** | **10 credits / prompt** |
| **Continue with AI** (e.g. `/continue`, `+++`) | **2 credits / use** |
| **API** | See developer docs and billing |

**Rough deck math (UI):**

- **One “Create with AI” pass, no further AI-added cards:** budget **~40 credits** per gamma (plus any other AI steps in the same flow).
- **After create, you AI-add *k* extra cards:** add about **5k** on top of 40, plus chat/images/continue as needed.

**Actual deductions** follow your balance; models and features evolve.

### 2.2 API / async generation (developer docs)

The API is credit-based. When a job completes, **`GET /v1.0/generations/{generationId}`** returns **`credits.deducted`** and **`credits.remaining`**—treat **`credits.deducted`** as the source of truth.

Documented **ranges** (internal model selection affects exact cost):

- **Text cards:** about **1–3 credits per card**.
- **Images:** depends on `imageOptions.model`; docs cite bands such as **~2–15** (standard), **~20–33** (advanced), **~34–75** (premium), **~30–125** (ultra-class models)—all as **ranges**, not fixed prices.
- **Template generations** (`POST /generations/from-template`) may cost **slightly more** per card than standard runs.

**Illustrative scenario (not a guarantee):** ~**10 cards + 5 basic images** might land around **~20–60 credits** total; more cards or premium images scale up.

**For internal ROI:** average **`credits.deducted`** from real API calls—don’t rely only on the UI “40 per create” figure for API work.

## 3) Translating “one deck” into credits

Practical estimators (not a contract):

| Scenario | How to estimate |
| --- | --- |
| **Web only, one AI create pass** | Start from **40 credits**; add **5 × (AI-added cards)**; add chat/image/continue per §2.1. |
| **API batch jobs** | Use doc ranges for a **band estimate**, then calibrate with **`credits.deducted`**; heavy images or premium models → use the high end. |
| **Remix / templates** | Remix uses credits (Help Center); template API may cost more—read the response payload. |

**Sanity check (UI):** **25** new gammas/month with only “Create with AI” and **no** extra AI cards ≈ **25 × 40 = 1,000 credits**, roughly a **Plus** monthly grant—upgrade or add packs if you go over. (Real usage usually includes edits, cards, and images.)

## 4) Shared logins vs paid seats: product reality

Help Center stresses **credits are per user**, not one shared pool for the whole team; **auto-recharge** in multi-seat workspaces can also **charge per member** who drops below a threshold.

**Sharing one paid login (instead of buying seats)** usually means: weaker per-person boundaries, harder to tell who exported or edited what, and you must agree who owns renewals and add-ons. Whether sharing is allowed is defined in the latest [Gamma Terms](https://gamma.app/terms); organizations with audit needs typically prefer **formal multi-seat** or enterprise procurement.

**When short-term sharing is understandable:** very small groups, light usage, tight budget, but you need one account to align templates and style—still plan **password/device hygiene**, **who pays**, and **when to move to per-user accounts** so client work is not tied to one login forever.

**Teams/Business:** higher minimum seats and price, but you get **per-user credits, admin tooling, brand themes, and collaboration** suited to stable teams.

## 5) Per-use tools built on the Gamma API: what they add, what to verify

**Typical pattern:** a wrapper or automation on top of the **Gamma API**, billed to the business per generation, per card, or per project.

**Where they often save time:**

- One integrated path for async jobs, polling, and exports—less custom glue code.
- Non-technical stakeholders may see a **fixed unit price or ticket**, which helps internal chargeback (depends on the vendor).

**Things worth checking** (normal engineering hygiene—not a verdict that wrappers are “bad”):

- The stack still spends **Gamma credits**; API access generally needs a tier with API rights (**Pro / Ultra / Teams / Business** per developer docs). Add **vendor fee + subscription** for a full cost picture.
- **Data path:** whether text/images pass through or are stored by a third party—pick tooling that matches your data policy.
- **Metering:** reconcile with Gamma’s **`credits.deducted`** and invoices so “cost per run” matches reality.

**Good fit:** orgs with CRM/internal systems who want deck generation inside a workflow, project-based teams who need a **simple unit price** for business users, or anyone who doesn’t want to own polling/export plumbing. **Teams with low volume and strong engineers** can also call the **official API** directly—no middleware required.

## 6) Buying guidance (including shared accounts and API tools)

**By usage first**

- **Occasional external decks:** start on **Free/Plus** and watch how often you trigger create/add-card/images; if you keep hitting the cap, move to **Pro** (more credits, higher card limits, **API** if you automate).
- **Weekly output + brand + collaboration:** compare **Teams/Business** vs multiple individual **Pro** seats; watch **minimum seats** and **credits per seat**.
- **Heavy automation from systems:** **Pro+ and API**, budget with **`credits.deducted`**; **Ultra** for large decks, premium imagery, or bigger monthly pools.

**Shared accounts—better / less good fits**

- **Better fit:** tiny teams piloting templates on a tight budget—plan **when** to switch to per-user accounts so long-term client work is not stuck on one login.
- **Less good fit:** larger groups, many clients, or audit-heavy orgs—use **Teams/Business** or explicit one-user-one-license procurement.

**Gamma API / per-use wrappers—better fits**

- **Better fit:** embedding generation in existing systems, per-run or ticket-based internal billing, or avoiding building poll/export yourself.
- **Better fit for direct API:** low volume, in-house devs, shortest path, full control of data flow.

---

## References

- [FamilyPro: Gamma product page](https://familypro.io/en/products/gamma)
- [FamilyPro: Gamma AI](https://familypro.io/en/gamma-ai)
- [Gamma Pricing](https://gamma.app/pricing)
- [How do credits work in Gamma?](https://help.gamma.app/en/articles/7834324-how-do-credits-work-in-gamma)
- [Upgrading your Gamma subscription](https://help.gamma.app/en/articles/8077107-upgrading-to-gamma-plus-or-pro-a-quick-guide)
- [How do I purchase more credits?](https://help.gamma.app/en/articles/12466653-how-do-i-purchase-more-credits)
- [What options does Gamma offer for teams and business?](https://help.gamma.app/en/articles/11594955-what-options-does-gamma-offer-for-teams-and-business)
- [Review access and pricing (API and credits)](https://developers.gamma.app/get-started/access-and-pricing)
- [Gamma Terms of Use](https://gamma.app/terms)
