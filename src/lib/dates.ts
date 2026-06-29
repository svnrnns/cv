import type { Locale } from '@/lib/i18n/types';

export function dateToMonthYearString(date: Date, locale: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
  };
  const tag = locale === 'es' ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(tag, options).replace(', ', ' - ');
}
