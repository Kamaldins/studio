'use client';

import * as React from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Camera, Check, Loader } from 'lucide-react';
import ImageSliderModal from '../lightbox';
import type { getDictionary } from '@/lib/get-dictionary';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import {
  APIProvider,
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { properties } from '@/lib/data';
import { getAttractionRecommendations } from '@/ai/flows/attraction-recommendations';


interface PageClientProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  propertyImages: ImagePlaceholder[];
}

export default function GalleryClient({ dictionary, propertyImages }: PageClientProps) {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [recommendations, setRecommendations] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const property = properties[0];
  const position = property.location;


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
    } finally {
      setLoading(false);
    }
  };

  const openSlider = (index: number) => {
    setCurrentImageIndex(index);
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  };
  
  const categories: { id: string, name: string }[] = [
    { id: 'photos', name: dictionary.gallery.categories.all },
    { id: 'sauna', name: dictionary.gallery.categories.sauna },
    { id: 'pricing', name: dictionary.gallery.categories.pricing },
    { id: 'location', name: dictionary.gallery.categories.location },
  ];

  const saunaImages = propertyImages.filter(image => image.category === 'sauna');
  const imageUrls = propertyImages.map(p => p.imageUrl);


  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8 text-center md:mb-12">
        <h1 className="font-headline text-5xl font-bold md:text-6xl">
          {dictionary.gallery.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {dictionary.gallery.subtitle}
        </p>
      </div>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-4">
            {categories.map(category => (
                 <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value="photos">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {propertyImages.map((image, index) => {
                  return (
                    <div key={image.id} className="group relative aspect-video w-full overflow-hidden rounded-xl">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-3 right-3 h-10 w-10 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            onClick={() => openSlider(index)}
                        >
                            <Camera className="h-5 w-5" />
                        </Button>
                    </div>
                  )
                })}
            </div>
        </TabsContent>
        <TabsContent value="sauna">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-headline text-4xl font-bold text-primary">{dictionary.sauna.title}</h2>
              <p className="mt-2 text-lg text-muted-foreground">{dictionary.sauna.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {saunaImages.slice(0, 2).map((image) => (
                <div key={image.id} className="group relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-2xl border bg-card p-6 shadow-lg">
                <h3 className="mb-4 font-headline text-2xl font-bold text-primary">{dictionary.sauna.offerTitle}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {dictionary.sauna.offers.map((offer: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border bg-card p-6 shadow-lg">
                <h3 className="mb-4 font-headline text-2xl font-bold text-primary">{dictionary.sauna.setupTitle}</h3>
                <p className="text-muted-foreground">{dictionary.sauna.setupText1}</p>
                <p className="mt-2 text-muted-foreground">{dictionary.sauna.setupText2}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="pricing">
          <div className="space-y-8">
             <div className="text-center">
                <h2 className="font-headline text-4xl font-bold text-primary">{dictionary.pricing.title}</h2>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-card p-8 rounded-2xl shadow-lg text-center border">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">{dictionary.pricing.houseTitle}</h3>
                <p className="text-4xl font-black my-2">{dictionary.pricing.housePrice}</p>
                <p className="text-muted-foreground">{dictionary.pricing.houseDesc}</p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-lg text-center border">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm-2 1a3 3 0 013-3h12a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V4zm11 2a1 1 0 10-2 0v5a1 1 0 102 0V6zM8 9a1 1 0 10-2 0v2a1 1 0 102 0V9zm5-3a1 1 0 10-2 0v5a1 1 0 102 0V6z" clipRule="evenodd" /></svg>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">{dictionary.pricing.hotTubTitle}</h3>
                <p className="text-4xl font-black my-2">{dictionary.pricing.hotTubPrice}</p>
                <p className="text-muted-foreground">{dictionary.pricing.hotTubDesc}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="location">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <div className="text-center">
              <h2 className="font-headline text-4xl font-bold text-primary mb-2">
                {dictionary.map.attractionsTitle}
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
        </TabsContent>
      </Tabs>


      <ImageSliderModal
        isOpen={sliderOpen}
        onClose={closeSlider}
        images={imageUrls}
        startIndex={currentImageIndex}
      />
    </div>
  );
}
