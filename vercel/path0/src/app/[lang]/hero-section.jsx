
'use client';
import React from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const HeroSection = ({ dictionary, images, openSlider, miniGalleryIndex, nextMiniGallery, prevMiniGallery }) => {
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

  const handleOpenSlider = (e, index) => {
    e.stopPropagation();
    openSlider(e, index);
  }

  const visibleImages = getVisibleImages();
  const mainImage = images[0];
  const canScroll = images.length > (isMobile ? 3 : 5);


  return (
    <section className="relative pt-12 md:pt-16 pb-4 sm:pb-8 text-white overflow-hidden">
      <div className="absolute inset-0 z-[-2]">
        <Image 
          src="https://i.ibb.co/mVH0z4S8/Whats-App-Image-2025-10-25-at-16-40-18.jpg"
          alt="Brīvdienu māja Mežlīči background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/60 z-[-1]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 lg:mb-12">
           <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tight">
                <span className="text-foreground">{dictionary.title1}</span><br/> <span className="text-primary">{dictionary.title2}</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
                {dictionary.subtitle}
            </p>
        </div>

        {mainImage && (
          <div className="max-w-5xl mx-auto mb-6 sm:mb-8">
            <div className="relative group w-full aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden cursor-pointer" onClick={(e) => handleOpenSlider(e, 0)}>
               <Image
                  src={mainImage}
                  alt="Brīvdienu māja Mežlīči"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                <Button 
                  variant="secondary"
                  onClick={(e) => handleOpenSlider(e, 0)}
                  className="absolute top-4 right-4 backdrop-blur-sm"
                >
                  <Camera className="w-4 h-4 mr-2" /> {dictionary.photoButton}
                </Button>
            </div>
          </div>
        )}
        
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {canScroll && (
              <button
                onClick={prevMiniGallery}
                className="flex-shrink-0 bg-background/50 hover:bg-primary text-primary-foreground p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 active:scale-95 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={isMobile ? 16 : 20} />
              </button>
            )}
            
            <div className="flex-shrink-0 flex gap-1.5 sm:gap-2 lg:gap-3 justify-center overflow-hidden">
              {visibleImages.map((item, index) => (
                <button
                  key={`${miniGalleryIndex}-${index}`}
                  onClick={(e) => handleOpenSlider(e, item.originalIndex)}
                  className="flex-shrink-0 relative group w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                >
                  <Image
                    src={item.image} 
                    alt={`Galerijas foto ${item.originalIndex + 1}`}
                    fill
                    className="object-cover rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 border-2 border-transparent group-hover:border-primary group-hover:shadow-primary/30 group-hover:shadow-2xl"
                    sizes="15vw"
                  />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-primary transition-all duration-300"></div>
                </button>
              ))}
            </div>
            
            {canScroll && (
              <button
                onClick={nextMiniGallery}
                className="flex-shrink-0 bg-background/50 hover:bg-primary text-primary-foreground p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 active:scale-95 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
