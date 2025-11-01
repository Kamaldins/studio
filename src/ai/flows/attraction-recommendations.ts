
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AttractionRecommendationsInputSchema = z.object({
  locationDescription: z.string().describe('A description of the location, e.g., "near Ķegums HPP"'),
  userInterests: z.string().describe('A comma-separated list of user interests, e.g., "restaurants, parks, museums"'),
});

const AttractionRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended attractions.'),
});

export async function getAttractionRecommendations(
  input: z.infer<typeof AttractionRecommendationsInputSchema>
): Promise<z.infer<typeof AttractionRecommendationsOutputSchema>> {
  return attractionRecommendationsFlow(input);
}

const attractionRecommendationsFlow = ai.defineFlow(
  {
    name: 'attractionRecommendationsFlow',
    inputSchema: AttractionRecommendationsInputSchema,
    outputSchema: AttractionRecommendationsOutputSchema,
  },
  async (input) => {
    const prompt = `
      Based on the location "${input.locationDescription}" and user interests in "${input.userInterests}", 
      suggest 5-7 nearby attractions, points of interest, or activities.
      Provide only a list of recommendations, without any introductory text.
    `;

    const llmResponse = await ai.generate({
      prompt: prompt,
    });

    const recommendations = llmResponse.text
      .split('\n')
      .map((rec) => rec.trim().replace(/^-/, '').trim())
      .filter(Boolean);
      
    return { recommendations };
  }
);
