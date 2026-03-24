# AGENT.md

## 1) Mission
你是本仓库（Astro 多语言内容站）的执行型工程 agent。目标是：
- 在不破坏路由、SEO、部署的前提下完成内容与页面迭代。
- 优先保证可构建、可部署、可抓取、可索引。

## 2) Repo Truth Sources
改动前先对齐以下文件：
- 内容 schema：`src/content.config.ts`
- 内容目录（主事实源）：`src/content/blog/**`
- 语种与 SEO 辅助函数：`src/lib/i18n.ts`
- 已知语种文案（可选扩展）：`src/lib/i18n/registry.ts`、`src/lib/i18n/locales/**`
- 页面模板层：`src/pages/**`、`src/layouts/**`、`src/components/SEO.astro`
- 部署配置：`astro.config.mjs`、`.github/workflows/deploy.yml`
- 项目说明：`README.md`

## 3) Global Constraints
- Node 版本必须满足 `>=22.12.0`。
- 不修改构建产物或缓存目录：`dist/`、`.astro/`。
- 不破坏既有路由形态：`/{lang}/`、`/{lang}/blog/`、`/{lang}/blog/{slug}/`。
- 不硬编码 GitHub Pages repo 路径，遵循 `GITHUB_REPOSITORY` 推导。
- frontmatter 必须符合 `blog` collection schema。
- 渲染模式必须保持“服务端输出 HTML”（当前为 Astro 静态预渲染，build-time SSR）。禁止把核心内容改成纯客户端渲染。

## 4) Content-First Policy (Important)
- 默认策略：新增文章或新增语种翻译时，只改 `src/content/blog/**`。
- `src/pages/**` 与 `src/lib/i18n/locales/**` 视为模板/框架层，非必要不改。
- 仅在以下情况允许改模板层：站点级 SEO 规则升级。
- 仅在以下情况允许改模板层：全站信息架构/布局变更。
- 仅在以下情况允许改模板层：schema 或渲染机制发生结构性调整。
- 禁止为单篇文章或单语种做 page 级 hardcode。

## 5) Content Constraints
- `locale` 必须与目录一致（如 `src/content/blog/zh/**` -> `locale: zh`）。
- `locale` 使用小写字母/数字与可选连字符（如 `en`、`zh`、`ja`、`pt-br`）。
- 同一篇跨语言内容必须共用 `translationKey`。
- 公开文章必须 `draft: false`。
- 日期字段必须明确：`pubDate`；更新事实信息时同步 `updatedDate`。
- 涉及价格/汇率的内容必须标注“数据日期 + 仅供参考”。
- `service` 仅允许 schema 白名单值。
- 新增语种时，若不改 `locales/registry`，系统会使用默认 UI 文案兜底；这是允许的。

## 6) SEO Baseline (Must Pass)
### 6.1 TDK
- 每个可索引 URL 必须有唯一 `title` 和 `description`。
- `title` 长度建议：
  - 中文页：20-32 个汉字（硬上限 40 汉字）。
  - 英文/日文页：45-65 个字符（硬上限 70 字符）。
- `description` 长度建议：
  - 中文页：60-90 个汉字（硬上限 110 汉字）。
  - 英文/日文页：120-160 个字符（硬上限 180 字符）。
- 不使用 `meta keywords` 作为优化手段。

### 6.2 Canonical, URL, Indexing
- 每个可索引页必须有且仅有 1 个 canonical，且为绝对 URL。
- canonical 必须自指向当前语言页面，不允许跨语言互指。
- URL/slugs 使用小写和连字符，保持尾斜杠策略一致。
- 正式页面默认 `index,follow`，`noindex,nofollow` 仅用于明确不收录页面。

### 6.3 Hreflang / 多语言
- 首页/列表页：`hreflang` 基于“所有已发布内容中的语种集合”生成，并包含 `x-default`。
- 文章页：`hreflang` 基于“同一 `translationKey` 的可用翻译语种”生成，并包含 `x-default`。
- 已知语种使用 registry 的 localeCode（如 `zh-CN`、`en`、`ja`）；未知语种使用其 `locale` 原值。
- `html lang` 与页面语言一致。

### 6.4 Open Graph / Twitter
- 必填：`og:title`、`og:description`、`og:url`、`og:type`、`og:image`、`og:locale`。
- 必填：`twitter:card`、`twitter:title`、`twitter:description`、`twitter:image`。
- `og:url` 必须与 canonical 一致。
- `og:image` 必须是可公网访问的绝对 URL，建议 1200x630（1.91:1）。
- 文章详情页 `og:type=article`；首页/列表页 `og:type=website`。

### 6.5 Structured Data
- 首页/列表页保持 `WebSite` JSON-LD。
- 文章页保持 `Article` JSON-LD，至少包含：
  - `headline`、`description`、`datePublished`、`dateModified`
  - `inLanguage`、`author`、`mainEntityOfPage`
- 日期必须是合法 ISO-8601 字符串，且与 frontmatter 一致。

### 6.6 On-page 基础
- 每页仅一个 `h1`，且与页面主题一致。
- 标题层级按 `h1 -> h2 -> h3` 合理递进，不跳级滥用。
- 非装饰性图片必须有可读 `alt` 文本。
- 内链锚文本必须有语义，避免“点此查看”这类弱锚文本。

### 6.7 Technical 基础
- `robots.txt` 必须可访问。
- sitemap（`sitemap-index.xml`）必须在构建产物中可访问。
- 不引入明显死链（内部链接 404）。

## 7) SEO Preflight Checklist
提交前至少抽查：首页、一个文章列表页、一个文章详情页（含非默认语言至少 1 页）。
1. 检查 `title` / `description` 是否存在、唯一、长度在建议范围内。
2. 检查 canonical 是否唯一、绝对 URL、且自指向。
3. 检查 `hreflang` + `x-default` 是否完整。
4. 检查 OG/Twitter 是否完整，`og:url` 是否等于 canonical。
5. 检查文章页 `og:type=article` 与 Article JSON-LD 字段完整性。
6. 检查是否误用 `noindex`。
7. 检查单页 `h1` 数量、标题层级、图片 `alt`。
8. 检查 `robots.txt`、`sitemap-index.xml`、关键内链可访问。

## 8) Execution Workflow
1. 阅读受影响文件，确认约束。
2. 优先采用 content-only 方案；仅在必要时改模板层。
3. 做最小必要改动，避免无关重构。
4. 本地验证：`npm run build`。
5. 若改了页面渲染/样式：`npm run preview` 并人工抽查关键页面。
6. 若改了 SEO 逻辑：检查页面源码中的 meta/link/json-ld 输出。
7. 输出变更摘要、验证结果、剩余风险。

## 9) Done Definition
仅当以下全部满足才算完成：
- 构建通过（`npm run build`）。
- schema 与 i18n 规则满足。
- SEO Preflight Checklist 通过且无明显回归。
- 最终汇报包含：修改文件、变更原因、验证步骤、剩余风险。

## 10) Forbidden Actions
- 不提交密钥或修改 `.env` 真实凭据。
- 不引入任务无关的大规模格式化。
- 不在无必要时改动部署工作流。
- 不擅自变更默认语言或 URL 策略。
- 不为单语种新增去修改 `src/pages/**` 路由模板（除非属于全站级规则变更）。

## 11) Response Contract
agent 最终回复使用固定结构：
1. 结果结论（1-2 句）
2. 修改文件清单
3. 验证命令与结果
4. 风险/后续建议（如有）
