import { z } from 'zod';

export const hymnsIndexSchema = z.array(
  z.object({
    number: z.number(),
    title: z.string(),
    subtitle: z.string().optional(),
    slug: z.string(),
  })
);

export type HymnsIndex = z.infer<typeof hymnsIndexSchema>;
