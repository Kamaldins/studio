import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { Home, Bath } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.pricing.title,
    description: `${dictionary.pricing.houseDesc} ${dictionary.pricing.housePrice}, ${dictionary.pricing.hotTubDesc} ${dictionary.pricing.hotTubPrice}`,
  };
}

export default async function PricingPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-5xl font-bold md:text-6xl text-primary">{dictionary.pricing.title}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto pt-8">
          <div className="bg-card p-8 rounded-2xl shadow-lg text-center border">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Home className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-headline text-xl font-bold text-primary mb-2">{dictionary.pricing.houseTitle}</h3>
            <p className="text-4xl font-black my-2">{dictionary.pricing.housePrice}</p>
            <p className="text-muted-foreground">{dictionary.pricing.houseDesc}</p>
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-lg text-center border">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Bath className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-headline text-xl font-bold text-primary mb-2">{dictionary.pricing.hotTubTitle}</h3>
            <p className="text-4xl font-black my-2">{dictionary.pricing.hotTubPrice}</p>
            <p className="text-muted-foreground">{dictionary.pricing.hotTubDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
