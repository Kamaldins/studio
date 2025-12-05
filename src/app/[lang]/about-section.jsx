
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tent, Home, MapPin } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function AboutSection({ dictionary }) {
  const iconMap = {
    amenities: Home,
    activities: Tent,
    location: MapPin,
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      <section className="space-y-12 py-12 px-4">
        <h2 className="font-headline text-5xl font-bold text-center">{dictionary.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg max-w-6xl mx-auto">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-foreground">{dictionary.amenitiesTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3 text-muted-foreground">
                {dictionary.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <LucideIcons.Check className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Tent className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-foreground">{dictionary.activitiesTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3 text-muted-foreground">
                {dictionary.activities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <LucideIcons.Check className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-foreground">{dictionary.locationTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{dictionary.locationText}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
