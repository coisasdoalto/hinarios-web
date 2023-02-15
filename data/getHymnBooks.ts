import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { storage } from '../firebase';
import getHymnBookInfo from './getHymnBookInfo';

const getHymnBooks = async () => {
  // const bucket = storage.bucket();

  // const [files] = await bucket.getFiles();

  // const hymnBooks = await Promise.all(
  //   files
  //     .map((file) => file.name)
  //     .filter((fileName) => fileName.match(/\/$/))
  //     .map(async (fileName) => {
  //       const slug = fileName.replace('/', '');
  //       return {
  //         slug,
  //         name: (await getHymnBookInfo(slug)).name,
  //       };
  //     })
  // );

  const hymnBooksSlugs = await readdir(path.join('tmp', 'hymnsData'));

  const hymnBooks = await Promise.all(
    hymnBooksSlugs.map(async (slug) => ({
      slug,
      name: (await getHymnBookInfo(slug)).name,
    }))
  );

  return hymnBooks;
};

export default getHymnBooks;
