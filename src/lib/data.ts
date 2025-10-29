import type { Property } from '@/types';

export const properties: Property[] = [
  {
    id: '1',
    name: 'Brīvdienu māja "Mežlīči"',
    description:
      'Piedāvājam atpūtu brīvdienu mājā "Mežlīči" gleznainā vietā Daugavas krastā. Tā ir lieliska vieta, kur baudīt mieru, klusumu un nesteidzīgu atpūtu no pilsētas steigas. Brīvdienu māja ir piemērota gan ģimenes atpūtai, gan nelielām svinībām draugu lokā (līdz 25 personām).',
    price: 150,
    rating: 4.9,
    reviews: 88,
    amenities: [
      { icon: 'Bed', text: 'Līdz 25 guļvietām' },
      { icon: 'Users', text: 'Svinību telpa līdz 25 personām' },
      { icon: 'Soup', text: 'Virtuve ar traukiem' },
      { icon: 'Bath', text: 'Pirts' },
      { icon: 'ParkingCircle', text: 'Autostāvvieta' },
      { icon: 'Waves', text: 'Kubls' },
      { icon: 'Sailboat', text: 'Laivu noma' },
      { icon: 'Grill', text: 'Grilla vieta' },
    ],
    location: { lat: 56.63, lng: 25.35 },
    locationDescription: 'Brīvdienu māja "Mežlīči", Aizkraukles pagasts, Aizkraukles novads, LV-5101',
    images: ['cabin-1', 'cabin-2', 'cabin-3', 'cabin-4', 'forest-1', 'forest-2', 'forest-3', 'forest-4', 'villa-1'],
  },
];
