'use client';

import React from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { properties } from '@/lib/data';
import { getAttractionRecommendations } from '@/ai/flows/attraction-recommendations';
import type { getDictionary } from '@/lib/get-dictionary';
import { Loader } from 'lucide-react';

export default function MapSection({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const property = properties[0];
  const position = property.location;
  const [recommendations, setRecommendations] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const result = await getAttractionRecommendations({
        locationDescription: property.locationDescription,
        userInterests: 'restaurants, parks, viewpoints, museums',
      });
      setRecommendations(result.recommendations);
    } catch (e) {
      console.error(e);
      // Handle error case, maybe show a toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold text-primary mb-2">
          {dictionary.map.title}
        </h2>
        <p className="text-muted-foreground mb-8">
          {dictionary.map.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 w-full h-[500px] rounded-lg overflow-hidden">
            <Map
              defaultCenter={position}
              defaultZoom={11}
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
            >
              <AdvancedMarker position={position} />
            </Map>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-lg border">
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">
              {dictionary.map.attractionsTitle}
            </h3>
            <Button onClick={handleGetRecommendations} disabled={loading}>
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {dictionary.map.loading}
                </>
              ) : (
                dictionary.map.getAttractions
              )}
            </Button>
            {recommendations.length > 0 && (
              <ul className="mt-4 space-y-2 text-left text-muted-foreground">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">&#8226;</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
