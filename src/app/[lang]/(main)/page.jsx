import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import PageContent from '../page-content';
import { i18n } from '@/i18n-config';

export default async function Page({ params }) {
  const lang = params.lang && i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  const imageUrls = PlaceHolderImages.map(p => p.imageUrl);

  return <PageContent dictionary={dictionary} imageUrls={imageUrls} />;
}
