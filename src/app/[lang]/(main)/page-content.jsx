
'use client';
import * as React from 'react';
import ImageSliderModal from '../lightbox';
import HeroSection from '../hero-section';
import AboutSection from '../about-section';
import InfoSection from '../info-section';
import CalendarSection from '../calendar-section';
import ContactSection from '../contact-section';
import MapSection from '../map-section';

export default function PageContent({ dictionary, imageUrls }) {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);
  const [miniGalleryIndex, setMiniGalleryIndex] = React.useState(0);

  const openSlider = (index) => {
    setStartIndex(index);
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  };

  const nextMiniGallery = () => {
    setMiniGalleryIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevMiniGallery = () => {
    setMiniGalleryIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };
  
  return (
    <>
      <HeroSection 
        dictionary={dictionary.hero} 
        images={imageUrls}
        openSlider={openSlider}
        miniGalleryIndex={miniGalleryIndex}
        nextMiniGallery={nextMiniGallery}
        prevMiniGallery={prevMiniGallery}
      />
      <AboutSection dictionary={dictionary.about} />
      <InfoSection dictionary={dictionary.info} />
      <CalendarSection dictionary={dictionary.calendar} />
      <ContactSection dictionary={dictionary.contact} />
      <MapSection dictionary={dictionary.map} />
      
      <ImageSliderModal 
        isOpen={sliderOpen} 
        onClose={closeSlider} 
        images={imageUrls}
        startIndex={startIndex}
      />
    </>
  );
}
