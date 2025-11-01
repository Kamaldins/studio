
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GalleryClient from './page-client';

// This defines the props that Next.js will pass to the page component.
// It includes route parameters (params) and URL query parameters (searchParams).
type GalleryPageProps = {
  params: { lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
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
