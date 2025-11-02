
import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  lv: () => import('@/dictionaries/lv.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  const dictionaryLoader = dictionaries[locale] || dictionaries.en;
  return dictionaryLoader();
};
