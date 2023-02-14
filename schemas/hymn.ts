import { z } from 'zod';

export const hymnSchema = z.object({
  number: z.number().or(z.string()),
  title: z.string(),
  subtitle: z.string().optional(),
  stanzas: z.array(
    z.object({
      number: z.number(),
      text: z.string(),
    })
  ),
  chorus: z.string().optional(),
});

export type Hymn = z.infer<typeof hymnSchema>;
