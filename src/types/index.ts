import type { LucideIcon } from "lucide-react";

export type Amenity = {
  icon: keyof typeof import("lucide-react") | string;
  text: string;
};

export type Property = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  amenities: Amenity[];
  location: {
    lat: number;
    lng: number;
  };
  locationDescription: string;
  images: string[];
};
