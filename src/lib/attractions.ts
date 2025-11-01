export type Attraction = {
  id: number;
  name: string;
  distance: string;
  image: string;
  icon: string;
  description: string;
  coordinates: string;
};

export const attractions: Attraction[] = [
  {
    id: 1,
    name: 'kegumaHES.name',
    distance: '1.5 km',
    image: 'https://i.ibb.co/VvzV1z1/b9b0f44e-23a9-4e56-bf15-77fde8e0cbd3.png',
    icon: '🛶',
    description: 'kegumaHES.description',
    coordinates: '56.7461,24.7234',
  },
  {
    id: 2,
    name: 'lielvardesPils.name',
    distance: '15 km',
    image: 'https://i.ibb.co/yQn5QzM/ac13c04f-bbb9-4256-917f-bd690aabbbe8.png',
    icon: '🏰',
    description: 'lielvardesPils.description',
    coordinates: '56.7186,24.8078',
  },
  {
    id: 3,
    name: 'daugavasAtputasZona.name',
    distance: '500 m',
    image: 'https://i.ibb.co/wJvQxP7/77be682a-d1ca-440c-93e0-a78dbe09c5fe.png',
    icon: '🏞️',
    description: 'daugavasAtputasZona.description',
    coordinates: '56.7461,24.7234',
  },
];
