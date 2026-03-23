export interface UiDictionary {
  home: string;
  blog: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDesc: string;
  latestPosts: string;
  noPosts: string;
  allPosts: string;
  footer: string;
  articleBy: string;
  languageSwitch: string;
}

export interface LanguageDescriptor {
  label: string;
  localeCode: string;
  siteName: string;
  ui: UiDictionary;
}
