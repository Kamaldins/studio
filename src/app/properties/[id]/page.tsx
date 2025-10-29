import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import ImageGallery from './image-gallery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import * as LucideIcons from 'lucide-react';
import BookingWidget from './booking-widget';
import MapComponent from './map-component';
import AttractionFinder from './attraction-finder';

export async function generateStaticParams() {
  return properties.map(property => ({
    id: property.id,
  }));
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === params.id);

  if (!property) {
    notFound();
  }

  const propertyImages: ImagePlaceholder[] = property.images
    .map(id => PlaceHolderImages.find(p => p.id === id))
    .filter((p): p is ImagePlaceholder => !!p);
    
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main content */}
        <div className="lg:w-2/3">
          <section>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{property.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{property.locationDescription}</p>
          </section>

          <section className="mt-6">
            <ImageGallery images={propertyImages} />
          </section>

          <section className="mt-8">
            <h2 className="font-headline text-3xl font-bold">About this property</h2>
            <p className="mt-4 text-lg text-foreground/80 whitespace-pre-line">{property.description}</p>
          </section>

          <Separator className="my-8" />
          
          <section>
            <h2 className="font-headline text-3xl font-bold">What this place offers</h2>
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
          
          <Separator className="my-8" />
          
          <section>
             <AttractionFinder locationDescription={property.locationDescription} />
          </section>
          
          <Separator className="my-8" />

          <section>
            <h2 className="font-headline text-3xl font-bold">Where you'll be</h2>
            <div className="mt-6 rounded-lg overflow-hidden h-96 border">
               <MapComponent location={property.location} />
            </div>
          </section>

        </div>

        {/* Sticky Sidebar */}
        <div className="lg:w-1/3">
          <div className="sticky top-24">
            <BookingWidget property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
