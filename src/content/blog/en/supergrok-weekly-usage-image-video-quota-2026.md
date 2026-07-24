---
locale: en
translationKey: supergrok-weekly-usage-image-video-quota-2026
title: "SuperGrok Weekly Limits: How Many Images and Videos?"
headline: "How Much Can SuperGrok's Weekly Usage Actually Produce?"
description: "Estimate how many Speed and Quality images, 480p videos, and 720p videos SuperGrok can make per week, with mixed-use budgets and quota-saving tips."
summary: "SuperGrok is not a fixed-count plan. This guide uses changes in the Usage percentage to estimate per-task costs and build a realistic weekly image and video budget."
category: Grok
coverImage: /blog-covers/supergrok-weekly-usage-image-video-quota-2026.webp
pubDate: 2026-07-24
updatedDate: 2026-07-24
author: Huge
service: General
tags:
  - SuperGrok
  - Weekly Usage
  - Grok Imagine
  - Video generation
  - Image generation
draft: false
---

After SuperGrok replaced several daily limits with a shared seven-day allowance, the “36% used” figure on the Usage page raised a more practical question: what can the full 100% actually produce in one week?

xAI does not publish a fixed conversion table showing the cost of one image or one video. The estimates below combine the official rules, before-and-after Usage observations, and simple calculations. They are useful for weekly planning, but they are not an official guarantee.

> Data checked: 2026-07-24  
> Note: Weekly Usage can vary by task type, compute demand, subscription tier, and backend policy. Treat every figure below as a planning estimate, and rely on the live consumption and reset time shown under Settings → Usage for your own account.

## The short answer: what can one week produce?

If the entire weekly allowance is spent on one task type, the more consistent observations currently suggest:

| Use case | Estimated cost per generation | Weekly planning range |
| --- | --- | --- |
| Speed images | About 0.125% | About 700-800 images |
| Quality images | About 0.25% | About 350-400 images |
| 480p, 10-second videos | About 1.27% | About 70-80 videos |
| 720p, 10-second videos | About 2% | About 45-50 videos |

Most creative workflows mix several formats. A more realistic heavy-use weekly budget would be:

- About 100 Quality images
- About 20 480p, 10-second videos
- About 10 720p, 10-second videos
- Roughly 30% left for chat, prompt revisions, reruns, failed jobs, and unexpected requests

That mix covers style exploration, low-resolution testing, and final high-resolution output. It is more useful than planning around a theoretical maximum.

## How SuperGrok's shared seven-day allowance works

According to xAI's official FAQ, paid Grok users now draw from one shared Weekly Usage pool. Chat, Imagine, Voice, Build, and other products no longer operate as entirely separate daily counters; they all use the same weekly allowance.

The Usage page may look like this:

```text
Weekly Usage
Used: 36%
Imagine: 29%
Chat: 5%
Other: 2%
Remaining: 64%
```

One action does not always cost the same as another. A standard chat needs relatively little compute, while a high-quality video or a long coding job consumes more. The pool resets weekly at the time shown under Settings → Usage, where consumption is also broken down by product.

The useful question, then, is not “How many generations does xAI allow?” but “What percentage of the weekly pool does one job at this exact specification consume?”

## How to estimate generation counts from Usage

Try to control the variables when testing: use the same account, generate the same mode, resolution, and duration within a short period, and record Usage before and after.

The calculation is straightforward:

`Cost per job = Usage increase ÷ completed jobs`

`Theoretical weekly count = 100 ÷ cost per job`

For example, one recent user-side observation covered 15 completed 480p, 10-second videos and a Usage increase from 0% to 19%:

`19% ÷ 15 ≈ 1.27%`

`100% ÷ 1.27% ≈ 79`

The theoretical result is about 79 videos. Once percentage rounding, policy changes, failed generations, and use of other features are considered, budgeting for 70-80 is safer.

This approach is more useful than a claim that one person made a certain number of videos in a week, because it removes many unknowns around chat use, quality settings, and mixed tasks. It is still an observation from a particular account and time, not a permanent exchange rate.

## Video is where the allowance goes fastest

Video requires the most planning. A small number of high-resolution tests can use a visible portion of the weekly pool.

### 480p, 10 seconds: budget for 70-80 videos

One of the more useful recent observations is 19% consumed by 15 videos, or about 1.27% each. If the entire pool went to this specification, the theoretical total would be about 79.

Other batches have shown both lower and higher unit costs, which suggests that the backend is not enforcing a permanent fixed-count table. Do not treat an occasional peak result as dependable capacity. Planning for 70-80 videos is more conservative, or about 10-11 per day.

480p works well for testing movement, camera direction, and prompt structure. Use it to reject obvious misses before deciding which concepts deserve a high-resolution generation.

### 720p, 10 seconds: budget for 45-50 videos

A common recent observation is that one 720p, 10-second video consumes about 2% of Weekly Usage. That implies a theoretical maximum of about 50 for the week. After allowing for variation and other tasks, 45-50 is a more practical budget, or roughly 6-7 per day.

If each usable final takes three attempts on average, 45-50 generations yield about 15-17 finished clips. When some prompts succeed on the first try, the usable total may approach 20. This is a better measure of production capacity than simply saying that the plan can run 50 generations.

There is another limit to watch. xAI's official FAQ says that once an account reaches the 720p allowance for its subscription tier, subsequent videos fall back to 480p. In other words, unused Weekly Usage does not necessarily mean that the same number of additional 720p videos remains available.

## Image capacity is much more generous

Images put far less pressure on the weekly pool than videos.

### Speed images: about 700-800 per week

Using an observed rate of roughly eight Speed images per 1% of Usage, one image costs about 0.125%, for a theoretical weekly total of around 800. Allowing room for backend variation makes 700-800 a more useful planning range.

That is more than 100 images per day on average. Unless you are running large batches of experiments, most individual creators are unlikely to exhaust it.

### Quality images: about 350-400 per week

At roughly four Quality images per 1%, one image costs about 0.25%, giving a theoretical weekly total of around 400. After allowing for variation, plan for 350-400, or about 50 per day.

If one usable result requires four candidate images, 400 generations can produce roughly 100 selected sets in a week. That is usually enough for social posts, concept art, and video first-frame exploration.

### Do not convert API prices into web-app Usage

xAI's API pricing page lists a Quality image at $0.05 for 1K output and $0.07 for 2K output. That difference reflects API-side resource and commercial pricing, but it cannot be used to calculate SuperGrok's web-app Weekly Usage.

The API is billed per call, while SuperGrok uses a shared resource pool within a subscription. xAI has not stated that the two systems convert at a fixed ratio. The evidence supports saying that Quality usually costs more allowance than Speed, but not assigning precise web-app percentages to 1K and 2K.

The same applies to per-second API prices for 480p and 720p video. They help confirm that higher resolution needs more resources, but they are not a Weekly Usage conversion table.

## A realistic mixed-use weekly plan

Consider a week that includes both images and videos:

| Task | Quantity | Estimated Usage |
| --- | --- | --- |
| Quality images | 100 | About 25% |
| 480p, 10-second videos | 20 | About 25.4% |
| 720p, 10-second videos | 10 | About 20% |
| Total | — | About 70.4% |

The remaining 29.6% can cover prompt discussions, image reruns, failed videos, moderation blocks, and urgent work. Avoid scheduling exactly 100%: the interface rounds percentages, and whether a failed task is charged may change with product policy.

If video is your main use case:

- A test-heavy workflow centered on 480p allows about 70-80 attempts per week.
- A final-output workflow centered on 720p allows about 45-50 attempts per week.
- At three attempts per finished clip, expect about 15-17 satisfactory 720p results.

If images are your main use case:

- Speed mode allows about 700-800 images per week.
- Quality mode allows about 350-400 images per week.
- If every four candidates produce one usable set, Quality mode yields about 90-100 selected sets.

## A workflow that saves Weekly Usage

The most effective strategy is not to create less. It is to reserve the expensive generations for the end:

1. Use images to confirm the subject, composition, lighting, and overall style.
2. Test movement, camera work, and prompts with 480p video.
3. Generate the 720p final only after the direction is settled.
4. Change one category of variable at a time so you can identify what improved the result.
5. Keep at least 20%-30% of the weekly pool in reserve instead of filling the first day with high-resolution jobs.

At about 2% each, five 720p videos consume roughly 10%, while ten consume about 20%. Testing every early prompt directly at high resolution can burn through a large share of the weekly allowance in a single day.

## Run a small test on your own account

Because Weekly Usage has no public fixed conversion rate, the best measurement is the one from your account:

1. Wait for the weekly pool to reset and record the starting Usage.
2. Generate 10-20 items with exactly the same specification.
3. Record the ending Usage.
4. Divide the Usage increase by completed jobs to find the current cost per job.
5. Divide 100 by that cost for a theoretical weekly count, then reserve a 20%-30% buffer.

For example, if 20 matching videos consume 25%, each one costs 1.25% and the theoretical weekly total is about 80. If the same test produces a clearly different result the following week, update your budget with the newer observation.

## Final verdict

SuperGrok's image capacity is relatively generous; video is the part that needs deliberate planning. For a budget based on observations checked on 2026-07-24, remember these ranges:

- About 700-800 Speed images or 350-400 Quality images.
- About 70-80 480p, 10-second videos.
- About 45-50 720p, 10-second videos, with the possibility of hitting a separate 720p limit first.

These figures are not about finding the absolute maximum. They help fit testing, rework, and final output into the same seven-day cycle. Before subscribing, you can also check the [FamilyPro Grok plan](https://familypro.io/en/products/grok?invite=YK868462) for the current term, delivery method, and plan details.

## References

- [FamilyPro Grok plan](https://familypro.io/en/products/grok?invite=YK868462)
- [FamilyPro Grok Imagine](https://familypro.io/en/grok-imagine?invite=YK868462)
- [xAI: Grok website and app FAQ](https://docs.x.ai/grok/faq)
- [xAI: Grok overview and shared weekly limits](https://docs.x.ai/grok/overview)
- [xAI: Imagine API pricing](https://docs.x.ai/developers/pricing)
- [xAI: Video generation specifications and limits](https://docs.x.ai/developers/model-capabilities/video/generation)
