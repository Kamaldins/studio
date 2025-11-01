
import data from './placeholder-images.json';

export type ImageCategory = 'house' | 'sauna' | 'yard';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category: ImageCategory;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
