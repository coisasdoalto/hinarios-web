import getParsedData from 'data/getParsedData';
import { existsSync } from 'fs';
import {} from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { hymnSchema } from 'schemas/hymn';
import { hymnBookInfoSchema } from 'schemas/hymnBookInfo';
import { z } from 'zod';

const querySchema = z.object({
  hymnNumber: z.coerce.number(),
  hymnBook: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = querySchema.parse(req.query);

  const { hymnBook, hymnNumber } = query;

  const hymnDataFile = path.resolve('hymnsData', hymnBook, `${hymnNumber}.json`);

  const hymnDataFileExists = existsSync(hymnDataFile);

  if (!hymnDataFileExists) {
    return res.status(404).json({ error: 'Hymn not found' });
  }

  const hymnData = await getParsedData({
    filePath: path.join(hymnBook, `${hymnNumber}.json`),
    schema: hymnSchema.pick({
      title: true,
    }),
  });

  const hymnBookData = await getParsedData({
    filePath: path.join(hymnBook, 'hymnBookInfo.json'),
    schema: hymnBookInfoSchema,
  });

  return res.status(200).json({ ...hymnData, hymnBook: hymnBookData });
}
