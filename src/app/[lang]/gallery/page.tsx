
import * as React from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';
import PageClient from './page-client';

export default async function GalleryPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  
  const propertyImages = PlaceHolderImages;

  return (
    <PageClient 
      dictionary={dictionary} 
      propertyImages={propertyImages} 
    />
  );
}
