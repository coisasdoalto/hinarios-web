import { z } from 'zod';

export const hymnBookInfoSchema = z.object({
  name: z.string(),
});

export type HymnBookInfo = z.infer<typeof hymnBookInfoSchema>;
