---
locale: ja
translationKey: chatgpt-unrequested-verification-code-security-guide-2026
title: "身に覚えのないChatGPT認証コードが届いたら？確認と対処法"
headline: "申請していないChatGPT認証コードが届いたときの対処法"
description: "突然届いたChatGPTの認証コードは、直ちに乗っ取りを意味しません。ログイン用コードと新規登録メールを見分け、偽メールを確認し、セッションや設定の異常に応じてアカウントを守る手順を解説します。"
summary: "コードを誰にも渡さず、まずメールの種類を確認。公式サイトから利用状況を調べ、身に覚えのない操作があればパスワードとセッションを保護します。"
category: AIツール
coverImage: /blog-covers/chatgpt-unrequested-verification-code-security-guide-2026.webp
pubDate: 2026-10-10
updatedDate: 2026-10-10
author: Huge
service: General
tags:
  - ChatGPT
  - OpenAI
  - 認証コード
  - アカウント保護
  - フィッシング
draft: false
---

ChatGPTにログインしていないのに認証コードが届いたら、**コードを他人に伝えず、メール内の「至急確認」リンクも開かないでください。**メールが一通届いただけでは、不正ログインが成功したとは判断できません。2026年10月10日時点のOpenAI公式案内では、ログイン用コードと新規登録時のメール確認は別の手続きです。

## まずメールの種類を見分ける

| 内容 | 考えられる状況 | 最初の対応 |
| --- | --- | --- |
| ログイン用のワンタイムコード | 誰かがログイン確認を始めた、またはメールアドレスを誤入力した | コードは使わず、自分で `chatgpt.com` を開いて確認 |
| 新規登録のメール確認リンク | 誰かがあなたのアドレスで登録を始めた | 登録した覚えがなければリンクを承認せず無視 |
| 「サポート」にコードを伝えるよう迫る通知 | フィッシングの可能性 | メールから移動せず、公式サイトを直接開く |

OpenAIによると、心当たりのない**新規登録の確認メール**は無視して構いません。リンクを承認しなければ、その登録は完了しません。一方、**ログイン用コード**は認証要求があったことを示しますが、誰が始めたか、ログインできたかまでは分かりません。

## 差出人を確認し、メールだけを信用しない

OpenAIが案内するログイン用OTPの送信元には、`noreply@tm.openai.com` と `otp@tm1.openai.com` があります。表示名ではなく完全なメールアドレスとリンク先を確認しましょう。正規のメールに見えても、コードを入力するのは**自分で始めた公式のログイン画面**だけです。

すでに他人へコードを伝えたり、不審なページにパスワードを入力したりした場合は、次の対処をすぐに進めてください。コードの受信だけでパスワード漏えいは確定しませんが、渡したコードが進行中のログインに使われる恐れがあります。

## 不審な操作が見つかった場合の順序

1. **ログイン手段を守る。**OpenAIのパスワードを使っているなら、使い回しのない新しいものに変更します。Google、Apple、Microsoftでサインインする場合は、その提供元と連携メールの利用履歴も確認します。
2. **セッションを確認する。**ChatGPTの設定から「セキュリティ」→「アクティブなセッション」を開き、知らない端末を確認します。位置情報は概算の場合があります。必要なら全セッションからログアウトしてください。OpenAIは、他端末への反映に最大30分程度かかると案内しています。
3. **追加の認証を設定する。**利用可能なら多要素認証やパスキーを登録し、復旧手段を保管します。MFAを有効にしても既存のセッションは終了しないため、前の手順も必要です。
4. **実際の不正利用を報告する。**覚えのない設定変更、請求、API利用などがあれば、時刻や画面を保存してOpenAIヘルプセンターから連絡します。パスワードやコードは送らないでください。

一度だけ届き、アカウントに異常が見つからなければ、コードを使わず様子を見られます。何度も届く、または知らないセッションがある場合は上の確認を進めてください。

## よくある疑問

**コードが届いたらパスワードは漏れている？**それだけでは判断できません。認証手続きが始まったことと、ログインが成功したことは別です。

**自分が申請したコードが届かない場合は？**受信先と迷惑メール、元のログイン方法を確認し、<a href="../chatgpt-login-verification-shared-account-friction-guide-2026/">ChatGPTのログイン・認証ガイド</a>を参照してください。画面に異常なアクティビティの警告が出る場合は、警告文を保存し、公式サポートに相談してください。

## References

- <a href="https://familypro.io/en/products/gpt?invite=YK868462" rel="nofollow">FamilyPro：ChatGPT製品ページ</a>
- <a href="https://help.openai.com/en/articles/9889414-why-am-i-being-asked-to-verify-my-login" rel="nofollow">OpenAI：ログイン確認を求められる理由</a>
- <a href="https://help.openai.com/en/articles/8505609-i-ve-received-a-verification-email-i-didn-t-request" rel="nofollow">OpenAI：心当たりのない確認メール</a>
- <a href="https://help.openai.com/en/articles/20001257-managing-active-sessions-in-chatgpt" rel="nofollow">OpenAI：アクティブなセッションの管理</a>
- <a href="https://help.openai.com/en/articles/8485685-i-m-seeing-unrecognized-activity-on-my-openai-account" rel="nofollow">OpenAI：覚えのないアカウント操作</a>
