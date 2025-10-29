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

type ImageGalleryProps = {
  images: ImagePlaceholder[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImage, setMainImage] = React.useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={mainImage.imageUrl}
          alt={mainImage.description}
          fill
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          data-ai-hint={mainImage.imageHint}
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
      
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {images.map(image => (
            <CarouselItem key={image.id} className="basis-1/4 md:basis-1/5 lg:basis-1/6 pl-2">
              <button
                onClick={() => setMainImage(image)}
                className={cn(
                  'block aspect-square relative w-full overflow-hidden rounded-lg transition-all duration-200',
                  'ring-2 ring-transparent hover:ring-primary focus:ring-primary focus:outline-none',
                  mainImage.id === image.id ? 'ring-primary' : 'opacity-70 hover:opacity-100'
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
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background" />
      </Carousel>
    </div>
  );
}
