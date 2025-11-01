
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GalleryClient from './page-client';

// This is the correct PageProps type for a Next.js App Router page.
type PageProps = {
  params: { lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function GalleryPage({ params: { lang } }: PageProps) {
  const dictionary = await getDictionary(lang);
  const propertyImages = PlaceHolderImages;

  return (
    <GalleryClient
      dictionary={dictionary}
      propertyImages={propertyImages}
    />
  );
}
