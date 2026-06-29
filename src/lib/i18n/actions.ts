'use server';

import { cookies } from 'next/headers';
import { LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME, isLocale } from './config';
import type { Locale } from './types';

export async function setLocaleAction(locale: Locale) {
  if (!isLocale(locale)) return;
  const store = await cookies();
  store.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
  });
}
