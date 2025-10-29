import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import ImageGallery from './properties/[id]/image-gallery';
import { Separator } from '@/components/ui/separator';
import * as LucideIcons from 'lucide-react';
import MapSection from './properties/[id]/map-component';
import CalendarSection from './properties/[id]/calendar-section';
import { Phone } from 'lucide-react';

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
      
      <Separator />

      <section id="par" className="space-y-12">
        <h2 className="font-headline text-4xl font-bold text-center">Kas jūs sagaida</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg">
            <div>
                <h3 className="font-headline text-2xl font-bold mb-4">Mājā pieejams</h3>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Pirts relaksācijai</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Pilnībā aprīkota virtuve</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Modernas labierīcības</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Guļamvieta mansardā (līdz 10 viesiem)</li>
                </ul>
            </div>
            <div>
                <h3 className="font-headline text-2xl font-bold mb-4">Āra aktivitātes</h3>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Plaša pļava ar telšu vietām</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Peldvieta ar laipu</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Laivas ielaišanas vieta un laiva</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Aizveramas terases svinību zona</li>
                    <li className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />Kubls ar hidromasāžu</li>
                </ul>
            </div>
        </div>
        
        <div className="text-center bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-headline text-2xl font-bold">Atrašanās vieta</h3>
            <p className="mt-2 text-muted-foreground text-lg">Daugavas kreisajā krastā pie Ķeguma HES</p>
        </div>

      </section>

      <Separator />

      <section id="cenas">
          <h2 className="font-headline text-4xl font-bold text-center mb-8">Izcenojums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                  <p className="text-5xl mb-2">🏠</p>
                  <h3 className="font-headline text-2xl font-bold">Brīvdienu māja</h3>
                  <p className="text-4xl font-black text-primary my-2">200€</p>
                  <p className="text-muted-foreground">Par nakti (pirts iekļauta cenā)</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                  <p className="text-5xl mb-2">🛁</p>
                  <h3 className="font-headline text-2xl font-bold">Hidromasāžas kubls</h3>
                  <p className="text-4xl font-black text-primary my-2">50€</p>
                  <p className="text-muted-foreground">Par izmantošanu</p>
              </div>
          </div>
      </section>
      
      <Separator />

       <section id="sazinities" className="text-center">
          <h2 className="font-headline text-4xl font-bold text-center mb-8">Sazinies ar mums</h2>
           <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-8">Mēs palīdzēsim rezervēt perfektu brīvdienu vietu</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-lg shadow-md">
                  <h3 className="font-headline text-xl font-bold mb-2">Telefons</h3>
                  <a href="tel:+37129294621" className="flex items-center justify-center gap-2 text-primary hover:underline">
                      <Phone className="w-5 h-5" />
                      <span className="text-lg">+371 29294621</span>
                  </a>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md">
                  <h3 className="font-headline text-xl font-bold mb-2">Pieejamība</h3>
                  <p className="text-lg text-muted-foreground">Māja ir pieejama no pl. 17:00 - 13:00 iepriekš piesakoties</p>
              </div>
               <div className="bg-card p-6 rounded-lg shadow-md">
                  <h3 className="font-headline text-xl font-bold mb-2">Adrese</h3>
                  <p className="text-lg text-muted-foreground">Mežlīči, Tomes pagasts</p>
              </div>
          </div>
       </section>

      <Separator />

      <section id="objekti">
         <h2 className="font-headline text-4xl font-bold text-center mb-8">Atrašanās vieta</h2>
         <MapSection />
      </section>

      <Separator />

      <section id="kalendars">
        <CalendarSection />
      </section>

    </div>
  );
}
