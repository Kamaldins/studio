
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Camera, Check, MapPin, Navigation } from 'lucide-react';
import ImageSliderModal from '../lightbox';
import type { getDictionary } from '@/lib/get-dictionary';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { MEZLICI_COORDINATES } from '@/lib/data';
import { attractions, type Attraction } from '@/lib/attractions';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface PageClientProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  propertyImages: ImagePlaceholder[];
}

export default function GalleryClient({ dictionary, propertyImages }: PageClientProps) {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

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

  const saunaImages = propertyImages.filter(p => p.category === 'sauna');
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
                        <div className="absolute inset-0 bg-black/20" />
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
              {saunaImages.map((image) => (
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
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-headline text-4xl font-bold text-primary mb-3 sm:mb-4">
                {dictionary.map.attractionsTitle}
              </h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 text-lg px-4 md:px-0">
                {dictionary.map.subtitle}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {attractions.map((attraction: Attraction) => {
                const attractionDict = dictionary.attractions[attraction.name as keyof typeof dictionary.attractions];
                const gmapsUrl = `https://www.google.com/maps/dir/${MEZLICI_COORDINATES}/${attraction.coordinates}`;
                const wazeUrl = `https://waze.com/ul?ll=${attraction.coordinates}&navigate=yes`;
                return (
                  <div
                    key={attraction.id}
                    className="group overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card border flex flex-col md:flex-row"
                  >
                    <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <Image 
                        src={attraction.image} 
                        alt={attractionDict?.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{attractionDict?.name}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {attractionDict?.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-semibold flex items-center gap-2">
                          <MapPin size={16} />
                          {attraction.distance}
                        </p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <Navigation className="mr-2 h-4 w-4" />
                                    {dictionary.map.directions}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => window.open(gmapsUrl, '_blank')}>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 9.652v-.002a2.25 2.25 0 012.25-2.25h8.998a2.25 2.25 0 012.25 2.25v.002l-6.748 4.498-6.75-4.498z" fill="#FBBC04"></path><path d="M5.25 9.652v9.096a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9.096L12 14.15 5.25 9.652z" fill="#EA4335"></path><path d="M5.44 7.502L12 12l6.56-4.498a2.25 2.25 0 00-1.076-.252H7.516a2.25 2.25 0 00-2.076.252z" fill="#34A853"></path></svg>
                                        {dictionary.map.openGoogleMaps}
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => window.open(wazeUrl, '_blank')}>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 24c-2.4 0-4.8-.8-7.1-2.9-3.2-3-3.6-7.8-1-11.2l-1-2.9 3.2.3c2.4-2.4 5.3-3.4 8.2-3.2 4.1.3 7.8 2.5 9.8 6.1s1.3 7.9-1.5 11.2C20.1 22.8 16.1 24 12 24zm-1.8-4.4c.5 0 .9.4.9.9s-.4.9-.9.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9zm-3.1-6.5c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4-1.1 2.4-2.4 2.4zm10.7-2.3c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4c.1-1.3-1-2.4-2.4-2.4zm-4.3 3.9c-2.2 0-3.3-2.1-3.3-3.3s.5-3.2 3-3.2c2.1 0 3.3 1.7 3.3 3.3s-1.2 3.2-3 3.2z"></path></svg>
                                        {dictionary.map.openWaze}
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
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
