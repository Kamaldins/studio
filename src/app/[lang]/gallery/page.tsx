
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GalleryClient from './page-client';

type GalleryPageProps = {
  params: { lang: Locale };
};

export default async function GalleryPage({ params }: GalleryPageProps) {
  const dictionary = await getDictionary(params.lang);
  const propertyImages = PlaceHolderImages;

  return (
    <GalleryClient 
      dictionary={dictionary} 
      propertyImages={propertyImages} 
    />
  );
}
