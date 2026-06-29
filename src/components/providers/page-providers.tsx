'use client';

import type { ReactNode } from 'react';
import { I18nProvider } from '@/lib/i18n/runtime/provider';
import type { Locale } from '@/lib/i18n/types';

export function PageProviders({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return <I18nProvider initialLocale={locale}>{children}</I18nProvider>;
}
