
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';
import Link from 'next/link';

const pages = [
  { path: '/', nameKey: 'home' },
  { path: '/gallery', nameKey: 'gallery' },
  { path: '/sauna', nameKey: 'sauna' },
  { path: '/pricing', nameKey: 'pricing' },
  { path: '/privacy', nameKey: 'privacy' },
];

export async function generateMetadata({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.sitemap.title,
    description: dictionary.sitemap.description,
  };
}

export default async function SitemapPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const { sitemap, navigation, gallery, footer } = dictionary;

  const pageNames = {
    home: navigation.home,
    gallery: navigation.gallery,
    sauna: gallery.categories.sauna,
    pricing: gallery.categories.pricing,
    privacy: footer.privacy,
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold md:text-6xl text-primary">{sitemap.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{sitemap.description}</p>
      </div>
      
      <div className="space-y-8">
        {i18n.locales.map((locale) => (
          <div key={locale} className="rounded-2xl border bg-card p-6 shadow-lg">
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">{dictionary.locales[locale]}</h2>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link 
                    href={`/${locale}${page.path === '/' ? '' : page.path}`} 
                    className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  >
                    {pageNames[page.nameKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
