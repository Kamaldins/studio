'use client';

import * as React from 'react';
import HeroSection from './hero-section';
import ImageSliderModal from './lightbox';
import type { getDictionary } from '@/lib/get-dictionary';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import AboutSection from './about-section';
import CalendarSection from './calendar-section';
import MapSection from './map-section';
import InfoSection from './info-section';
import ContactSection from './contact-section';

interface PageClientProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  imageUrls: string[];
}

export default function PageClient({ dictionary, imageUrls }: PageClientProps) {
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
    <>
      <div className="space-y-12">
        <HeroSection
          dictionary={dictionary.hero}
          images={imageUrls}
          openSlider={openSlider}
          miniGalleryIndex={miniGalleryIndex}
          nextMiniGallery={nextMiniGallery}
          prevMiniGallery={prevMiniGallery}
        />
      </div>

      <div id="about">
        <AboutSection dictionary={dictionary.about} />
      </div>
      <div id="calendar">
        <CalendarSection dictionary={dictionary.calendar} />
      </div>
      <div id="map">
        <MapSection dictionary={dictionary.map} />
      </div>
      <InfoSection dictionary={dictionary.info} />
      <div id="contact">
        <ContactSection dictionary={dictionary.contact} />
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
