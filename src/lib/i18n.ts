import { DEFAULT_LANG, LANGUAGE_REGISTRY } from './i18n/registry';
import type { UiDictionary } from './i18n/types';

export { DEFAULT_LANG };

export type Lang = string;
type KnownLang = keyof typeof LANGUAGE_REGISTRY;

const knownEntries = Object.entries(LANGUAGE_REGISTRY) as Array<
  [KnownLang, (typeof LANGUAGE_REGISTRY)[KnownLang]]
>;
const fallback = LANGUAGE_REGISTRY[DEFAULT_LANG];

export const KNOWN_LANGS = knownEntries.map(([lang]) => lang);

export function isKnownLang(value: string): value is KnownLang {
  return value in LANGUAGE_REGISTRY;
}

function toFallbackLabel(lang: string): string {
  return lang.toLowerCase() === lang ? lang : lang.toLowerCase();
}

export function getLocaleCode(lang: Lang): string {
  return isKnownLang(lang) ? LANGUAGE_REGISTRY[lang].localeCode : lang;
}

export function getSiteName(lang: Lang): string {
  return isKnownLang(lang) ? LANGUAGE_REGISTRY[lang].siteName : fallback.siteName;
}

export function getLangLabel(lang: Lang): string {
  return isKnownLang(lang) ? LANGUAGE_REGISTRY[lang].label : toFallbackLabel(lang);
}

export function getUi(lang: Lang): UiDictionary {
  return isKnownLang(lang) ? LANGUAGE_REGISTRY[lang].ui : fallback.ui;
}

export function collectSiteLangs(locales: string[]): Lang[] {
  const normalized = locales
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const uniq = Array.from(new Set([DEFAULT_LANG, ...normalized]));
  return uniq.sort((a, b) => {
    if (a === DEFAULT_LANG) return -1;
    if (b === DEFAULT_LANG) return 1;
    return a.localeCompare(b);
  });
}

export function buildHomeTitle(lang: Lang, siteName: string): string {
  if (lang === 'zh') {
    return `${siteName} | AI产品订阅、价格对比与工具选型`;
  }
  if (lang === 'ja') {
    return `${siteName} | AIサブスク料金比較とツール選定の実践ガイド`;
  }
  if (lang === 'ar') {
    return `${siteName} | مقارنة اشتراكات الذكاء الاصطناعي واختيار الأدوات`;
  }
  return `${siteName} | Compare AI Plans and Choose Tools`;
}

export function buildBlogIndexTitle(lang: Lang, siteName: string, listLabel: string): string {
  if (lang === 'zh') {
    return `${listLabel} | AI订阅价格对比与工具指南`;
  }
  if (lang === 'ja') {
    return `${listLabel} | AIサブスク比較とツール活用ガイド`;
  }
  if (lang === 'ar') {
    return `${listLabel} | دليل اشتراكات وأدوات الذكاء الاصطناعي`;
  }
  return `AI Subscription and Tool Guides | ${siteName}`;
}

export function buildBlogIndexDescription(lang: Lang, listLabel: string): string {
  if (lang === 'zh') {
    return '汇总 AI 订阅与工具选型的价格对比、功能差异、税费与汇率口径、支付方式和风控提示，帮助你按统一标准评估总成本并做出更稳妥决策。';
  }
  if (lang === 'ja') {
    return 'AIサブスクとツール選定に関する価格比較、機能差、税金・為替の見方、決済手段ごとの注意点、運用時のリスク管理を同じ基準で整理し、実行しやすい判断材料を提供します。';
  }
  if (lang === 'ar') {
    return 'محتوى عملي لمقارنة اشتراكات وأدوات الذكاء الاصطناعي: فروق الأسعار والميزات، سياق الضرائب وسعر الصرف، خيارات الدفع، وكيفية اتخاذ قرار تجديد أكثر أمانًا.';
  }
  return `Practical ${listLabel.toLowerCase()} covering AI plan pricing, tool comparisons, tax and FX context, payment-path tradeoffs, and safer renewal decisions.`;
}
