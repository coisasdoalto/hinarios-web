import { storage } from '../firebase';
import { hymnBookInfoSchema } from '../schemas/hymnBookInfo';

const getHymnBookInfo = async (hymnBook: string) => {
  const bucket = storage.bucket();

  const [file] = await bucket.file(`${hymnBook}/hymnBookInfo.json`).download();

  return hymnBookInfoSchema.parse(JSON.parse(file.toString()));
};

export default getHymnBookInfo;
