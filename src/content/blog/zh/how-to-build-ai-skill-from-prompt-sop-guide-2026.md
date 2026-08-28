---
locale: zh
translationKey: how-to-build-ai-skill-from-prompt-sop-guide-2026
title: AI Skill 制作指南：把长 Prompt 变成可复用工作流程的完整方法
headline: 别再把长 Prompt 当 Skill：如何做成可复用的工作流程与标准作业程序
description: 本文用一套精简实用的流程讲清 AI Skill 的适用场景、目录结构、SKILL.md 写法、description 设计、脚本与模板分工，并给出从真实案例、触发测试到持续迭代的完整制作方法和验收清单。
summary: 从重复任务出发，把 Prompt 拆成边界、步骤、参考资料、脚本、模板和验收标准，做出真正能稳定复用的 AI Skill。
category: AI工具
coverImage: /blog-covers/how-to-build-ai-skill-from-prompt-sop-guide-2026.webp
pubDate: 2026-08-28
updatedDate: 2026-08-28
author: Huge
service: General
tags:
  - AI Skill
  - SKILL.md
  - Prompt
  - SOP
  - Codex
  - Workflow
draft: false
---

把一段 3000 字 Prompt 保存成文件，当然能减少重复输入，但它还不一定是一个好 Skill。真正有价值的 Skill，会把一类任务的**触发条件、执行顺序、参考资料、工具用法和验收标准**放在一起，让 AI 下次遇到相似任务时能稳定复用。

这篇文章不展开所有概念，而是直接回答一个更实用的问题：手里已经有一段常用 Prompt，怎样把它整理成可维护、可测试的 Skill？

> 核对日期：2026-08-28  
> 说明：不同产品对 Skill 的实现细节可能不同。本文以 OpenAI 当前公开文档中的文件式 Skill 为主要例子，同时保留适用于其他 Agent 工具的通用方法。

## 先判断：这个任务值得做成 Skill 吗？

Prompt 解决“这一次怎么做”，Skill 解决“以后这类任务按什么方法做”。一个任务同时满足以下三项时，通常值得 Skill 化：

- **反复出现**：例如 PR Review、SEO 审稿、周报、故障复盘或会议纪要。
- **流程相对稳定**：每次输入不同，但分析顺序、判断规则和交付格式相似。
- **容易漏项**：存在团队规则、固定检查点，或需要多个工具按顺序协作。

一次性解释、开放式脑暴或只有一句简单偏好的任务，通常继续使用 Prompt 更轻。若 AI 根本没有查询数据库、发送邮件或操作系统的能力，你缺的是 Tool 或连接能力，也不是多写一份 Skill。

如果还分不清这些层级，可以先看 FamilyPro 的 [Prompt、Skill、Agent、Tool 与 MCP 区别指南](/zh/blog/prompt-skill-agent-tool-mcp-differences-guide-2026/)。

## 一个 Skill 应该包含什么？

OpenAI 当前文档把 Skill 描述为一组指令和资源。最小目录只有 `SKILL.md`；复杂任务可以再加入三个可选目录：

```text
article-review/
├── SKILL.md
├── references/
├── scripts/
└── assets/
```

| 位置 | 放什么 | 判断标准 |
| --- | --- | --- |
| `SKILL.md` | 触发条件、核心步骤、边界和验收要求 | 几乎每次执行都需要 |
| `references/` | 规范、示例、业务口径和背景资料 | 只在特定分支需要查阅 |
| `scripts/` | 校验、统计、格式转换等确定性任务 | 代码执行比模型判断更稳定 |
| `assets/` | 报告模板、文档骨架或可复用素材 | 最终产物需要复制或改写 |

这套拆法的重点不是目录齐全，而是渐进加载：先用名称和 description 判断是否匹配，再读取 `SKILL.md`，最后只加载当前任务需要的资料。不要为了看起来完整而创建空目录。

## `SKILL.md` 怎么写才够用？

一个实用的 `SKILL.md` 至少要回答六个问题：什么时候用、需要什么输入、按什么顺序做、哪些事实不能猜、输出长什么样、完成前如何检查。

```markdown
---
name: technical-article-review
description: Review technical articles for factual accuracy, structure,
  readability, SEO, and publishing readiness. Use when the user asks
  to review, audit, improve, or prepare a technical article for publishing.
---

# Goal
Find issues that could reduce accuracy or publishing quality.

# Workflow
1. Identify the topic, audience, and intended outcome.
2. Check technical claims and mark anything that needs verification.
3. Review structure, readability, and SEO.
4. Prioritize findings by impact.
5. Validate the final review against the checklist.

# Output
- Overall assessment
- Critical issues
- Recommended changes
- Publishing decision
```

其中最容易被低估的是 `description`。模型通常先看到 Skill 的名称和描述，再决定是否加载完整说明。因此 description 要同时写清：

- **What**：它能完成哪类工作；
- **When**：用户表达什么意图时应该触发。

`Help with writing` 太宽，`Use when the user says “review my API”` 又太窄。更好的写法是描述用户目标和适用条件，而不是押注某个固定关键词。

## 从长 Prompt 到 Skill：7 步制作 SOP

### 1. 收集真实案例

先找 3～10 次真正做过的任务，记录输入、操作顺序、易错点和优秀输出。好的 Skill 应来自有效经验，而不是凭空想象一套复杂流程。

### 2. 写清边界、输入和输出

用一句话分别说明“负责什么”和“不负责什么”。再列出必要输入、可选输入和最终交付结构。能合理推断的信息不必强迫用户补充；会明显改变结果的缺口才需要提问。

### 3. 把人工方法改成编号流程

把“仔细分析”换成可执行动作，例如：理解目标、读取资料、验证事实、执行工具、整理结果、完成 QA。需要分支时明确写出 `if`、`when`、`before` 和 `after` 的条件。

### 4. 拆出 references、scripts 和 assets

每次都要知道的内容留在 `SKILL.md`；偶尔查阅的长规范放进 `references/`；可以确定性执行的检查交给 `scripts/`；固定报告格式直接做成 `assets/` 模板。

例如，把 [Gamma 演示文稿制作流程](/zh/blog/gamma-ppt-generation-practical-guide-2026/) Skill 化时，可以把 Brief 与生成步骤放进主说明，把品牌规范放进 references，把交付版式放进 assets，把链接或页数检查交给 script。

### 5. 定义验收标准

不要以“完成分析”收尾。明确检查：必要章节是否齐全、事实是否有来源、脚本是否通过、文件是否生成、输出是否符合模板。Skill 的稳定性很大一部分来自最后这一步。

### 6. 做触发与任务测试

准备至少 5 个应该触发和 5 个不应该触发的自然表达，检查 description 是否过宽或过窄。再用 3～5 个没参与编写的真实任务测试最终结果，而不只是确认 Skill 被加载。

### 7. 在真实使用中迭代

每次你纠正 AI 时，都问一句：这是一次性例外，还是应该进入 Skill 的新规则？把重复出现的遗漏写进流程或校验脚本，用 Git 记录变化，Skill 才会逐步变成团队的工作方法库。

## 常见错误：看起来完整，却不好用

- **一个 Skill 包办所有事情**：触发条件、输入和成功标准不同的流程应该拆开。
- **主文件堆满背景知识**：只保留执行必需信息，把长规范按需加载。
- **能校验的内容仍靠模型目测**：链接、Schema、数字和格式优先用脚本检查。
- **没有停止条件**：遇到权限不足、关键输入缺失或高风险操作时，应明确何时暂停。
- **只测试一次**：既要测“该不该触发”，也要测“结果是否真的合格”。

Prompt 本身仍然重要。像 [NanoBanana 图片 Prompt 实战指南](/zh/blog/nanobanana-image-prompt-guide-model-comparison-50-examples-2026/) 这类任务，先把单次指令写准确，再从多次成功案例里提炼稳定步骤，通常比一开始就设计庞大的 Skill 更可靠。

## 结论

一个好 Skill 不是更长的 Prompt，而是一份可执行、可验证、可维护的 SOP。最稳妥的起点不是写更多规则，而是选一个已经重复发生的任务，收集真实案例，再逐步补齐边界、流程、资源和验收标准。

如果 Skill 能清楚回答“何时调用、怎样执行、何时停止、怎样算完成”，它就已经从保存的提示词，变成了可以长期复用的能力。

## 官方参考

- [OpenAI Developers：Skills 的概念与触发方式](https://developers.openai.com/plugins/concepts/skills)
- [OpenAI Developers：Build skills 目录、description 与资源分工](https://developers.openai.com/plugins/build/skills)
- [OpenAI Learn：Save workflows as skills](https://learn.chatgpt.com/use-cases/reusable-codex-skills)
