import { en } from './locales/en';
import { ja } from './locales/ja';
import { ar } from './locales/ar';
import { zh } from './locales/zh';
import type { LanguageDescriptor } from './types';

export const LANGUAGE_REGISTRY = {
  zh: {
    label: '中文',
    localeCode: 'zh-CN',
    siteName: 'AI订阅与工具指南',
    ui: zh,
  },
  en: {
    label: 'English',
    localeCode: 'en',
    siteName: 'AI Subscriptions & Tools Guide',
    ui: en,
  },
  ja: {
    label: '日本語',
    localeCode: 'ja',
    siteName: 'AIサブスク＆ツールガイド',
    ui: ja,
  },
  ar: {
    label: 'العربية',
    localeCode: 'ar',
    siteName: 'دليل اشتراكات وأدوات الذكاء الاصطناعي',
    ui: ar,
  },
} as const satisfies Record<string, LanguageDescriptor>;

export const DEFAULT_LANG = 'en' as const;
