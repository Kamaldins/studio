
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import ImageSliderModal from '../lightbox';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface GalleryClientProps {
  images: ImagePlaceholder[];
  imageUrls: string[];
}

export default function GalleryClient({ images, imageUrls }: GalleryClientProps) {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const openSlider = (index: number) => {
    setCurrentImageIndex(index);
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((image, index) => (
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
        ))}
      </div>
      <ImageSliderModal
        isOpen={sliderOpen}
        onClose={closeSlider}
        images={imageUrls}
        startIndex={currentImageIndex}
      />
    </>
  );
}
