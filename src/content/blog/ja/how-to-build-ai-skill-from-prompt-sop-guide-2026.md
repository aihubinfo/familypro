---
locale: ja
translationKey: how-to-build-ai-skill-from-prompt-sop-guide-2026
title: "AI Skillの作り方完全ガイド：長いPromptを再利用できる実務SOPに変える実践方法"
headline: "長いPromptを保存するだけではない、再利用できるAI Skillの作り方"
description: "繰り返し業務の選び方からSKILL.mdとdescriptionの設計、references・scripts・assetsの分担、トリガーテスト、完了条件、実運用での改善、チームでの継続管理まで、AI Skill作成を実務向けに解説します。"
summary: "使い回しているPromptを、境界・手順・資料・スクリプト・テンプレート・完了条件を備えたAI Skillへ整理する方法を紹介します。"
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

3,000字のPromptをファイルに保存すれば、毎回入力する手間は減ります。ただし、それだけで使いやすいSkillになるとは限りません。実用的なSkillは、繰り返す仕事の**起動条件、手順、参照情報、ツールの使い方、完了基準**を一つにまとめたものです。

ここでは、すでに何度も使っているPromptを、保守・テストできるSkillへ変える方法に絞って解説します。

> 最終確認日：2026-08-28  
> 注：Skillの実装は製品ごとに異なります。本記事はOpenAIの現行ファイル型Skillを主な例にしつつ、他のAgent環境でも使える設計原則を扱います。

## まず、その仕事をSkillにする価値があるか判断する

Promptは「今回どうするか」を伝え、Skillは「今後この種類の仕事をどう処理するか」を定めます。次の条件が三つ以上そろう仕事はSkill化に向いています。

- **繰り返し発生する**：コードレビュー、SEO記事レビュー、週次報告、障害分析、議事録など。
- **手順が安定している**：入力は変わっても、判断順序、ルール、納品形式は似ている。
- **抜け漏れが起きやすい**：社内固有の基準、固定チェック、複数ツールの連携がある。

一度きりの説明、探索的なアイデア出し、単純な好みの設定ならPromptのままで十分です。データベース照会やメール送信の権限がない場合、先に必要なのはToolや接続手段であり、Skillは権限を生み出せません。

概念の境界を詳しく確認したい場合は、FamilyProの英語版 [Prompt / Skill / Agent / Tool / MCP比較](/en/blog/prompt-skill-agent-tool-mcp-differences-guide-2026/) も参考になります。

## Skillの標準構成

OpenAIの現行ドキュメントでは、Skillは指示とリソースをまとめたフォルダです。最小構成は`SKILL.md`だけで、必要に応じて三つのディレクトリを追加します。

```text
article-review/
├── SKILL.md
├── references/
├── scripts/
└── assets/
```

| 場所 | 入れるもの | 判断基準 |
| --- | --- | --- |
| `SKILL.md` | 起動条件、主要手順、境界、完了チェック | ほぼ毎回必要 |
| `references/` | 規約、例、業務ルール、背景資料 | 特定の分岐で参照 |
| `scripts/` | 検証、計算、ファイル処理 | モデル判断よりコード実行が安定 |
| `assets/` | レポート雛形、文書構成、再利用素材 | 成果物へコピー・変換するもの |

重要なのはフォルダ数ではなく、段階的に読み込めることです。名前とdescriptionで候補を絞り、`SKILL.md`を読み、必要な資料だけ追加で使います。空フォルダを作る必要はありません。

## 実用的な`SKILL.md`の書き方

最低限、いつ使うか、入力は何か、どの順番で進めるか、何を推測してはいけないか、出力は何か、完了をどう確認するかを明示します。

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
2. Check technical claims and flag anything needing verification.
3. Review structure, readability, and SEO.
4. Prioritize findings by impact.
5. Validate the review against the checklist.

# Output
- Overall assessment
- Critical issues
- Recommended changes
- Publishing decision
```

特に重要なのが`description`です。モデルは通常、名前とdescriptionを先に見てから、全文を読むか判断します。次の二点を一緒に書きます。

- **What**：何を行うSkillか。
- **When**：どのようなユーザー目的で起動すべきか。

`Help with writing`では広すぎます。一方、特定の一文だけを起動条件にすると言い換えに反応できません。固定キーワードではなく、ユーザーの目的と適用条件を表現します。

## PromptをSkillに変える7ステップ

### 1. 実例を集める

過去に完了したタスクを3～10件集め、入力、作業順序、失敗しやすい点、良い出力を整理します。Skillは想像上の手順ではなく、実際に機能した方法から作る方が安定します。

### 2. 境界、入力、出力を決める

「担当すること」と「担当しないこと」を一文ずつ書きます。必須・任意の入力と最終成果物も定義します。低リスクな情報は合理的に補い、結果を大きく変える不足だけ質問する設計にします。

### 3. 人の作業を番号付き手順にする

「丁寧に分析する」ではなく、目的確認、資料読込、事実検証、ツール実行、成果物作成、QAのように観察できる行動へ分解します。分岐は`if`、`when`、`before`、`after`で明示します。

### 4. references、scripts、assetsへ分ける

毎回必要な指示は`SKILL.md`、時々参照する長い規約は`references/`、確定的な検査は`scripts/`、固定フォーマットは`assets/`へ移します。

例えばFamilyProの [Gamma資料作成フロー](/ja/blog/gamma-ppt-generation-practical-guide-2026/) をSkill化するなら、Briefと生成順序を本文、ブランド規約をreferences、スライド雛形をassets、リンクや枚数チェックをscriptに分けられます。

### 5. 完了基準を定義する

「分析を完了する」で終わらせず、必須セクション、出典、スクリプト結果、生成ファイル、出力形式を確認します。最後のQAが、保存したPromptと実用的なSkillを分けます。

### 6. 起動と成果をテストする

起動すべき質問を5件、起動すべきでない質問を5件用意し、descriptionの広さを確認します。その後、作成時に使っていない3～5件の実タスクで、成果物の品質まで評価します。

### 7. 実運用で改善する

AIを修正するたびに、一度限りの例外か再利用すべきルールかを判断します。繰り返す失敗は手順や検証スクリプトへ追加し、Gitで変更を管理します。

## 失敗しやすい設計

- **一つのSkillに何でも入れる**：起動条件、入力、成功基準が違うなら分割します。
- **主ファイルが知識集になる**：実行に必要な情報だけ残し、長い資料は必要時に読みます。
- **確定的な検査も目視させる**：リンク、Schema、数字、形式はscriptを優先します。
- **停止条件がない**：権限不足、重要入力の欠落、高リスク操作では止まる条件を決めます。
- **一度だけ試して完成にする**：起動だけでなく、最終成果の品質もテストします。

Promptが不要になるわけではありません。FamilyProの [NanoBanana画像Prompt実践ガイド](/ja/blog/nanobanana-image-prompt-guide-model-comparison-50-examples-2026/) のように、まず個別指示を正確にし、複数の成功例から安定した共通手順を抽出する方が堅実です。

## まとめ

良いSkillは長いPromptではなく、実行・検証・保守ができるSOPです。すでに繰り返している仕事を一つ選び、実例から境界、順序、資料、完了条件を組み立ててください。

「いつ起動するか、何をするか、いつ止まるか、何をもって完了とするか」を答えられれば、そのSkillは保存した指示から再利用可能な能力へ進んでいます。

## References

- [OpenAI Developers：Skillの概念と起動方法](https://developers.openai.com/plugins/concepts/skills)
- [OpenAI Developers：Skillの構築、description、補助リソース](https://developers.openai.com/plugins/build/skills)
- [OpenAI Learn：Save workflows as skills](https://learn.chatgpt.com/use-cases/reusable-codex-skills)
