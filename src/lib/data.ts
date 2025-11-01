import type { Property } from '@/types';

export const properties: Property[] = [
  {
    id: '1',
    name: 'Brīvdienu māja "Mežlīči"',
    description:
      'Piedāvājam atpūtu brīvdienu mājā "Mežlīči" gleznainā vietā Daugavas krastā. Tā ir lieliska vieta, kur baudīt mieru, klusumu un nesteidzīgu atpūtu no pilsētas steigas. Brīvdienu māja ir piemērota gan ģimenes atpūtai, gan nelielām svinībām draugu lokā (līdz 25 personām).',
    price: 200,
    rating: 4.9,
    reviews: 88,
    amenities: [
      { icon: 'Bed', text: 'Guļamvieta mansardā (līdz 10 viesiem)' },
      { icon: 'Bath', text: 'Pirts relaksācijai' },
      { icon: 'Soup', text: 'Pilnībā aprīkota virtuve' },
      { icon: 'Tv', text: 'Modernas labierīcības' },
      { icon: 'Tent', text: 'Plaša pļava ar telšu vietām' },
      { icon: 'Waves', text: 'Peldvieta ar laipu' },
      { icon: 'Sailboat', text: 'Laivas ielaišanas vieta un laiva' },
      { icon: 'GanttChartSquare', text: 'Aizveramas terases svinību zona' },
      { icon: 'Droplets', text: 'Kubls ar hidromasāžu' },
    ],
    location: { lat: 56.63, lng: 25.35 },
    locationDescription: 'Mežlīči, Tomes pagasts, Ogres novads',
    images: ['cabin-1', 'cabin-2', 'cabin-3', 'cabin-4', 'forest-1', 'forest-2', 'forest-3', 'forest-4', 'villa-1', 'hot-tub-1', 'new-local-image'],
  },
];
