
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GalleryClient from './gallery-client';

// This is the correct, simplified prop structure for a Next.js page.
// The incorrect 'GalleryPageProps' has been permanently removed.
export default async function GalleryPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const propertyImages = PlaceHolderImages;
  const imageUrls = propertyImages.map(p => p.imageUrl);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8 text-center md:mb-12">
        <h1 className="font-headline text-5xl font-bold md:text-6xl">
          {dictionary.gallery.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {dictionary.gallery.subtitle}
        </p>
      </div>

      <GalleryClient images={propertyImages} imageUrls={imageUrls} />
    </div>
  );
}
