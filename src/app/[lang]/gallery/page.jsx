import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.gallery.title,
    description: dictionary.gallery.subtitle,
  };
}

export default async function GalleryPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const propertyImages = PlaceHolderImages.map(p => p.imageUrl);

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {propertyImages.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className="group relative block aspect-video w-full overflow-hidden rounded-xl"
          >
            <Image
              src={imageUrl}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
