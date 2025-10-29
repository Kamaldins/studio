
'use client';

import * as React from 'react';
import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import * as LucideIcons from 'lucide-react';
import MapSection from './properties/[id]/map-component';
import CalendarSection from './properties/[id]/calendar-section';
import ContactSection from './properties/[id]/contact-section';
import HeroSection from './properties/[id]/hero-section';
import ImageSliderModal from './properties/[id]/lightbox';
import InfoSection from './properties/[id]/info-section';

export default function SinglePropertyPage() {
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [miniGalleryIndex, setMiniGalleryIndex] = React.useState(0);

  const property = properties.find(p => p.id === '1');

  if (!property) {
    notFound();
  }

  const propertyImages: ImagePlaceholder[] = property.images
    .map(id => PlaceHolderImages.find(p => p.id === id))
    .filter((p): p is ImagePlaceholder => !!p);
    
  const imageUrls = propertyImages.map(p => p.imageUrl);

  const openSlider = (index?: number) => {
    setCurrentImageIndex(index ?? 0);
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };
  
  const nextMiniGallery = () => {
    setMiniGalleryIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevMiniGallery = () => {
    setMiniGalleryIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sliderOpen) {
        if (e.key === 'Escape') closeSlider();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sliderOpen, nextImage, prevImage, closeSlider]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-12">
        
      <HeroSection 
        images={imageUrls}
        openSlider={openSlider}
        miniGalleryIndex={miniGalleryIndex}
        nextMiniGallery={nextMiniGallery}
        prevMiniGallery={prevMiniGallery}
      />

      <ImageSliderModal
        sliderOpen={sliderOpen}
        images={imageUrls}
        currentImageIndex={currentImageIndex}
        closeSlider={closeSlider}
        prevImage={prevImage}
        nextImage={nextImage}
        setCurrentImageIndex={setCurrentImageIndex}
      />
      
      <Separator />

      <section id="par" className="space-y-12 py-12 px-4">
        <h2 className="font-headline text-4xl font-bold text-center">Kas jūs sagaida</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg max-w-4xl mx-auto">
            <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold mb-4">Mājā pieejams</h3>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Pirts relaksācijai</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Pilnībā aprīkota virtuve</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Modernas labierīcības</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Guļamvieta mansardā (līdz 10 viesiem)</li>
                </ul>
            </div>
            <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold mb-4">Āra aktivitātes</h3>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Plaša pļava ar telšu vietām</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Peldvieta ar laipu</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Laivas ielaišanas vieta un laiva</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Aizveramas terases svinību zona</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Kubls ar hidromasāžu</li>
                </ul>
            </div>
        </div>
        
        <div className="text-center bg-card p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border">
            <h3 className="font-headline text-2xl font-bold">Atrašanās vieta</h3>
            <p className="mt-2 text-muted-foreground text-lg">Daugavas kreisajā krastā pie Ķeguma HES</p>
        </div>

      </section>

      <Separator />

      <section id="cenas" className="py-12 px-4">
          <h2 className="font-headline text-3xl font-bold text-center mb-12 text-slate-700 dark:text-slate-300">Izcenojums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center border border-slate-200 dark:border-slate-700">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Brīvdienu māja</h3>
                  <p className="text-4xl font-black text-slate-800 dark:text-slate-100 my-2">200€</p>
                  <p className="text-slate-500 dark:text-slate-400">Par nakti (pirts iekļauta cenā)</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center border border-slate-200 dark:border-slate-700">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm-2 1a3 3 0 013-3h12a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V4zm11 2a1 1 0 10-2 0v5a1 1 0 102 0V6zM8 9a1 1 0 10-2 0v2a1 1 0 102 0V9zm5-3a1 1 0 10-2 0v5a1 1 0 102 0V6z" clipRule="evenodd" /></svg>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Hidromasāžas kubls</h3>
                  <p className="text-4xl font-black text-slate-800 dark:text-slate-100 my-2">50€</p>
                  <p className="text-slate-500 dark:text-slate-400">Par izmantošanu</p>
              </div>
          </div>
      </section>
      
      <Separator />

       <ContactSection />

       <InfoSection />

      <Separator />

      <section id="objekti" className="py-12 px-4">
         <h2 className="font-headline text-4xl font-bold text-center mb-8">Atrašanās vieta</h2>
         <MapSection />
      </section>

      <Separator />

      <section id="kalendars" className="py-12 px-4">
        <CalendarSection />
      </section>

    </div>
  );
}
