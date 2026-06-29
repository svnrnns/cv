import type { Translations } from '../types';

export function getTranslation(
  translations: Translations,
  key: string
): string | undefined {
  const keys = key.split('.');
  let result: Translations | string | undefined = translations;

  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    if (typeof result !== 'object' || result === null || !(k in result))
      return undefined;
    result = result[k] as Translations | string | undefined;
  }

  return typeof result === 'string' ? result : undefined;
}

export function interpolate(
  translation: string,
  params: Record<string, string | number>
): string {
  return translation.replace(/\{(\w+)\}/g, (_, param) => {
    return params[param] !== undefined ? String(params[param]) : `{${param}}`;
  });
}
