
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const Thumb = ({ selected, imgSrc, onClick }) => {
  return (
    <div
      className={cn(
        'relative h-20 w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition-opacity duration-200 sm:h-24',
        selected ? 'opacity-100' : 'opacity-50 hover:opacity-100'
      )}
    >
      <button onClick={onClick} className="relative block h-full w-full">
        <Image
          className="object-cover"
          src={imgSrc}
          alt="Thumbnail"
          width={100}
          height={100}
          sizes="10vw"
        />
        <div
          className={cn(
            'absolute inset-0 rounded-md ring-offset-4 ring-offset-background transition-all duration-200',
            selected ? 'ring-2 ring-primary' : ''
          )}
        />
      </button>
    </div>
  );
};


const ImageSliderModal = ({ 
  isOpen, 
  onClose, 
  images, 
  startIndex 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const [mainApi, setMainApi] = useState();
  const [thumbApi, setThumbApi] = useState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [mainRef, mainApiInstance] = useEmblaCarousel({
    loop: true,
    startIndex,
  });
  const [thumbRef, thumbApiInstance] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback((index) => {
    if (!mainApi || !thumbApi) return;
    mainApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi, setSelectedIndex]);
  
  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);
  }, [mainApi, onSelect]);

  useEffect(() => {
    if (mainApiInstance) setMainApi(mainApiInstance);
    if (thumbApiInstance) setThumbApi(thumbApiInstance);
  }, [mainApiInstance, thumbApiInstance]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      mainApi?.scrollTo(startIndex, true);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, startIndex, mainApi]);
  
  const scrollPrev = useCallback(() => mainApi && mainApi.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi && mainApi.scrollNext(), [mainApi]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') scrollNext();
      if (e.key === 'ArrowLeft') scrollPrev();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, scrollNext, scrollPrev]);

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex animate-in fade-in-0 flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-lg" 
      onClick={onClose}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute right-4 top-4 z-50 rounded-full bg-black/40 p-2 text-white/70 transition-all duration-300 hover:scale-110 hover:bg-black/60 hover:text-white active:scale-95"
      >
        <X size={24} />
        <span className="sr-only">Close</span>
      </button>
      
      <div 
        className="group relative flex h-[calc(100%-120px)] w-full items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full max-w-6xl overflow-hidden" ref={mainRef}>
          <div className="flex h-full">
            {images.map((src, index) => (
              <div className="relative h-full flex-[0_0_100%] touch-pan-y" key={index}>
                <Image 
                  src={src} 
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white/80 shadow-xl opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-105 hover:bg-black/60 hover:text-white active:scale-95 sm:left-4 sm:p-4"
        >
          <ChevronLeft size={32} />
           <span className="sr-only">Previous Image</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); scrollNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white/80 shadow-xl opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-105 hover:bg-black/60 hover:text-white active:scale-95 sm:right-4 sm:p-4"
        >
          <ChevronRight size={32} />
          <span className="sr-only">Next Image</span>
        </button>
      </div>

      <div className="mt-4 h-[100px] w-full flex-shrink-0 px-4 sm:h-[120px]">
        <div className="mx-auto h-full max-w-xl">
           <div className="h-full overflow-hidden" ref={thumbRef}>
              <div className="flex h-full items-center gap-3">
                {images.map((src, index) => (
                    <div className="relative flex-[0_0_25%] sm:flex-[0_0_20%]" key={index}>
                        <Thumb
                        onClick={() => onThumbClick(index)}
                        selected={index === selectedIndex}
                        imgSrc={src}
                        />
                    </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageSliderModal;
