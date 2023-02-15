import { readFile } from 'fs/promises';
import path from 'path';
import { storage } from '../firebase';
import { hymnBookInfoSchema } from '../schemas/hymnBookInfo';

const getHymnBookInfo = async (hymnBook: string) => {
  // const bucket = storage.bucket();

  // const [file] = await bucket.file(`${hymnBook}/hymnBookInfo.json`).download();

  const file = await readFile(path.join('tmp', 'hymnsData', hymnBook, 'hymnBookInfo.json'));

  return hymnBookInfoSchema.parse(JSON.parse(file.toString()));
};

export default getHymnBookInfo;
