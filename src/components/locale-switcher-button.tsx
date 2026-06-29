'use client';

import { cn } from '@/lib/ui/cn';
import { useGetLocale, useSetLocale } from '@/lib/i18n/runtime/provider';
import type { Locale } from '@/lib/i18n/types';

const locales: Locale[] = ['en', 'es'];

export function LocaleSwitcherButton() {
  const locale = useGetLocale();
  const setLocale = useSetLocale();

  return (
    <div
      className="grid h-7 grid-cols-2 rounded-lg bg-module p-0.5 shadow"
      role="group"
      aria-label="Language"
    >
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={locale === item}
          className={cn(
            'flex items-center justify-center rounded-md px-2 tiny-text font-medium cursor-pointer',
            locale === item
              ? 'bg-heading text-body'
              : 'text-detail hover:text-heading'
          )}
          onClick={() => setLocale(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
