'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Property } from '@/types';
import type { DateRange } from 'react-day-picker';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

type BookingWidgetProps = {
  property: Property;
};

export default function BookingWidget({ property }: BookingWidgetProps) {
  const { toast } = useToast();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 4),
  });
  const [guests, setGuests] = React.useState(2);

  const numberOfNights = dateRange?.from && dateRange?.to
    ? differenceInCalendarDays(dateRange.to, dateRange.from)
    : 0;

  const totalCost = numberOfNights * property.price;

  const handleBookNow = () => {
    toast({
      title: 'Booking Feature Coming Soon!',
      description: 'We are working hard to bring you a seamless booking experience.',
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold">${property.price}</span>
            <span className="text-muted-foreground"> / night</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-sm text-muted-foreground">({property.reviews} reviews)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Dates</Label>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            className="rounded-md border p-0"
            numberOfMonths={1}
            disabled={{ before: new Date() }}
          />
        </div>
        <div>
          <Label htmlFor="guests">Guests</Label>
          <Input
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            min="1"
            max={parseInt(property.amenities.find(a => a.text.includes('Sleeps'))?.text.split(' ')[1] || '2', 10)}
          />
        </div>
        <Separator />
        {numberOfNights > 0 ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>${property.price} x {numberOfNights} nights</span>
              <span>${totalCost}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>$0</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>${totalCost}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Select your dates to see the price.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleBookNow} disabled={numberOfNights <= 0}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
