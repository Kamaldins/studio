
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GalleryClient from './page-client';

export default async function GalleryPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const propertyImages = PlaceHolderImages;

  return (
    <GalleryClient
      dictionary={dictionary}
      propertyImages={propertyImages}
    />
  );
}
