import { FeedCategoryEnum } from "../enums/feedCategory.enum";
import { z } from "zod";

// feed
export const FeedTransformer = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  category: z.nativeEnum(FeedCategoryEnum),
  ctaTitle: z.string().optional(),
  ctaUrl: z.string().optional(),
});

export type TFeedDto = z.infer<typeof FeedTransformer>;
