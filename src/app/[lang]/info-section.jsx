
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const InfoSection = ({ dictionary }) => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-card text-card-foreground backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl text-center border">
            <Calendar size={40} className="sm:w-12 sm:h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-4">{dictionary.availabilityTitle}</h3>
            <p className="text-muted-foreground text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: dictionary.availabilityText }} />
          </div>
          
          <div className="bg-card text-card-foreground backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl text-center border">
            <MapPin size={40} className="sm:w-12 sm:h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-4">{dictionary.addressTitle}</h3>
            <p className="text-muted-foreground font-semibold text-sm sm:text-base">
              {dictionary.addressText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
