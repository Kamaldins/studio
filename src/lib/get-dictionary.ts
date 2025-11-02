
import 'server-only';
import type { Locale } from '@/i18n-config';

// We use a Record to type the dictionaries to allow for dynamic access
const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  lv: () => import('@/dictionaries/lv.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const dictionaryLoader = dictionaries[locale] || dictionaries.en;
  return dictionaryLoader();
};
