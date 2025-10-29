
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface LightBoxProps {
  images: string[];
  startIndex?: number;
  onClose: () => void;
}

const LightBox = ({ images, startIndex = 0, onClose }: LightBoxProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, nextImage, prevImage]);

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={onClose}>
        <X size={32} />
      </button>

      <div className="relative w-full h-full max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>

      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/30 p-2 rounded-full" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
        <ChevronLeft size={40} />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/30 p-2 rounded-full" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
        <ChevronRight size={40} />
      </button>
    </div>
  );
};

export default LightBox;
