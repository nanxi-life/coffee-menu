import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const recipes = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './content/recipes' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    image: z.string(),
    prepTime: z.string().optional(),
    ingredients: z
      .array(
        z.object({
          item: z.string(),
          amount: z.string(),
        })
      )
      .optional(),
    steps: z.array(z.string()).optional(),
  }),
});

export const collections = { recipes };
