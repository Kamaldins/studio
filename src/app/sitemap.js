
import { i18n } from '@/i18n-config';

export default function sitemap() {
  const defaultUrl = process.env.VERCEL_URL
    ? `https://mezlici.lv`
    : 'http://localhost:3000';

  const pages = ['', '/gallery', '/sauna', '/pricing', '/privacy', '/sitemap'];

  const sitemapEntries = i18n.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${defaultUrl}/${locale}${page}`,
      lastModified: new Date(),
    }))
  );

  return sitemapEntries;
}
