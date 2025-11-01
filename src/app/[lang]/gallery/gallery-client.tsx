
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ImageSliderModal from '../lightbox';

interface GalleryClientProps {
  images: string[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        {images.map((imageUrl, index) => (
          <button
            key={imageUrl}
            onClick={() => openSlider(index)}
            className="group relative block aspect-video w-full overflow-hidden rounded-xl"
          >
            <Image
              src={imageUrl}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>
      <ImageSliderModal
        isOpen={sliderOpen}
        onClose={closeSlider}
        images={images}
        startIndex={currentImageIndex}
      />
    </>
  );
}
