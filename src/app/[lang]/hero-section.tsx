
'use client';
import React from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  dictionary: {
    title1: string;
    title2: string;
    subtitle: string;
    photoButton: string;
  };
  images: string[];
  openSlider: (index?: number) => void;
  miniGalleryIndex: number;
  nextMiniGallery: () => void;
  prevMiniGallery: () => void;
}

const HeroSection = ({ dictionary, images, openSlider, miniGalleryIndex, nextMiniGallery, prevMiniGallery }: HeroSectionProps) => {
  const isMobile = useIsMobile();
  
  const getVisibleImages = () => {
    const visibleCount = isMobile ? 3 : 5;
    const startIndex = miniGalleryIndex;
    const visibleImages = [];
    
    if (images.length === 0) {
      return [];
    }
    
    const numVisible = Math.min(visibleCount, images.length);

    for (let i = 0; i < numVisible; i++) {
      const index = (startIndex + i) % images.length;
      visibleImages.push({ image: images[index], originalIndex: index });
    }
    
    return visibleImages;
  };

  const visibleImages = getVisibleImages();
  const mainImage = images[0];
  const canScroll = images.length > 5;


  return (
    <section id="foto" className="pt-24 md:pt-32 pb-4 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 lg:mb-12">
           <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tight">
                {dictionary.title1}<br/> <span className="text-primary">{dictionary.title2}</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                {dictionary.subtitle}
            </p>
        </div>

        {mainImage && (
          <div className="max-w-5xl mx-auto mb-6 sm:mb-8">
            <div className="relative group w-full aspect-w-16 aspect-h-9 rounded-2xl shadow-2xl overflow-hidden cursor-pointer" onClick={() => openSlider(0)}>
               <Image
                  src={mainImage}
                  alt="Brīvdienu māja Mežlīči"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                <Button 
                  variant="secondary"
                  onClick={(e) => { e.stopPropagation(); openSlider(0); }}
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Camera className="w-4 h-4 mr-2" /> {dictionary.photoButton}
                </Button>
            </div>
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {canScroll && (
              <button
                onClick={prevMiniGallery}
                className="flex-shrink-0 bg-card hover:bg-accent text-card-foreground p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={isMobile ? 16 : 20} />
              </button>
            )}
            
            <div className="flex gap-1.5 sm:gap-2 lg:gap-3 justify-center overflow-hidden flex-1">
              {visibleImages.map((item, index) => (
                <button
                  key={`${miniGalleryIndex}-${index}`}
                  onClick={() => openSlider(item.originalIndex)}
                  className="flex-shrink-0 relative group w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                >
                  <Image
                    src={item.image} 
                    alt={`Galerijas foto ${item.originalIndex + 1}`}
                    fill
                    className="object-cover rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 border-2 border-transparent group-hover:border-primary group-hover:shadow-primary/30 group-hover:shadow-2xl"
                    sizes="15vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center">
                     <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-primary transition-all duration-300"></div>
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-300 rounded-xl sm:rounded-2xl"></div>
                  </div>
                </button>
              ))}
            </div>
            
            {canScroll && (
              <button
                onClick={nextMiniGallery}
                className="flex-shrink-0 bg-card hover:bg-accent text-card-foreground p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={isMobile ? 16 : 20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
