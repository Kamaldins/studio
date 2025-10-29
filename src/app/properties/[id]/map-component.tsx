'use client';
import { Car } from 'lucide-react';
import { properties } from '@/lib/data';

const MapSection = () => {
  const property = properties.find(p => p.id === '1');

  if (!property) {
    return null;
  }
  
  const { location, locationDescription } = property;
  const MEZLICI_LAT = location.lat;
  const MEZLICI_LNG = location.lng;
  const MEZLICI_ADDRESS = locationDescription;
  const MEZLICI_COORDINATES = `${MEZLICI_LAT},${MEZLICI_LNG}`;


  return (
    <section>
      <div className="rounded-lg overflow-hidden shadow-lg border mb-8">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2233.5!2d${MEZLICI_LNG}!3d${MEZLICI_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(`${MEZLICI_LAT}°N ${MEZLICI_LNG}°E`)}!5e0!3m2!1slv!2slv!4v1735740000000!5m2!1slv!2slv&markers=color:red%7Clabel:M%7C${MEZLICI_LAT},${MEZLICI_LNG}&q=${encodeURIComponent(MEZLICI_ADDRESS)}`}
          width="100%"
          height="450"
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
          className="inline-flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg text-sm sm:text-base"
        >
          <Car size={16} className="sm:w-5 sm:h-5" />
          Atvērt Waze navigācijā
        </a>
      </div>
    </section>
  );
};

export default MapSection;
