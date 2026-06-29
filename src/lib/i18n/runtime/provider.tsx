'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isLocale } from '../config';
import { localizedHref, stripLocalePrefix } from '../routing';
import { I18nBase } from './base';
import type { Locale } from '../types';
import { setLocaleAction } from '../actions';
import { defaultLocale } from '../config';

type I18nContextValue = {
  i18n: I18nBase;
  locale: Locale;
  setLocaleState: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState(initialLocale);

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const i18n = useMemo(() => new I18nBase({ locale }), [locale]);

  const value = useMemo(
    () => ({ i18n, locale, setLocaleState }),
    [i18n, locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');

  return useMemo(() => context.i18n.t.bind(context.i18n), [context.i18n]);
}

export function useGetLocale() {
  const context = useContext(I18nContext);
  if (!context)
    throw new Error('useGetLocale must be used within an I18nProvider');

  return context.locale;
}

export function useSetLocale() {
  const context = useContext(I18nContext);
  const router = useRouter();
  const pathname = usePathname();
  if (!context)
    throw new Error('useSetLocale must be used within an I18nProvider');

  const { locale } = context;

  return useCallback(
    async (nextLocale: Locale) => {
      if (!isLocale(nextLocale)) return;

      const stripped = stripLocalePrefix(pathname);
      const href = localizedHref(stripped, nextLocale);
      if (nextLocale === locale && href === pathname) return;

      await setLocaleAction(nextLocale);
      if (href !== pathname) router.push(href);
      router.refresh();
    },
    [locale, router, pathname]
  );
}
