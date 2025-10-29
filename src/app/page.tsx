import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { properties } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[400px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
            Mežlīči Retreat
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            Escape to tranquility. Discover our serene vacation rentals nestled in the heart of nature.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="#properties">
              Explore Properties <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="properties" className="w-full max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-8">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center">
          Our Properties
        </h2>
        <p className="mt-4 text-center max-w-3xl mx-auto text-muted-foreground text-lg">
          Choose your perfect sanctuary. Each property offers a unique experience with modern comforts and breathtaking views.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(property => {
            const image = PlaceHolderImages.find(p => p.id === property.images[0]);
            return (
              <Card key={property.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative h-60 w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={property.name}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <CardTitle className="font-headline text-2xl">{property.name}</CardTitle>
                  <div className="flex items-center mt-2 text-muted-foreground">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="ml-1 font-medium text-foreground">{property.rating}</span>
                    <span className="ml-2">({property.reviews} reviews)</span>
                  </div>
                  <p className="mt-4 text-muted-foreground line-clamp-3">{property.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold">${property.price}</span>
                    <span className="text-sm text-muted-foreground">/night</span>
                  </div>
                  <Button asChild>
                    <Link href={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  );
}
