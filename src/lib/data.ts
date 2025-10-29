import type { Property } from '@/types';

export const properties: Property[] = [
  {
    id: '1',
    name: 'Lakeside Cabin "Saulesriets"',
    description:
      'A cozy, modern cabin situated on the picturesque bank of the Daugava river. Perfect for a romantic getaway or a small family vacation, offering stunning sunset views over the water. The cabin is equipped with all modern amenities for a comfortable stay.',
    price: 120,
    rating: 4.8,
    reviews: 34,
    amenities: [
      { icon: 'BedDouble', text: '1 Queen Bed' },
      { icon: 'Users', text: 'Sleeps 2' },
      { icon: 'Wifi', text: 'Free Wifi' },
      { icon: 'ParkingCircle', text: 'Free Parking' },
      { icon: 'Soup', text: 'Full Kitchen' },
      { icon: 'Sailboat', text: 'Lake Access' },
    ],
    location: { lat: 56.63, lng: 25.35 },
    locationDescription: 'A quiet cabin on the shore of Lake Daugava, near the town of Pļaviņas, Latvia.',
    images: ['cabin-1', 'cabin-2', 'cabin-3', 'cabin-4'],
  },
  {
    id: '2',
    name: 'Forest House "Mežmala"',
    description:
      'Tucked away in a serene pine forest, this spacious house is ideal for families or groups seeking privacy and connection with nature. It features a large terrace, a sauna, and direct access to hiking trails. Enjoy the peace and quiet of the Latvian countryside.',
    price: 210,
    rating: 4.9,
    reviews: 52,
    amenities: [
      { icon: 'BedDouble', text: '3 Bedrooms' },
      { icon: 'Users', text: 'Sleeps 6' },
      { icon: 'Wifi', text: 'Free Wifi' },
      { icon: 'ParkingCircle', text: 'Free Parking' },
      { icon: 'Bath', text: 'Sauna' },
      { icon: 'Bike', text: 'Hiking Trails' },
    ],
    location: { lat: 57.32, lng: 25.42 },
    locationDescription: 'A large house in a pine forest near Cēsis, Latvia, with access to Gauja National Park.',
    images: ['forest-1', 'forest-2', 'forest-3', 'forest-4'],
  },
  {
    id: '3',
    name: 'Seaside Villa "Jūrmala Breeze"',
    description:
      'Experience luxury at this modern villa just steps from the Baltic Sea. With panoramic windows, a private garden, and high-end finishes, it\'s the ultimate coastal retreat. Perfect for those who love the sea, sand, and style.',
    price: 350,
    rating: 5.0,
    reviews: 18,
    amenities: [
      { icon: 'BedDouble', text: '4 Bedrooms' },
      { icon: 'Users', text: 'Sleeps 8' },
      { icon: 'Wifi', text: 'High-speed Wifi' },
      { icon: 'ParkingCircle', text: 'Private Garage' },
      { icon: 'Waves', text: 'Beachfront' },
      { icon: 'Wind', text: 'Air Conditioning' },
    ],
    location: { lat: 56.97, lng: 23.81 },
    locationDescription: 'A luxury villa in Jūrmala, Latvia, with direct access to the beach.',
    images: ['villa-1', 'villa-2', 'villa-3', 'villa-4'],
  },
];
