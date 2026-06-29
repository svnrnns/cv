import { defaultLocale } from '../config';
import enTranslations from '../translations/en.json';
import esTranslations from '../translations/es.json';
import { getTranslation, interpolate } from './interpolate';
import { interpolateComponents } from './interpolate-components';
import type { I18nConfig, Locale, TranslateFunction } from '../types';

const defaultConfig: I18nConfig = {
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  translations: {
    en: enTranslations,
    es: esTranslations,
  },
};

export class I18nBase {
  private config: I18nConfig;

  constructor(config: Partial<I18nConfig> = {}) {
    const locale = config.locale ?? defaultConfig.locale;
    const translations = config.translations ?? defaultConfig.translations;
    const fallbackLocale =
      config.fallbackLocale ?? defaultConfig.fallbackLocale;
    this.config = {
      locale,
      translations,
      fallbackLocale,
    };
  }

  t: TranslateFunction = (key, options) => {
    const params = options?.params ?? {};
    const components = options?.components ?? {};

    const { locale, translations, fallbackLocale } = this.config;
    let translation = getTranslation(translations[locale], key);

    if (!translation && locale !== fallbackLocale)
      translation = getTranslation(translations[fallbackLocale], key);

    if (!translation) {
      console.warn(
        `Translation missing for key "${key}" in locale "${locale}"`
      );
      return key;
    }

    const result = interpolate(translation, params);

    if (Object.keys(components).length > 0)
      return interpolateComponents(result, components);

    return result;
  };

  setBaseLocale(locale: Locale): void {
    if (this.config.translations[locale]) this.config.locale = locale;
  }

  getBaseLocale(): Locale {
    return this.config.locale;
  }
}
