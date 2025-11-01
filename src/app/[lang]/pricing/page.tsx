
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';

type Props = {
  params: { lang: Locale };
};

export default async function PricingPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      <section id="cenas" className="py-12 px-4">
        <h1 className="font-headline text-5xl font-bold text-center mb-12">{dictionary.pricing.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-card p-8 rounded-2xl shadow-lg text-center border">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            </div>
            <h3 className="font-headline text-xl font-bold text-primary mb-2">{dictionary.pricing.houseTitle}</h3>
            <p className="text-4xl font-black my-2">{dictionary.pricing.housePrice}</p>
            <p className="text-muted-foreground">{dictionary.pricing.houseDesc}</p>
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-lg text-center border">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm-2 1a3 3 0 013-3h12a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V4zm11 2a1 1 0 10-2 0v5a1 1 0 102 0V6zM8 9a1 1 0 10-2 0v2a1 1 0 102 0V9zm5-3a1 1 0 10-2 0v5a1 1 0 102 0V6z" clipRule="evenodd" /></svg>
            </div>
            <h3 className="font-headline text-xl font-bold text-primary mb-2">{dictionary.pricing.hotTubTitle}</h3>
            <p className="text-4xl font-black my-2">{dictionary.pricing.hotTubPrice}</p>
            <p className="text-muted-foreground">{dictionary.pricing.hotTubDesc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
