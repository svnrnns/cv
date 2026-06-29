import { NextRequest, NextResponse } from 'next/server';
import {
  LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_MAX_AGE,
  defaultLocale,
  isLocale,
  isPrefixedLocale,
} from './lib/i18n/config';
import {
  detectLocaleFromAcceptLanguage,
  localizedHref,
  stripLocalePrefix,
} from './lib/i18n/routing';
import type { Locale } from './lib/i18n/types';

const SKIP_LOCALE_PREFIXES = ['/api', '/_next'];

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

function shouldSkipLocale(pathname: string): boolean {
  return SKIP_LOCALE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (shouldSkipLocale(pathname)) {
    const response = NextResponse.next({ request });
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-search-params', search || '');
    return response;
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  let locale: Locale = defaultLocale;
  let internalPath = pathname;

  if (firstSegment === 'en') {
    const stripped = stripLocalePrefix(pathname);
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    return NextResponse.redirect(url);
  }

  if (!firstSegment || !isPrefixedLocale(firstSegment)) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
    const preferredLocale =
      cookieLocale && isLocale(cookieLocale)
        ? cookieLocale
        : detectLocaleFromAcceptLanguage(
            request.headers.get('accept-language')
          );

    if (preferredLocale !== defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = localizedHref(pathname, preferredLocale);
      return NextResponse.redirect(url);
    }
  }

  if (firstSegment && isPrefixedLocale(firstSegment)) {
    locale = firstSegment;
    internalPath = stripLocalePrefix(pathname);
  }

  const url = request.nextUrl.clone();
  url.pathname = internalPath;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);
  requestHeaders.set('x-pathname', internalPath);
  requestHeaders.set('x-search-params', search || '');

  const response = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });

  response.headers.set('x-locale', locale);
  response.headers.set('x-pathname', internalPath);
  response.headers.set('x-search-params', search || '');

  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });

  return response;
}
