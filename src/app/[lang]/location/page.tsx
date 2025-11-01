
import * as React from 'react';
import { Separator } from '@/components/ui/separator';
import MapSection from '../map-component';
import CalendarSection from '../calendar-section';
import InfoSection from '../info-section';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';

type Props = {
  params: { lang: Locale };
};

export default async function LocationPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 space-y-12">
      <InfoSection dictionary={dictionary.info} />
      
      <Separator />
      
      <section id="objekti" className="py-12 px-4">
        <h1 className="font-headline text-5xl font-bold text-center mb-8">{dictionary.map.title}</h1>
        <MapSection />
      </section>

      <Separator />

      <section id="kalendars" className="py-12 px-4">
        <h2 className="font-headline text-4xl font-bold text-center mb-8">{dictionary.calendar.title}</h2>
        <CalendarSection dictionary={dictionary.calendar} />
      </section>
    </div>
  );
}
