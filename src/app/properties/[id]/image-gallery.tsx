'use client';

import * as React from 'react';
import Image from 'next/image';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

type ImageGalleryProps = {
  images: ImagePlaceholder[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map(image => (
          <CarouselItem key={image.id}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint={image.imageHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
