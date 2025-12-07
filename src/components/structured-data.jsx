import { MEZLICI_ADDRESS, MEZLICI_COORDINATES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function StructuredData({ dictionary }) {
  const imageUrls = PlaceHolderImages.map((p) => p.imageUrl);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: dictionary.meta.title,
    description: dictionary.meta.description,
    url: 'https://mezlici.lv',
    identifier: 'https://mezlici.lv',
    image: imageUrls,
    address: {
      '@type': 'PostalAddress',
      streetAddress: MEZLICI_ADDRESS,
      addressLocality: 'Tomes pagasts',
      addressRegion: 'Ogres novads',
      postalCode: 'LV-5010',
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
    review: {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jānis Bērziņš"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Lieliska vieta atpūtai! Viss tīrs, sakopts. Noteikti atgriezīsimies."
    },
    aggregateRating: {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "88"
    },
    numberOfRooms: 2,
    permittedUsage: "cilvēki",
    containsPlace: [
        {
          "@type": "Accommodation",
          "name": "Guļamistaba",
          "amenityFeature": {
            "@type": "LocationFeatureSpecification",
            "name": "Divguļamā gulta",
            "value": true
          }
        },
        {
          "@type": "Accommodation",
          "name": "Virtuve",
          "amenityFeature": {
            "@type": "LocationFeatureSpecification",
            "name": "Pilns aprīkojums",
            "value": true
          }
        }
      ],
      additionalType: "http://www.productontology.org/id/Holiday_home"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default StructuredData;
