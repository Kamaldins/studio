
'use client';
import React from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

interface HeroSectionProps {
  images: string[];
  openSlider: (index?: number) => void;
  miniGalleryIndex: number;
  nextMiniGallery: () => void;
  prevMiniGallery: () => void;
}

const HeroSection = ({ images, openSlider, miniGalleryIndex, nextMiniGallery, prevMiniGallery }: HeroSectionProps) => {
  const isMobile = useIsMobile();
  
  const getVisibleImages = () => {
    const visibleCount = isMobile ? 3 : 6;
    const startIndex = miniGalleryIndex;
    const visibleImages = [];
    
    // Ensure there are images to display
    if (images.length === 0) {
      return [];
    }
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % images.length;
      visibleImages.push({ image: images[index], originalIndex: index });
    }
    
    return visibleImages;
  };

  const visibleImages = getVisibleImages();

  return (
    <section id="foto" className="pt-24 md:pt-32 pb-4 sm:pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
           <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-slate-100">
                Brīvdienu māja<br/> <span className="text-primary">"Mežlīči"</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-400">
                Klusa vieta mežā pie Daugavas, kur atgūt spēkus un relaksēties
            </p>
        </div>
        
        <div className="max-w-6xl mx-auto mb-4 sm:mb-8 px-4 sm:px-0">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={prevMiniGallery}
              className="flex-shrink-0 bg-slate-800/90 hover:bg-slate-700 text-slate-200 p-2 sm:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={images.length <= 6}
            >
              <ChevronLeft size={isMobile ? 16 : 20} />
            </button>
            
            <div className="flex gap-1.5 sm:gap-2 lg:gap-3 justify-center overflow-hidden flex-1 max-w-4xl">
              {visibleImages.map((item, index) => (
                <button
                  key={`${miniGalleryIndex}-${index}`}
                  onClick={() => openSlider(item.originalIndex)}
                  className="flex-shrink-0 relative group w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                >
                  <Image
                    src={item.image} 
                    alt={`Galerijas foto ${item.originalIndex + 1}`}
                    fill
                    className="object-cover rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 border-2 border-slate-700 group-hover:border-primary group-hover:shadow-primary/30 group-hover:shadow-2xl"
                    sizes="15vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center">
                     <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-primary transition-all duration-300"></div>
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-300 rounded-xl sm:rounded-2xl"></div>
                     <Camera className="w-6 h-6 text-white/50 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={nextMiniGallery}
              className="flex-shrink-0 bg-slate-800/90 hover:bg-slate-700 text-slate-200 p-2 sm:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={images.length <= 6}
            >
              <ChevronRight size={isMobile ? 16 : 20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
