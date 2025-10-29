'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getRecommendationsAction } from '@/lib/actions';
import { WandSparkles, Loader2, ListTree } from 'lucide-react';
import { Label } from '@/components/ui/label';

type AttractionFinderProps = {
  locationDescription: string;
};

const initialState = {
  error: null,
  recommendations: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Finding...
        </>
      ) : (
        <>
          <WandSparkles className="mr-2 h-4 w-4" />
          Find Attractions
        </>
      )}
    </Button>
  );
}

export default function AttractionFinder({ locationDescription }: AttractionFinderProps) {
  const [state, formAction] = useFormState(getRecommendationsAction, initialState);

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="font-headline text-3xl font-bold flex items-center gap-2">
          <WandSparkles className="text-primary w-7 h-7" />
          AI-Powered Attraction Finder
        </CardTitle>
        <CardDescription>
          Tell us your interests, and our local expert AI will suggest the best spots to visit near you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="locationDescription" value={locationDescription} />
          <div className="space-y-2">
            <Label htmlFor="userInterests">Your Interests</Label>
            <Input
              id="userInterests"
              name="userInterests"
              placeholder="e.g., hiking, museums, local food, coffee shops"
              required
            />
          </div>
          <SubmitButton />
        </form>

        {state?.error && <p className="mt-4 text-sm text-destructive">{state.error}</p>}
        
        {state?.recommendations && state.recommendations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Here are some recommendations for you:</h3>
            <ul className="space-y-3">
              {state.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-md border bg-background">
                  <ListTree className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-foreground/90">{rec}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
