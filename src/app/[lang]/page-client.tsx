'use client';

import * as React from 'react';
import HeroSection from './hero-section';
import ImageSliderModal from './lightbox';
import type { getDictionary } from '@/lib/get-dictionary';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface PageClientProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  imageUrls: string[];
  propertyImages: ImagePlaceholder[];
}

export default function PageClient({ dictionary, imageUrls, propertyImages }: PageClientProps) {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [miniGalleryIndex, setMiniGalleryIndex] = React.useState(0);

  const openSlider = (index?: number) => {
    setCurrentImageIndex(index ?? 0);
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  };

  const nextMiniGallery = () => {
    if (imageUrls.length <= 5) return;
    const numVisible = 5;
    const maxIndex = imageUrls.length - numVisible;
    setMiniGalleryIndex((prevIndex) => (prevIndex + 1 > maxIndex ? 0 : prevIndex + 1));
  };
  
  const prevMiniGallery = () => {
    if (imageUrls.length <= 5) return;
    const numVisible = 5;
    const maxIndex = imageUrls.length - numVisible;
    setMiniGalleryIndex((prevIndex) => (prevIndex - 1 < 0 ? maxIndex : prevIndex - 1));
  };

  return (
    <div className="space-y-12">
      <HeroSection
        dictionary={dictionary.hero}
        images={imageUrls}
        openSlider={openSlider}
        miniGalleryIndex={miniGalleryIndex}
        nextMiniGallery={nextMiniGallery}
        prevMiniGallery={prevMiniGallery}
      />

      <ImageSliderModal
        isOpen={sliderOpen}
        onClose={closeSlider}
        images={imageUrls}
        startIndex={currentImageIndex}
      />
    </div>
  );
}
