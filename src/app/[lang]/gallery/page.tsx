
import * as React from 'react';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';
import PageClient from './page-client';

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dictionary = await getDictionary(params.lang);
  
  const propertyImages: ImagePlaceholder[] = PlaceHolderImages;

  return (
    <PageClient 
      dictionary={dictionary} 
      propertyImages={propertyImages} 
    />
  );
}
