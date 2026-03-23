import { DEFAULT_LANG, LANGUAGE_REGISTRY } from './i18n/registry';
import type { UiDictionary } from './i18n/types';

export { DEFAULT_LANG };

export type Lang = keyof typeof LANGUAGE_REGISTRY;

const entries = Object.entries(LANGUAGE_REGISTRY) as Array<
  [Lang, (typeof LANGUAGE_REGISTRY)[Lang]]
>;

export const LANGS = entries.map(([lang]) => lang) as Lang[];

function toRecord<T>(pick: (lang: Lang, item: (typeof LANGUAGE_REGISTRY)[Lang]) => T): Record<Lang, T> {
  return Object.fromEntries(entries.map(([lang, item]) => [lang, pick(lang, item)])) as Record<Lang, T>;
}

export const LOCALE_BY_LANG = toRecord((_, item) => item.localeCode);
export const SITE_NAME_BY_LANG = toRecord((_, item) => item.siteName);
export const LANG_LABEL = toRecord((_, item) => item.label);
export const UI = toRecord((_, item) => item.ui) as Record<Lang, UiDictionary>;

export function isLang(value: string): value is Lang {
  return value in LANGUAGE_REGISTRY;
}
