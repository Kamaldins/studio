
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
          <h2 className="font-headline text-4xl font-bold text-center mb-8">Izcenojums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-card p-8 rounded-2xl shadow-lg text-center border">
                  <p className="text-6xl mb-4">🏠</p>
                  <h3 className="font-headline text-2xl font-bold">Brīvdienu māja</h3>
                  <p className="text-5xl font-black text-primary my-4">200€</p>
                  <p className="text-muted-foreground">Par nakti (pirts iekļauta cenā)</p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-lg text-center border">
                  <p className="text-6xl mb-4">🛁</p>
                  <h3 className="font-headline text-2xl font-bold">Hidromasāžas kubls</h3>
                  <p className="text-5xl font-black text-primary my-4">50€</p>
                  <p className="text-muted-foreground">Par izmantošanu</p>
              </div>
          </div>
      </section>
      
      <Separator />

       <ContactSection />

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
