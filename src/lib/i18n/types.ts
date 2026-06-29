import type { ReactNode } from 'react';

export type Locale = 'en' | 'es';

export type Translations = Record<string, unknown>;

export interface I18nConfig {
  locale: Locale;
  fallbackLocale: Locale;
  translations: Record<Locale, Translations>;
}

export type TranslateFunction = (
  key: string,
  options?: {
    params?: Record<string, string | number>;
    components?: Record<string, ReactNode>;
  }
) => string | ReactNode;
