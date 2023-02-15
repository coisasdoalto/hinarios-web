import { storage } from '../firebase';
import getHymnBookInfo from './getHymnBookInfo';

const getHymnBooks = async () => {
  const bucket = storage.bucket();

  const [files] = await bucket.getFiles();

  const hymnBooks = await Promise.all(
    files
      .map((file) => file.name)
      .filter((fileName) => fileName.match(/\/$/))
      .map(async (fileName) => {
        const slug = fileName.replace('/', '');
        return {
          slug,
          name: (await getHymnBookInfo(slug)).name,
        };
      })
  );

  return hymnBooks;
};

export default getHymnBooks;
