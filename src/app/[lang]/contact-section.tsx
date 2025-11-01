
'use client';

import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const ContactSection = ({ dictionary }: { dictionary: { title: string; subtitle: string; phone: string; showNumber: string } }) => {
  const [showNumber, setShowNumber] = useState(false);
  
  return (
    <section id="sazinities" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-headline text-4xl font-bold text-center mb-6">
            {dictionary.title}
          </h2>
          <p className="max-w-xl mx-auto text-lg text-muted-foreground">
            {dictionary.subtitle}
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-lg border text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-4 mx-auto">
              <Phone className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4">{dictionary.phone}</h3>
            {showNumber ? (
              <a 
                href="tel:+37129294621" 
                className="text-lg sm:text-xl text-primary hover:underline font-semibold"
              >
                +371 29294621
              </a>
            ) : (
              <button
                onClick={() => setShowNumber(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl transition-all duration-300 font-semibold"
              >
                {dictionary.showNumber}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
