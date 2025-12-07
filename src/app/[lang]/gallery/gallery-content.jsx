
'use client';
import * as React from 'react';
import Image from 'next/image';
import ImageSliderModal from '../lightbox';

export default function GalleryContent({ dictionary, propertyImages }) {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  const openSlider = (index) => {
    setStartIndex(index);
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  };

  const handleImageClick = (e, index) => {
    e.stopPropagation();
    openSlider(index);
  }

  if (!dictionary) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8 text-center md:mb-12">
          <h1 className="font-headline text-5xl font-bold md:text-6xl">
            {dictionary.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {propertyImages.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="group relative block aspect-video w-full overflow-hidden rounded-xl cursor-pointer"
              onClick={(e) => handleImageClick(e, index)}
            >
              <Image
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
                width={600}
                height={400}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
      <ImageSliderModal
        isOpen={sliderOpen}
        onClose={closeSlider}
        images={propertyImages}
        startIndex={startIndex}
      />
    </>
  );
}
