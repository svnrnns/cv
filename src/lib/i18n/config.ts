import type { Locale } from './types';

export const LOCALE_COOKIE_NAME = 'locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const validLocales: Locale[] = ['en', 'es'];
export const prefixedLocales: Locale[] = ['es'];
export const defaultLocale: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return validLocales.includes(value as Locale);
}

export function isPrefixedLocale(value: string): value is Locale {
  return prefixedLocales.includes(value as Locale);
}
