import * as React from 'react';
import Image from 'next/image';
import { getDictionary } from '@/lib/get-dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.sauna.title,
    description: dictionary.sauna.subtitle,
  };
}

export default async function SaunaPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const saunaImages = PlaceHolderImages.filter(p => p.category === 'sauna');

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-5xl font-bold md:text-6xl text-primary">{dictionary.sauna.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{dictionary.sauna.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-8">
          {saunaImages.map((image) => (
            <div key={image.id} className="group relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pt-4">
          <div className="rounded-2xl border bg-card p-6 shadow-lg">
            <h3 className="mb-4 font-headline text-2xl font-bold text-primary">{dictionary.sauna.offerTitle}</h3>
            <ul className="space-y-3 text-muted-foreground">
              {dictionary.sauna.offers.map((offer, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{offer}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-lg">
            <h3 className="mb-4 font-headline text-2xl font-bold text-primary">{dictionary.sauna.setupTitle}</h3>
            <p className="text-muted-foreground">{dictionary.sauna.setupText1}</p>
            <p className="mt-2 text-muted-foreground">{dictionary.sauna.setupText2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
