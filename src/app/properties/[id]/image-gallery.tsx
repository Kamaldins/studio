'use client';

import * as React from 'react';
import Image from 'next/image';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

type ImageGalleryProps = {
  images: ImagePlaceholder[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImage, setMainImage] = React.useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full bg-muted rounded-2xl flex items-center justify-center">
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-2xl shadow-xl border">
        <Image
          src={mainImage.imageUrl}
          alt={mainImage.description}
          fill
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          data-ai-hint={mainImage.imageHint}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 896px"
          priority
        />
        <Button variant="secondary" className="absolute top-4 right-4 h-auto px-3 py-1.5 text-sm">
          <Camera className="w-4 h-4 mr-2"/>
          FOTO
        </Button>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2">
          {images.map(image => (
            <CarouselItem key={image.id} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-2">
              <button
                onClick={() => setMainImage(image)}
                className={cn(
                  'block aspect-video relative w-full overflow-hidden rounded-lg transition-all duration-200',
                  'ring-2 ring-transparent hover:ring-primary focus:ring-primary focus:outline-none',
                  mainImage.id === image.id ? 'ring-primary shadow-md' : 'opacity-75 hover:opacity-100'
                )}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  sizes="15vw"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-15px] top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 disabled:opacity-20" />
        <CarouselNext className="absolute right-[-15px] top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 disabled:opacity-20" />
      </Carousel>
    </div>
  );
}
