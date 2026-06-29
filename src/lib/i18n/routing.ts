import { defaultLocale, isLocale, isPrefixedLocale } from './config';
import type { Locale } from './types';

export function localeFromPathname(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment && isPrefixedLocale(segment)) return segment;
  return defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isPrefixedLocale(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname || '/';
}

export function localizedHref(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  if (normalized === '/') return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function getAlternatePaths(path: string): Record<string, string> {
  const stripped = stripLocalePrefix(path);
  return {
    en: localizedHref(stripped, 'en'),
    es: localizedHref(stripped, 'es'),
    'x-default': localizedHref(stripped, 'en'),
  };
}

export function detectLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined
): Locale {
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage
    .split(',')
    .map((part) => {
      const [lang, ...params] = part.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? Number.parseFloat(qParam.split('=')[1]!) : 1;
      const code = lang.trim().toLowerCase().split('-')[0]!;
      return { code, q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);

  const matched = languages.find(
    (language): language is { code: Locale; q: number } =>
      isLocale(language.code)
  );
  return matched?.code ?? defaultLocale;
}
