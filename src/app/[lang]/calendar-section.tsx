
'use client';

import React from 'react';

const CalendarSection = ({ dictionary }: { dictionary: { title: string } }) => {
  return (
    <section id="calendar" className="py-12 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-headline text-4xl font-bold text-center mb-6">
            {dictionary.title}
          </h2>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl border">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=8b6becdf2ad7c40fcee5c32b695484bf1ae9f1080d335739732474da77b9cbfd%40group.calendar.google.com&ctz=Europe%2FRiga"
            width="100%"
            height="600"
            className="w-full"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
