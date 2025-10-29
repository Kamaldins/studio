import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import ImageGallery from './properties/[id]/image-gallery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import * as LucideIcons from 'lucide-react';
import BookingWidget from './properties/[id]/booking-widget';
import MapComponent from './properties/[id]/map-component';
import AttractionFinder from './properties/[id]/attraction-finder';

export default function SinglePropertyPage() {
  // Since this is a single property site, we hardcode the ID '1'.
  const property = properties.find(p => p.id === '1');

  if (!property) {
    notFound();
  }

  const propertyImages: ImagePlaceholder[] = property.images
    .map(id => PlaceHolderImages.find(p => p.id === id))
    .filter((p): p is ImagePlaceholder => !!p);
    
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 md:px-8 space-y-12">
        <section className="text-center pt-12">
            <h1 className="font-headline text-5xl md:text-7xl font-black">
                Brīvdienu māja <span className="text-primary">"Mežlīči"</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                Klusa vieta mežā pie Daugavas, kur atgūt spēkus un relaksēties
            </p>
        </section>

      <section id="foto">
        <ImageGallery images={propertyImages} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
            <section>
                <h2 className="font-headline text-3xl font-bold">Par brīvdienu māju</h2>
                <p className="mt-4 text-lg text-foreground/80 whitespace-pre-line">{property.description}</p>
            </section>
            
            <Separator />
            
            <section>
                <h2 className="font-headline text-3xl font-bold">Ērtības</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6">
                {property.amenities.map(amenity => {
                    const Icon = LucideIcons[amenity.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
                    return (
                    <div key={amenity.text} className="flex items-center gap-3 text-lg">
                        <Icon className="w-6 h-6 text-primary" />
                        <span>{amenity.text}</span>
                    </div>
                    );
                })}
                </div>
            </section>

             <Separator />

             <section id="objekti">
                <h2 className="font-headline text-3xl font-bold">Atrašanās vieta</h2>
                <div className="mt-6 rounded-lg overflow-hidden h-96 border">
                <MapComponent location={property.location} />
                </div>
            </section>
            
             <Separator />
            
            <section>
                <AttractionFinder locationDescription={property.locationDescription} />
            </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
             <div id="cenas">
                <BookingWidget property={property} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
