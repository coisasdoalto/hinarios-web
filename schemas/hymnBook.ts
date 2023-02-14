import { z } from 'zod';

export const hymnBookSchema = z.object({
  slug: z.string(),
  name: z.string(),
});

export type HymnBook = z.infer<typeof hymnBookSchema>;
