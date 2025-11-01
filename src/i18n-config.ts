
export const i18n = {
  defaultLocale: 'lv',
  locales: ['en', 'de', 'lv', 'ru'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
