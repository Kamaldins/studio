'use client';

import * as React from 'react';
import { Separator } from '@/components/ui/separator';
import * as LucideIcons from 'lucide-react';
import MapSection from './map-component';
import CalendarSection from './calendar-section';
import ContactSection from './contact-section';
import HeroSection from './hero-section';
import ImageSliderModal from './lightbox';
import InfoSection from './info-section';
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
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-12">
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

      <Separator className="bg-slate-700" />

      <section id="par" className="space-y-12 py-12 px-4">
        <h2 className="font-headline text-4xl font-bold text-center text-slate-100">{dictionary.about.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg max-w-4xl mx-auto text-slate-300">
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-bold mb-4 text-slate-100">{dictionary.about.amenitiesTitle}</h3>
            <ul className="space-y-3">
              {dictionary.about.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />{amenity}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-bold mb-4 text-slate-100">{dictionary.about.activitiesTitle}</h3>
            <ul className="space-y-3">
              {dictionary.about.activities.map((activity, index) => (
                <li key={index} className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />{activity}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center bg-slate-800 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border border-slate-700">
          <h3 className="font-headline text-2xl font-bold text-slate-100">{dictionary.about.locationTitle}</h3>
          <p className="mt-2 text-slate-400 text-lg">{dictionary.about.locationText}</p>
        </div>
      </section>

      <Separator className="bg-slate-700" />

      <section id="cenas" className="py-12 px-4">
        <h2 className="font-headline text-3xl font-bold text-center mb-12 text-slate-100">{dictionary.pricing.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-slate-800 p-8 rounded-2xl shadow-lg text-center border border-slate-700">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            </div>
            <h3 className="font-headline text-xl font-bold text-blue-400 mb-2">{dictionary.pricing.houseTitle}</h3>
            <p className="text-4xl font-black text-slate-100 my-2">{dictionary.pricing.housePrice}</p>
            <p className="text-slate-400">{dictionary.pricing.houseDesc}</p>
          </div>
          <div className="bg-slate-800 p-8 rounded-2xl shadow-lg text-center border border-slate-700">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm-2 1a3 3 0 013-3h12a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V4zm11 2a1 1 0 10-2 0v5a1 1 0 102 0V6zM8 9a1 1 0 10-2 0v2a1 1 0 102 0V9zm5-3a1 1 0 10-2 0v5a1 1 0 102 0V6z" clipRule="evenodd" /></svg>
            </div>
            <h3 className="font-headline text-xl font-bold text-blue-400 mb-2">{dictionary.pricing.hotTubTitle}</h3>
            <p className="text-4xl font-black text-slate-100 my-2">{dictionary.pricing.hotTubPrice}</p>
            <p className="text-slate-400">{dictionary.pricing.hotTubDesc}</p>
          </div>
        </div>
      </section>

      <Separator className="bg-slate-700" />

      <ContactSection dictionary={dictionary.contact} />

      <InfoSection dictionary={dictionary.info} />

      <Separator className="bg-slate-700" />

      <section id="objekti" className="py-12 px-4">
        <h2 className="font-headline text-4xl font-bold text-center mb-8 text-slate-100">{dictionary.map.title}</h2>
        <MapSection />
      </section>

      <Separator className="bg-slate-700" />

      <section id="kalendars" className="py-12 px-4">
        <CalendarSection dictionary={dictionary.calendar} />
      </section>
    </div>
  );
}
