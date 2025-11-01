
'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    if (sliderOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sliderOpen, closeSlider, nextImage, prevImage]);
  
  if (!sliderOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[100] p-4 backdrop-blur-md animate-in fade-in-0" 
      onClick={closeSlider}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); closeSlider(); }}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-90 active:scale-95 z-50"
      >
        <X size={isMobile ? 28 : 32} />
      </button>
      
      <div 
        className="relative w-full h-[calc(100%-120px)] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-w-6xl">
            <Image 
              key={currentImageIndex}
              src={images[currentImageIndex]} 
              alt={`Galerijas attēls ${currentImageIndex + 1}`}
              fill
              className="object-contain animate-in fade-in-0 duration-300"
              sizes="100vw"
            />
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl border border-white/20"
        >
          <ChevronLeft size={isMobile ? 24 : 32} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl border border-white/20"
        >
          <ChevronRight size={isMobile ? 24 : 32} />
        </button>
      </div>

      <div className="w-full h-[100px] flex-shrink-0 mt-4 px-4">
        <div className="max-w-xl mx-auto h-full flex items-center justify-center gap-2">
            {images.map((image, index) => (
                <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                    className={cn(
                        "relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105",
                        index === currentImageIndex ? "border-2 border-primary shadow-lg scale-105" : "border-2 border-transparent opacity-60 hover:opacity-100"
                    )}
                >
                    <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="10vw"
                    />
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSliderModal;
