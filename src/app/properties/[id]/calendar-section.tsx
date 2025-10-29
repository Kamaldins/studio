import React from 'react';

const CalendarSection = () => {
  return (
    <div>
      <h2 className="font-headline text-4xl font-bold mb-8 text-center">Pieejamības kalendārs</h2>
      <div className="rounded-lg overflow-hidden shadow-lg border">
        <iframe 
          src="https://calendar.google.com/calendar/embed?src=8b6becdf2ad7c40fcee5c32b695484bf1ae9f1080d335739732474da77b9cbfd%40group.calendar.google.com&ctz=Europe%2FRiga"
          width="100%" 
          height="600"
          frameBorder="0" 
          scrolling="no"
        />
      </div>
    </div>
  );
};

export default CalendarSection;
