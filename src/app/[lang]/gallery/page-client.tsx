
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import ImageSliderModal from '../lightbox';
import type { getDictionary } from '@/lib/get-dictionary';
import type { ImagePlaceholder, ImageCategory } from '@/lib/placeholder-images';

interface PageClientProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  propertyImages: ImagePlaceholder[];
}

export default function GalleryClient({ dictionary, propertyImages }: PageClientProps) {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState<ImageCategory | 'all'>('all');

  const openSlider = (index: number) => {
    setCurrentImageIndex(index);
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  };
  
  const categories: { id: ImageCategory | 'all', name: string }[] = [
    { id: 'all', name: dictionary.gallery.categories.all },
    { id: 'house', name: dictionary.gallery.categories.house },
    { id: 'sauna', name: dictionary.gallery.categories.sauna },
    { id: 'yard', name: dictionary.gallery.categories.yard },
  ];

  const filteredImages = activeTab === 'all'
    ? propertyImages
    : propertyImages.filter(image => image.category === activeTab);

  const imageUrls = propertyImages.map(p => p.imageUrl);
  const filteredImageUrls = filteredImages.map(p => p.imageUrl);


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

      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as ImageCategory | 'all')} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-4">
            {categories.map(category => (
                 <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredImages.map((image, index) => {
                  const originalIndex = propertyImages.findIndex(p => p.id === image.id);
                  return (
                    <div key={image.id} className="group relative aspect-video w-full overflow-hidden rounded-xl">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-3 right-3 h-10 w-10 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            onClick={() => openSlider(originalIndex)}
                        >
                            <Camera className="h-5 w-5" />
                        </Button>
                    </div>
                  )
                })}
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
