import { writeFile } from 'fs/promises';
import path from 'path';
import getHymnBooks from '../data/getHymnBooks';
import getHymnsIndex from '../data/getHymnsIndex';

async function generatePathsForPrecache() {
  const hymnBooks = await getHymnBooks();

  const allPaths = (
    await Promise.all(
      hymnBooks.map(async (hymnBook) => {
        const hymnsIndex = await getHymnsIndex(hymnBook.slug);

        const hymnBookPage = `/${hymnBook.slug}/`;

        const paths = hymnsIndex.map(({ slug }) => `/${hymnBook.slug}/${slug}/`);

        return [hymnBookPage, ...paths];
      })
    )
  ).flat();

  await writeFile(path.join('tmp', 'pathsForPrecache.json'), JSON.stringify(allPaths, null, 2));

  await writeFile(
    path.join('tmp', 'pathsForPrecacheV2.json'),
    JSON.stringify(
      allPaths.map((url) => ({ url, revision: '3' })),
      null,
      2
    )
  );

  return allPaths;
}

generatePathsForPrecache();
