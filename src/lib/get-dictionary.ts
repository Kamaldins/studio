
import 'server-only';
import type { Locale } from '@/i18n-config';

// We use a Record to type the dictionaries to allow for dynamic access
const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import('@/dictionaries/en').then((module) => module.dictionary),
  de: () => import('@/dictionaries/de').then((module) => module.dictionary),
  lv: () => import('@/dictionaries/lv').then((module) => module.dictionary),
  ru: () => import('@/dictionaries/ru').then((module) => module.dictionary),
};

export const getDictionary = async (locale: Locale) => {
  const dictionaryLoader = dictionaries[locale] || dictionaries.en;
  return dictionaryLoader();
};
