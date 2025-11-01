
'use client';

import React from 'react';
import { Calendar } from '@/components/ui/calendar';

const CalendarSection = ({ dictionary }: { dictionary: { title: string } }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="py-12 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-headline text-4xl font-bold text-center mb-6">
            {dictionary.title}
          </h2>
        </div>
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-2xl border bg-card shadow-lg"
            />
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
