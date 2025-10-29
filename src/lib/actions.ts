'use server';

import { getAttractionRecommendations } from '@/ai/flows/attraction-recommendations';
import { z } from 'zod';

const RecommendationsSchema = z.object({
  locationDescription: z.string(),
  userInterests: z.string(),
});

export async function getRecommendationsAction(formData: FormData) {
  const validatedFields = RecommendationsSchema.safeParse({
    locationDescription: formData.get('locationDescription'),
    userInterests: formData.get('userInterests'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid input.',
      recommendations: [],
    };
  }

  try {
    const result = await getAttractionRecommendations(validatedFields.data);
    return {
      error: null,
      recommendations: result.recommendations,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to get recommendations. Please try again.',
      recommendations: [],
    };
  }
}
