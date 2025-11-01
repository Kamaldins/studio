
import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const pages = ['', '/gallery', '/sauna', '/pricing', '/privacy'];

  const sitemapEntries = i18n.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${defaultUrl}/${locale}${page}`,
      lastModified: new Date(),
    }))
  );

  return sitemapEntries;
}
