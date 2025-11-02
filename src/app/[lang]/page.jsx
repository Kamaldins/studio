
import * as React from 'react';
import { MEZLICI_ADDRESS, MEZLICI_COORDINATES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import PageClient from './page-client';

export default async function SinglePropertyPage({
  params,
}) {
  const dictionary = await getDictionary(params.lang);
    
  const imageUrls = PlaceHolderImages.map(p => p.imageUrl);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: dictionary.meta.title,
    description: dictionary.meta.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: MEZLICI_ADDRESS,
      addressLocality: 'Tomes pagasts',
      addressRegion: 'Ogres novads',
      addressCountry: 'LV'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: MEZLICI_COORDINATES.split(',')[0],
      longitude: MEZLICI_COORDINATES.split(',')[1]
    },
    image: imageUrls,
    telephone: '+37129294621',
    priceRange: '€€',
    url: `https://mezlici.lv/${params.lang}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageClient 
        dictionary={dictionary} 
        imageUrls={imageUrls}
      />
    </>
  );
}
