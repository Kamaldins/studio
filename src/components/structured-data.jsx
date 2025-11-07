import { MEZLICI_ADDRESS, MEZLICI_COORDINATES } from '@/lib/data';

function StructuredData({ dictionary }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: dictionary.meta.title,
    description: dictionary.meta.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: MEZLICI_ADDRESS,
      addressLocality: 'Tomes pagasts',
      addressRegion: 'Ogres novads',
      addressCountry: 'LV',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: MEZLICI_COORDINATES.split(',')[0],
      longitude: MEZLICI_COORDINATES.split(',')[1],
    },
    telephone: '+37129294621',
    priceRange: '€200 - €250',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: dictionary.about.amenities[0], // Sauna
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: dictionary.about.amenities[1], // Kitchen
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: dictionary.about.activities[4], // Hot Tub
        value: true,
      },
    ],
    petsAllowed: false,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default StructuredData;
