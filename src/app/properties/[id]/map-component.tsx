'use client';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';

type MapComponentProps = {
  location: {
    lat: number;
    lng: number;
  };
};

export default function MapComponent({ location }: MapComponentProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-center p-4">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="font-bold text-lg">Map Unavailable</h3>
        <p className="text-sm text-muted-foreground">
          Google Maps API key is not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={location}
        defaultZoom={12}
        mapId="a3f74b6cf5196b0"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <Marker position={location} />
      </Map>
    </APIProvider>
  );
}
