
'use client';
import React from 'react';
import { Car } from 'lucide-react';
import { MEZLICI_COORDINATES, MEZLICI_LAT, MEZLICI_LNG, MEZLICI_ADDRESS } from '@/lib/data';

export default function MapSection({ dictionary }) {
  return (
    <section className="py-12 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="font-headline text-4xl font-bold text-center mb-8">
            {dictionary.title}
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-8 border">
          <iframe 
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2233.5!2d${MEZLICI_LNG}!3d${MEZLICI_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(`${MEZLICI_LAT}°N ${MEZLICI_LNG}°E`)}!5e0!3m2!1slv!2slv!4v1735740000000!5m2!1slv!2slv&q=${MEZLICI_LAT},${MEZLICI_LNG}(Mežlīči)&z=15`}
            width="100%" 
            height="450"
            className="w-full"
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        
        <div className="text-center">
          <a 
            href={`https://waze.com/ul?ll=${MEZLICI_COORDINATES.replace(',', '%2C')}&navigate=yes&q=${encodeURIComponent(MEZLICI_ADDRESS)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg text-sm sm:text-base"
          >
            <Car size={16} className="sm:w-5 sm:h-5" />
            {dictionary.openWaze}
          </a>
        </div>
      </div>
    </section>
  );
};
