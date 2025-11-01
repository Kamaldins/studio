
import * as React from 'react';
import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';
import PageClient from './page-client';

type Props = {
  params: { lang: Locale };
};

export default async function SinglePropertyPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);
  
  const property = properties.find(p => p.id === '1');

  if (!property) {
    notFound();
  }

  const propertyImages: ImagePlaceholder[] = property.images
    .map(id => PlaceHolderImages.find(p => p.id === id))
    .filter((p): p is ImagePlaceholder => !!p);
    
  const imageUrls = propertyImages.map(p => p.imageUrl);

  return (
    <PageClient 
      dictionary={dictionary} 
      imageUrls={imageUrls}
      propertyImages={propertyImages} 
    />
  );
}
