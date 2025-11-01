
import * as React from 'react';
import * as LucideIcons from 'lucide-react';

type Dictionary = {
  title: string;
  amenitiesTitle: string;
  amenities: string[];
  activitiesTitle: string;
  activities: string[];
  locationTitle: string;
  locationText: string;
};

type Props = {
  dictionary: Dictionary;
};

export default function AboutSection({ dictionary }: Props) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      <section className="space-y-12 py-12 px-4">
        <h1 className="font-headline text-5xl font-bold text-center">{dictionary.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg max-w-4xl mx-auto text-muted-foreground">
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-bold mb-4 text-foreground">{dictionary.amenitiesTitle}</h3>
            <ul className="space-y-3">
              {dictionary.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />{amenity}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-bold mb-4 text-foreground">{dictionary.activitiesTitle}</h3>
            <ul className="space-y-3">
              {dictionary.activities.map((activity, index) => (
                <li key={index} className="flex items-center gap-3"><LucideIcons.Check className="w-6 h-6 text-primary" />{activity}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center bg-card p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border">
          <h3 className="font-headline text-2xl font-bold text-foreground">{dictionary.locationTitle}</h3>
          <p className="mt-2 text-muted-foreground text-lg">{dictionary.locationText}</p>
        </div>
      </section>
    </div>
  );
}
