
'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { properties } from '@/lib/data';
import { getAttractionRecommendations } from '@/ai/flows/attraction-recommendations';
import type { getDictionary } from '@/lib/get-dictionary';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function MapComponent({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const property = properties[0];
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setRecommendations([]);
    try {
      const result = await getAttractionRecommendations({
        locationDescription: property.locationDescription,
        userInterests: 'restaurants, parks, viewpoints',
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Handle error state in UI if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="rounded-2xl overflow-hidden shadow-2xl border h-96 md:h-full">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <Map
            defaultCenter={property.location}
            defaultZoom={12}
            mapId="f1b7a8f5b4b3a4a"
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <AdvancedMarker position={property.location} />
          </Map>
        </APIProvider>
      </div>
      <div className="bg-card p-6 rounded-2xl shadow-lg border">
        <h3 className="font-headline text-2xl font-bold mb-4 text-foreground">
          {dictionary.map.attractionsTitle}
        </h3>
        <p className="text-muted-foreground mb-6">
          {dictionary.map.subtitle}
        </p>
        <Button
          onClick={handleGetRecommendations}
          loading={loading}
          disabled={loading}
          className="w-full"
        >
          {dictionary.map.getAttractions}
        </Button>

        <div className="mt-6 space-y-4">
          {loading && (
            <>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-5/6" />
              <Skeleton className="h-8 w-full" />
            </>
          )}
          {recommendations.length > 0 && (
            <ul className="list-disc list-inside bg-muted/50 p-4 rounded-xl space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-muted-foreground">
                  {rec}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
