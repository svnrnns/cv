import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { I18nBase } from './runtime/base';
import type { Locale } from './types';
import { defaultLocale, isLocale, LOCALE_COOKIE_NAME } from './config';

const getRequestLocale = cache(async (): Promise<Locale> => {
  const headersList = await headers();
  const headerLocale = headersList.get('x-locale');
  if (headerLocale && isLocale(headerLocale)) return headerLocale;

  const cookiesStore = await cookies();
  const cookieLocale = cookiesStore.get(LOCALE_COOKIE_NAME);
  if (cookieLocale && isLocale(cookieLocale.value)) return cookieLocale.value;
  return defaultLocale;
});

const getServerI18n = cache((locale: Locale) => new I18nBase({ locale }));

export const initServerI18n = async () => {
  const locale = await getRequestLocale();
  getServerI18n(locale);
  return locale;
};

export const bindServerI18n = async () => {
  const locale = await getRequestLocale();
  const i18n = getServerI18n(locale);
  return i18n.t.bind(i18n);
};

export const getServerLocale = (): Promise<Locale> => getRequestLocale();
