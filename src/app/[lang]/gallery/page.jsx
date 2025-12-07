
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { i18n } from '@/i18n-config';
import GalleryContent from './gallery-content';

export async function generateMetadata({ params }) {
  const lang = params.lang && i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.gallery.title,
    description: dictionary.gallery.subtitle,
  };
}

export default async function GalleryPage({ params }) {
  const { lang } = params;
  const locale = lang && i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(locale);
  
  const propertyImages = PlaceHolderImages.map(p => p.imageUrl);

  return (
    <GalleryContent 
      dictionary={dictionary.gallery}
      propertyImages={propertyImages}
    />
  );
}
