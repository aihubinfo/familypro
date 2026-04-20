---
locale: zh
translationKey: gamma-ppt-generation-practical-guide-2026
title: 如何用 Gamma 做出符合预期的演示文稿：文本与模板两条路径
headline: 用 Gamma 把内容做成可演示、可导出 PPT 的实操步骤
description: 从「期望约束」到两条创建路径（文本新建 / 模板 Remix），并说明与官方生成逻辑一致的可配置项：听众、语气、篇幅、语言、分卡、版式比例、主题与图片来源等，附中文填写示例与导出验收。
summary: 先写清期望，再选对入口；创建阶段可对照下文参数表填写「听众、语气、页数、配图策略」等，减少生成后与预期不符的返工。
category: AI工具
pubDate: 2026-04-02
updatedDate: 2026-04-20
author: Huge
service: General
tags:
  - Gamma
  - AI演示
  - PPT
  - 提示词
  - Remix
draft: false
---

Gamma 把内容做成网页里的「卡片」演示，并可导出 **PowerPoint (PPTX)**、PDF 等。要做到**符合你心里的那份 PPT**（结构对、话能说、导出能交差），通常先满足两件事：**把期望写具体**，再**选对创建入口**。

创建入口在官方文档里可以归纳成**两条路径**（不是两套产品，是同一件事的不同起点）：

| 路径 | 典型入口 | 你手里有什么 | 更决定结果的是什么 |
| --- | --- | --- | --- |
| **从文本/材料新建** | **Create New AI** → **Generate / Paste / Import** | 一句话主题、成稿文字、或文件/链接 | 文字结构、页数与事实约束是否写清 |
| **从模板复用壳** | **Templates** 里 **Create from this**，或 **⋯ → Create from this (remix)** | 已定章节/版式的 gamma、或团队工作区模板 | 模板是否贴合叙事 + Remix 提示是否写清替换规则 |

下面按菜单写怎么做；界面以你账号为准。

> 信息核对日期：2026-04-02  
> 说明：套餐与权益会变；**工作区模板（Workspace Templates）**在官方说明中面向 Pro / Ultra / Team / Business 等档位，以结算页为准。Remix 各档可用，但会消耗 credits。

## 1) 动手前：用几句话写清「期望的演示」

在任意路径里，先把下面几条写进备忘录（后面可整段贴进主题框、粘贴文首或 Remix 提示里），能明显减少「生成出来还要推翻」：

- **听众与场景**：对内/对外、汇报/培训/路演；对方要结论、数据还是风险。
- **听完要记住的一句结论**：或希望对方做的**一个动作**（立项、试用、排期）。
- **时长与页数上限**：例如 10 分钟、12 页内；上限会直接压低废话页。
- **必须出现 / 禁止出现**：术语、合规表述、不能编造的数字类型。
- **视觉**：要不要配图；若只要干净文字，生成阶段选 **Don’t add images** 或 **Image placeholders**（见下文「图片来源」）。

## 2) 创建时可配置项：含义与填写示例（与官方生成逻辑一致）

Gamma 在开发者文档里把「生成一份 gamma」的字段写得很全（见 [Generate from text（参数说明）](https://developers.gamma.app/guides/generate-api-parameters-explained)）。网页上的 **Generate / Advanced Mode** 等与这些字段**语义一致**，只是可能合并成几个面板或分步出现。**具体控件名称以你当前界面为准**；下表用来对照「这一项在管什么」，并给出**可直接改写的中文示例**。

**说明**：若你只用网页、不用 API，同样建议按这些维度在主题框、高级选项或 `additionalInstructions` 里写清楚——和写代码传参是同一套决策。

### 2.1 文本处理模式 `textMode`（AI 怎么动你的原文）

| 取值 | 含义 | 典型用法 |
| --- | --- | --- |
| `generate` | 以你的文字为起点**扩写**成完整叙述与结构 | **Generate**：只有短主题或几行要点，需要 AI 补全 |
| `condense` | **压缩**长文以适配篇幅 | 长报告、长文章先压成演示长度 |
| `preserve` | **尽量保留原文**，仅在合理处加标题或结构 | **Paste**：口径已审定，怕 AI 改坏措辞 |

**示例（写在主题或说明里，表达 preserve 意图）**：「以下正文为已定稿，请保留事实与数字，仅做分卡与标题层级，不要改写句子。」

### 2.2 听众、语气、篇幅、语言 `textOptions`

以下项在官方文档中放在 `textOptions` 下；**仅在 `textMode` 为 `generate`（以及 `condense` 下的篇幅）时**，`amount` / `tone` / `audience` 等才按文档说明生效——若你选的是「尽量不改字」，就不要指望语气字段还能大幅改写正文。

| 字段 | 作用 | 取值或写法提示 | 中文示例 |
| --- | --- | --- | --- |
| `audience` | 听众是谁，影响举例与深浅 | 短语，约 500 字符内 | 「互联网公司产研负责人，关心 ROI 与落地风险」 |
| `tone` | 语气、风格 | 短语，约 500 字符内 | 「专业、克制、少形容词；避免营销口号」 |
| `amount` | 每张卡文字量（偏详略） | `brief` / `medium` / `detailed` / `extensive` | 汇报限时用 `brief`；培训可 `detailed` |
| `language` | **输出语言**（可与输入语言不同） | ISO 语言代码，见官方 [Output language](https://developers.gamma.app/reference/output-language-accepted-values) | `zh` 简体中文；对外稿可 `en` |

**组合示例（可整段放进「高级说明」类输入框）**：

- 「听众：事业部总经理；语气：结论先行、短句；篇幅：每张不超过 5 条要点；语言：中文。」

### 2.3 页数与分卡 `numCards`、`cardSplit`

| 字段 | 含义 | 实用提示 |
| --- | --- | --- |
| `numCards` | 目标卡片数（与 `cardSplit` 为 `auto` 时配合） | 官方文档：常见计划约 **1～60** 张，Ultra 可到 **75**（以当前文档与账号为准）。先写死上限，避免生成过长。 |
| `cardSplit` | `auto`：按 `numCards` 切分；`inputTextBreaks`：按你在正文里的分隔符切 | 在输入里用 **`---` 单独一行**（文档写作 `\n---\n`）可**强制分段**；选「按分隔符」时以分隔为准，`numCards` 可能不生效。 |

**分卡示例（粘贴长文时用）**：

```text
## 背景与问题
……
---
## 方案对比
……
---
## 建议与下一步
……
```

### 2.4 产物类型与比例 `format`、`cardOptions.dimensions`

| `format` | 产物 | 演示场景 |
| --- | --- | --- |
| `presentation` | 演示/卡片 | **默认做 PPT 等价物** |
| `document` | 文档型版面 | 偏阅读、少「翻页感」 |
| `webpage` | 网页 | 站点/落地页 |
| `social` | 社交图文 | 方形/竖版等 |

`format` 为 `presentation` 时，`cardOptions.dimensions` 常见取值：**`16x9`**（常见投影）、**`4x3`**、**`fluid`**（随内容伸缩）。做标准会议室演示可优先 **16:9**。

### 2.5 主题 `themeId` / 界面 **Theme**

主题决定配色、字体、整体观感。API 用 `themeId`；网页在编辑器 **Theme** 里选择。团队有品牌主题时，**生成前**就选好，比在成稿后全局换主题更省时间。

### 2.6 图片来源 `imageOptions`（对应「无图 / 占位 / 配图库 / AI 生图」）

官方用 `imageOptions.source` 等字段描述图片来源；网页上常见对应关系如下（**以界面文案为准**）：

| 策略 | 典型含义 | 适用 |
| --- | --- | --- |
| 不配图 / `noImages` | 纯文字，或**仅使用你在正文里贴入的图片 URL** | 数据汇报、合规敏感、已有固定素材 |
| 占位 / `placeholder` | 留出图位，事后替换 | 先定稿结构再补图 |
| AI 生成 / `aiGenerated` | 由模型配图，可再配 **风格 `style`** 或 **预设 `stylePreset`**（如偏摄影、插画、3D 等） | 对外传播、视觉要求统一 |
| 图库类 / `pexels`、`giphy` 等 | 从图库或 GIF 取素材 | 要真实感照片或轻量动效 |
| 商用许可 / `webFreeToUseCommercially` 等 | 按许可取图 | 对外销售类 Deck |

**风格示例（偏 AI 配图时）**：`minimal, high contrast, no text in images`（示意：极简、高对比、图中不要出现文字）。

### 2.7 额外说明 `additionalInstructions`

用于塞「其它字段不好归类」的要求：版式偏好、某类版式、语气微调、结尾是否要总结卡等。官方长度约 **5000 字符**；避免与 `textMode` 冲突（例如选了 `condense` 又要求「一字不改」）。

**示例**：

- 「封面一页只放标题+日期；每节开头用一张要点卡；不要虚构客户 logo。」
- 「最后一页固定为：下一步三项 + 负责人占位符。」

### 2.8 可选：页眉页脚、分享（进阶）

- **`cardOptions.headerFooter`**：在卡片的顶/底放 Logo、页码、版权等（API 可精确配置；网页若提供类似选项，按界面填）。
- **`sharingOptions`**：工作区内/外可见性、邮件分享等，适合协作定稿阶段。

### 2.9 网页用户 vs API

REST API 需要 API Key，且官方说明 **API 使用**面向 **Pro / Ultra / Teams / Business** 等计划。普通用户**只用网页**即可完成创建与导出；**理解上述参数**仍有助于你在 Advanced Mode 和提示里写对约束。

---

## 3) 路径一：从文本/材料新建（Generate / Paste / Import）

控制台点 **Create New AI**，官方提供三种模式，对应「只有主题、已有文字、还是外来文件/链接」。

### 3.1 Generate：只有主题，先要一版可改的结构

**适合**：快速第一版、主题级需求。  
**不适合**：已有严谨大纲/数据口径，却指望一句话一次到位。

**建议操作**：

1. 主题框里写：**听众 + 场景 + 目标结论 + 页数上限**（可与第 2 节 `audience` / `tone` / `numCards` 对照）。
2. **Advanced Mode** 里补：`tone`、`amount`、**Don't add images** / **Image placeholders**（对应 `imageOptions`），以及版式比例（`dimensions`）若可选。
3. 首版出来后**先调卡片顺序与标题**，再改句子。

### 3.2 Paste：已有文字，让 Gamma 分卡与排版

**适合**：纪要、需求说明、逐字稿、模型草稿。  
**风险**：背景段落太长会被当成主体多生成几页。

**粘贴前 checklist**：

- 文首 3～5 行写 **演示目标**：保留/删除哪些论点、禁止编造的数据。
- 长背景压成 **一张卡能说清**，或标「附录、勿单独成节」。
- 需要固定分卡处用 **`---` 分段**（见第 2.3 节）。
- 统一 **术语、产品名、数字单位**；必须原文照登的句子，用引号写进文首指令。

### 3.3 Import：PPT/文档/URL，吃进来再改

**适合**：旧 Deck 翻新、长文/网页转演示。  
**注意**：导入后会按 Gamma 主题重排，**不保证像素级还原原 PPT**。

**顺序**：导入完成 → 看**卡片标题是否等于你的章节逻辑** → 删并卡 → 再局部用 Agent 改措辞。

---

## 4) 路径二：从模板复用壳（工作区模板、Remix、与纯复制）

这里的「模板」指**整份 gamma 当壳**；单页版式见第 5 节。

### 4.1 Workspace Templates（左侧 **Templates** 标签）

**用途**：月报、销售提案、QBR、课程骨架等**固定结构**反复用。  
**路径摘要**：

- **Templates** → **+ Add a gamma** → 选定 gamma → **Create template** → 命名 → **Save copy as template**；也可在控制台/编辑器 **⋯** 存为模板。
- 使用：**+ New Gamma** / **+ Create New** 里 **remix** 模板；**+ New Gamma** 还可 **duplicate**（不跑 AI、整份复制后手改）。

**说明**：这条路径**锁版式与章节习惯**；新内容仍要在 Remix 提示里写清替换范围。  
**付费**：Workspace Templates 在官方说明中面向 **Pro / Ultra / Team / Business** 等；免费档若看不到 Templates，属常见限制。

### 4.2 Remix（⋯ → **Create from this (remix)**）

**用途**：任意 gamma 可当起点，**同一套路换客户/季度/受众**。  
**提示框里可直接组合**（可与第 2 节 `audience` / `tone` / `additionalInstructions` 同一套写法）：

1. **替换规则**：如「第 2～4 页换成本周数据；第 1 页与末页 CTA 不动」。
2. **新材料**：大纲段落、要点；或按官方说明贴 **CSV** 做表格式更新。
3. **约束**：页数上限、禁止改的页、必须保留的合规句。
4. **图**：拖入图片，并写「仅封面用此图」等。

**消耗**：Remix 会占 **credits**；大批量前先单页试提示。  
**原件**：不修改原文件，生成新 gamma。

### 4.3 何时优先回到路径一

- 新内容与旧壳**叙事结构不一致**：用 **Paste / Import** 往往比硬套模板少删页。
- 不需要复用版式：直接 **Generate / Paste** 更短。

---

## 5) 补充：卡片级版式（单页长什么样）

在已有 gamma 里加页时，可通过 **sparkle** 等入口让 AI 加卡，并用 **sparkle 旁下拉** 等选用不同卡片版式（以当前界面为准）。这解决**单页排版**，不替代第 1 节的叙事约束。

---

## 6) 生成后改稿：固定顺序

1. **调顺序**：问题 → 方案 → 证据 → 下一步（或你的会议逻辑）。  
2. **减密度**：每卡**一个结论**；细节下一页或备注。  
3. **扫事实**：数字、产品名、日期。  
4. **再 Agent**：卡片 **sparkle** 或顶部 **Agent**（多卡批量视套餐）；指令写清 **改什么 / 不改什么**。

用 **/** 插入块、**Insert** 拖媒体——补证据，不代替大纲。

---

## 7) 导出 PPTX / PDF：按演示模式验收

**Share → Export** 或 **⋯ → Export**；可选 **PDF / PNG / PowerPoint (PPTX)**。导出效果以 **Present Mode** 为准，定稿前用演示模式过一遍。

**水印**：免费档导出可能出现 **Made with Gamma**；付费档通常去除，以订阅为准。

**失败排查**：网络；gamma 过长可分段导出再合并；大图多图则压缩。

---

## 官方参考

- [FamilyPro：Gamma 相关产品页](https://familypro.io/en/products/gamma?invite=YK868462)
- [How do I create a new presentation, document, or webpage in Gamma?](https://help.gamma.app/en/articles/7838093-how-do-i-create-a-new-presentation-document-or-webpage-in-gamma)（Generate / Paste / Import）
- [Generate from text（API 参数说明，可与网页高级选项对照）](https://developers.gamma.app/guides/generate-api-parameters-explained)
- [Output language accepted values（`language` 可选语言代码）](https://developers.gamma.app/reference/output-language-accepted-values)
- [What is Remix and how do I use it?](https://help.gamma.app/en/articles/12601672-what-is-remix-and-how-do-i-use-it)
- [How do I use Workspace Templates?](https://help.gamma.app/en/articles/12590858-how-do-i-use-workspace-templates)
- [Where do I start when adding content in Gamma?](https://help.gamma.app/en/articles/11016385-where-do-i-start-when-adding-content-in-gamma)
- [What’s the easiest way to export my Gamma?](https://help.gamma.app/en/articles/8022861-what-s-the-easiest-way-to-export-my-gamma)
