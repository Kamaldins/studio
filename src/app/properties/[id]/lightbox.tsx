
'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageSliderModalProps {
  sliderOpen: boolean;
  images: string[];
  currentImageIndex: number;
  closeSlider: () => void;
  prevImage: () => void;
  nextImage: () => void;
  setCurrentImageIndex: (index: number) => void;
}

const ImageSliderModal = ({ 
  sliderOpen, 
  images, 
  currentImageIndex, 
  closeSlider, 
  prevImage, 
  nextImage,
  setCurrentImageIndex 
}: ImageSliderModalProps) => {
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSlider();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeSlider, nextImage, prevImage]);
  
  if (!sliderOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-2 sm:p-4 backdrop-blur-sm" onClick={closeSlider}>
      <button 
        onClick={(e) => { e.stopPropagation(); closeSlider(); }}
        className="absolute top-4 right-4 text-white hover:text-red-400 transition-all duration-300 transform hover:scale-110 hover:rotate-90 active:scale-95 z-10"
      >
        <X size={isMobile ? 24 : 32} />
      </button>
      
      <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full">
            <Image 
              src={images[currentImageIndex]} 
              alt={`Galerijas attēls ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 sm:p-3 rounded-full transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95 shadow-xl"
        >
          <ChevronLeft size={isMobile ? 20 : 28} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 sm:p-3 rounded-full transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95 shadow-xl"
        >
          <ChevronRight size={isMobile ? 20 : 28} />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 flex-wrap justify-center max-w-xs sm:max-w-md">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 hover:scale-125 active:scale-110 ${
                index === currentImageIndex ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSliderModal;
