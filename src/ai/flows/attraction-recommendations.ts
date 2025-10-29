// src/ai/flows/attraction-recommendations.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for recommending attractions and points of interest near a rental property.
 *
 * - getAttractionRecommendations - A function that takes a location description and user interests and returns a list of attraction recommendations.
 * - AttractionRecommendationsInput - The input type for the getAttractionRecommendations function.
 * - AttractionRecommendationsOutput - The output type for the getAttractionRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AttractionRecommendationsInputSchema = z.object({
  locationDescription: z
    .string()
    .describe(
      'A detailed description of the rental property location, including address and surrounding area.'
    ),
  userInterests: z
    .string()
    .describe(
      'A comma-separated list of the user interests, e.g., hiking, museums, food.'
    ),
});
export type AttractionRecommendationsInput = z.infer<
  typeof AttractionRecommendationsInputSchema
>;

const AttractionRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended attractions and points of interest.'),
});
export type AttractionRecommendationsOutput = z.infer<
  typeof AttractionRecommendationsOutputSchema
>;

export async function getAttractionRecommendations(
  input: AttractionRecommendationsInput
): Promise<AttractionRecommendationsOutput> {
  return attractionRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'attractionRecommendationsPrompt',
  input: {schema: AttractionRecommendationsInputSchema},
  output: {schema: AttractionRecommendationsOutputSchema},
  prompt: `You are a local expert recommending attractions and points of interest.

  Based on the following location description and user interests, provide a list of recommendations.

  Location Description: {{{locationDescription}}}
  User Interests: {{{userInterests}}}

  Recommendations:`,
});

const attractionRecommendationsFlow = ai.defineFlow(
  {
    name: 'attractionRecommendationsFlow',
    inputSchema: AttractionRecommendationsInputSchema,
    outputSchema: AttractionRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
