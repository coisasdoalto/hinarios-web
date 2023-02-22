import { readdir, writeFile } from 'fs/promises';
import path from 'path';
import slugify from 'slugify';
import elasticlunr from 'elasticlunr';
import getHymnBooks from '../data/getHymnBooks';
import getParsedData, { joinDataPath } from '../data/getParsedData';
import { hymnSchema } from '../schemas/hymn';

// eslint-disable-next-line func-names
const index = elasticlunr<{ id: string; title: string; body: string }>(function () {
  this.setRef('id');
  this.addField('title');
  this.addField('body');
  this.saveDocument(true);
});

async function generateHymnsIndex() {
  const hymnBooks = await getHymnBooks();

  await Promise.all(
    hymnBooks.map(async (hymnBook) => {
      const hymnFilenames = await Promise.all(
        (
          await readdir(joinDataPath(hymnBook.slug))
        ).filter((hymnFilename) => /\d.*\.json/.test(hymnFilename))
      );

      const hymns = await (
        await Promise.all(
          hymnFilenames.map(async (hymnFilename) =>
            getParsedData({
              filePath: path.join(hymnBook.slug, hymnFilename),
              schema: hymnSchema,
            })
          )
        )
      )
        .sort(
          (current, next) =>
            parseInt(String(current.number), 10) - parseInt(String(next.number), 10)
        )
        .map((hymn) => ({
          id: `${hymnBook.slug}/${hymn.number}`,
          hymnBook: hymnBook.slug,
          number: hymn.number,
          title: `${hymn.number}. ${hymn.title}`,
          body: `${hymn.stanzas.map(({ text }) => text).join('\n')}`,
        }))
        .forEach((hymn) => index.addDoc(hymn));
    })
  );

  await writeFile(path.join(__dirname, 'searchIndex.json'), JSON.stringify(index));
}

generateHymnsIndex();
