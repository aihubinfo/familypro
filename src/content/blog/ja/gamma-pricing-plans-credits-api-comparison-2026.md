---
locale: ja
translationKey: gamma-pricing-plans-credits-api-comparison-2026
title: "Gamma料金とクレジット比較：Plus/Pro/Ultraの違いと購入判断"
headline: Gammaの月次クレジットと実質コストをどう読むか
description: GammaのPlus/Pro/Ultraの差分を、月次クレジット、アプリ内消費、API利用、追加購入の観点で整理し、最適プラン選定の実務手順を示します。
summary: Gammaの料金比較を「クレジット消費」と「実際の利用量」で判断するための実践ガイド。
category: AI工具
pubDate: 2026-04-02
updatedDate: 2026-04-21
author: Huge
service: General
tags:
  - Gamma pricing
  - credits
  - Plus Pro Ultra
  - API
  - cost estimation
draft: false
---

Gammaは月額だけで比較すると判断を誤りやすく、**月次クレジット・実消費・API運用**を同時に見ないと実コストが読めません。

> Data date: 2026-04-02  
> Note: 価格・付与量・課金仕様は地域や更新で変わります。差異がある場合は [Gamma Pricing](https://gamma.app/pricing) の最新表示を優先してください。

## 1) プラン差分：月次クレジットと主要機能

Free/Plus/Pro/Ultra/Teams/Businessは、月次クレジット、1回生成のカード上限、API可否、チーム管理機能で差が付きます。  
個人向けとチーム向けでは予算構造が異なるため、同じ「月額」だけで比較しないことが重要です。

| プラン | 月次クレジット（公式記載） | 実務で比較される差分 |
| --- | --- | --- |
| Free | 400（初回付与、月次更新なし） | 小規模試用向け |
| Plus | 1,000 | 基本運用の入口 |
| Pro | 4,000 | API利用と上限拡張 |
| Ultra | 20,000 | 高負荷運用向け |
| Teams | 6,000 / 席 | チーム管理、最低席数あり |
| Business | 10,000 / 席 | 企業機能、最低席数あり |

### 1.1 繰り越しと追加購入

- 未使用クレジットは概ね「月次付与の約2倍」まで繰り越し
- 追加パック購入が可能（例: 1,500 credits / $6）
- Freeは月次再付与がなく、使い切り前提

## 2) クレジットは2系統ある（UI消費とAPI消費）

### 2.1 UI内アクションの消費

公式ヘルプでは、Create/Add card/Chat/Image/Continueで概算消費が異なります。  
「Create with AI=40」のようなUI目安を、APIの1カード課金へそのまま転用しないことが重要です。

| アクション | 目安消費 |
| --- | --- |
| Create with AI | 40 / gamma |
| Add card with AI | 5 / card |
| Chat with AI | 10 / suggestion |
| AI image prompt | 10 / prompt |
| Continue with AI | 2 / use |

### 2.2 API非同期生成の消費

APIでは `credits.deducted` が実請求の基準です。  
テキストカードは1-3 credits/カード帯、画像はモデルで大きく増減し、テンプレート生成はやや高くなる場合があります。  
見積もりはレンジで作成し、最終的には実運用ログで補正するのが安全です。

## 3) 「1デッキ」をどう見積もるか

- Web中心: 40 + 5×追加AIカード + チャット/画像
- APIバッチ: 仕様レンジで帯を見積もり、実績 `credits.deducted` で補正
- Remix/テンプレ運用: クレジット消費前提で上振れを見込む

簡易チェックとして、月25本の新規デッキを「Create with AIのみ」で作ると、約1,000 creditsに達します。  
この時点でPlus上限に近づくため、追加パックか上位プラン検討が必要になります。

## 4) 共有ログイン vs 正規シート

Gammaヘルプではクレジットは基本的にユーザー単位で管理されます。  
共有ログインは短期検証で成立する場面もありますが、監査性・責任分界・更新管理で不利になりやすいです。

短期的に共有が成立しても、長期運用では次の課題が出やすくなります。

- 誰が何を生成/書き出ししたか追跡しづらい
- 課金責任と更新責任が曖昧になる
- 顧客案件を1アカウントに依存しやすい

## 5) APIラッパーツールを使う場合

- 価値: 非技術者向けに単価化しやすく、非同期ジョブ運用を簡略化
- 注意: Gamma側クレジット消費+ラッパー利用料の二重構造を確認
- 検証: `credits.deducted` と請求書を突き合わせる

また、データ経路（テキスト/画像が第三者に保存されるか）も必ず確認してください。

## 6) 購入判断フレーム

- 軽量利用: Free/Plusから開始し実消費を観測
- 週次運用+協業: Pro個別複数 vs Teams/Businessを総額比較
- 自動化重視: Pro以上+APIで `credits.deducted` ベース管理

共有アカウントは「短期検証の暫定策」としては成立しても、規模拡大時は1人1ライセンスに移行する前提で設計するのが安全です。

### 7) まとめ

Gammaの最適プランは「月額の安さ」ではなく、**自社の消費曲線に対する再現性**で決まります。  
UI目安とAPI実績を分けて管理し、3か月/12か月の同期間比較で判断するのが安全です。

## 参考文献

- [FamilyPro: Gamma product page](https://familypro.io/en/products/gamma?invite=YK868462)
- [FamilyPro: Gamma AI](https://familypro.io/en/gamma-ai?invite=YK868462)
- [Gamma Pricing](https://gamma.app/pricing)
- [How do credits work in Gamma?](https://help.gamma.app/en/articles/7834324-how-do-credits-work-in-gamma)
- [Upgrading your Gamma subscription](https://help.gamma.app/en/articles/8077107-upgrading-to-gamma-plus-or-pro-a-quick-guide)
- [How do I purchase more credits?](https://help.gamma.app/en/articles/12466653-how-do-i-purchase-more-credits)
- [What options does Gamma offer for teams and business?](https://help.gamma.app/en/articles/11594955-what-options-does-gamma-offer-for-teams-and-business)
- [Review access and pricing (API and credits)](https://developers.gamma.app/get-started/access-and-pricing)
- [Gamma Terms of Use](https://gamma.app/terms)
